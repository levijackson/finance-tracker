import { formatNumberToFloat } from 'src/utils/currency';
import { ItemInterface } from 'src/components/interfaces/Item';
import { getMonthName } from 'src/utils/date';
import { v5 as uuidv5 } from 'uuid';

/**
 * @param item 
 * @return string | null
 */
const getPrimaryKey = (item: ItemInterface): string => {
  if (!item.user_uuid) {
    return;
  }

  return 'USER#' + item.user_uuid;
};

/**
 * @param item 
 * @return string | null
 */
const getSortKey = (item: ItemInterface): string => {
  if (!item.type || !item.date || !item.category || !item.createdAt) {
    return;
  }

  return item.type + '#' + item.date + '#' + item.category + '#' + item.createdAt;
}

/**
 * @param item 
 * @return string | null
 */
const getItemUuid = (item: ItemInterface): string => {
  const UUID_NAMESPACE = 'daf8a0be-41bb-4a62-b982-615e8412d604';
  const sortKey = getSortKey(item);
  if (!sortKey) {
    return;
  }

  return uuidv5(sortKey, UUID_NAMESPACE);
}

/**
 * Convert to JSON
 * @param item
 */
const toJson = (item: ItemInterface): object => {
  return {
    // generate an item_item_uuid if one doesn't exist yet
    item_uuid: item.item_uuid ? item.item_uuid : getItemUuid(item),
    amount: formatNumberToFloat(item.amount),
    note: item.note || '',
    date: item.date,
    category: item.category,
    type: item.type
  };
};

/**
 * Get a config we'll use to search for items.
 * 
 * @param monthNumber 
 */
const getMonthConfig = (monthNumber: number) => {
  let date = new Date();

  // I swear this makes sense.
  // go one month forward
  // go to the first day of the month
  // go back an hour so we're on the LAST day of the month we actually want
  date.setMonth((monthNumber + 1));
  date.setDate(0); // going to 1st of the month
  date.setHours(-1); // going to last hour before this date even started.

  return {
    name: getMonthName(date.getMonth()),
    yearMonth: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2),
  };
};

/**
 * Get the income and expenses for a given month
 * @param string yearMonth
 * @returns array of Item
 */
const getMonthlyData = async (yearMonth: string) => {
  try {
    let response = await fetch('/api/item/search?type=expense&date=' + yearMonth, {
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
      },
    });
    const expenses = await response.json();

    response = await fetch('/api/item/search?type=income&date=' + yearMonth, {
      method: 'GET',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
      },
    });
    const income = await response.json();

    let mergedData = [...expenses.items, ...income.items];
    mergedData.map((item) => {
        item.date = new Date(item.date);
    });

    return mergedData;

  } catch (error) {
    console.log('Failed to getData()');
  }
};

/**
 * Get the combined income and expense data and sum them
 * 
 * @param userId 
 * @param numberMonths 
 */
const getSummarizedData = async (numberMonths: number) => {
  const currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let data = {};

  for (let i = 0; i < numberMonths; i++) {
    const monthConfig = getMonthConfig(currentMonth);

    data[i] = {
      'month': monthConfig['name'],
    };

    const monthlyData = await getMonthlyData(monthConfig['yearMonth']);

    let incomeSum = 0;
    let expenseSum = 0;
    let incomeItems = [];
    let expenseItems = [];
    for (let key in monthlyData) {
      if (monthlyData[key].type === 'expense') {
        expenseSum += monthlyData[key].amount;
        expenseItems.push(monthlyData[key]);
      } else {
        incomeSum += monthlyData[key].amount;
        incomeItems.push(monthlyData[key]);
      }
    }

    data[i]['income'] = {
      'items': incomeItems,
      'sum': incomeSum
    };

    data[i]['expense'] = {
      'items': expenseItems,
      'sum': expenseSum
    };

    currentMonth = currentMonth - 1;
  }

  return {
      data
  };
};

/**
 * Given an array of ItemInterface, sum the income and expenses for the day
 * @param items 
 */
const groupItemsByDay = (items: Array<ItemInterface>) => {
  let data = {};
  items.map((item) => {
    const itemTime = new Date(item.date);
    if (!data[itemTime.getTime()]) {
      data[itemTime.getTime()] = {
        'date': item.date,
        'income': 0,
        'expenses': 0
      };
    }

    if (item.type == 'income') {
      data[itemTime.getTime()]['income'] += item.amount;
    } else if (item.type == 'expense') {
      data[itemTime.getTime()]['expenses'] += item.amount;
    }
  });

  return data;
};

/**
 * Given an array of ItemInterface, create a running total
 * for each day of the month.
 * Day 1: 100
 * Day 2: +100 = 200
 * Day 3: +50 = 250
 * Day 4: +25 = 275
 * @param items
 */
const sumItemsByDay = (items: Array<ItemInterface>) => {
  let data = groupItemsByDay(items);

  // sort the days
  let dataKeys = [];
  for (const key in data) {
    dataKeys.push(key);
  }
  dataKeys.sort();


  let dataArray = [];
  // we keep track of the last item so we can add to it and create a 
  // running total vs a daily total
  let lastItem = null;
  dataKeys.forEach((key) => {
    let item = data[key];
    if (lastItem) {
      item.income += lastItem.income;
      item.expenses += lastItem.expenses;
    }
    dataArray.push(item);
    lastItem = item;
  });

  return dataArray;
};

const groupItemsByCategory = (items: Array<ItemInterface>) => {
  let income = {};
  let expenses = {};

  items.forEach((item) => {
    if (item.type == 'income') {
      if (!income[item.category]) {
        income[item.category] = item.amount;
      } else {
        income[item.category] += item.amount;
      }
    } else if (item.type == 'expense') {
      if (!expenses[item.category]) {
        expenses[item.category] = item.amount;
      } else {
        expenses[item.category] += item.amount;
      }
    }
  });

  return { income, expenses };
};

const EXPENSE_ITEM_CATEGORIES = [
  'other',
  'utilities',
  'transportation',
  'groceries',
  'health',
  'insurance',
  'restaurants',
  'entertainment',
  'travel',
  'giving',
  'education',
  'lawn care',
  'home improvement'
];

const INCOME_ITEM_CATEGORIES = [
  'payroll',
  'freelance',
  'other'
];

const ITEM_TYPES = [
  'income',
  'expense'
];

export {
  toJson,
  getMonthlyData,
  getSummarizedData,
  sumItemsByDay,
  groupItemsByCategory,
  getPrimaryKey,
  getSortKey,
  getItemUuid,
  INCOME_ITEM_CATEGORIES,
  EXPENSE_ITEM_CATEGORIES,
  ITEM_TYPES
};