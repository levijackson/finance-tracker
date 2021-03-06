import { formatNumberToFloat } from 'utils/currency';
import { ItemInterface } from 'components/interfaces/Item';
import ItemService from 'services/ItemService';
import { getMonthName } from 'utils/date';


/**
 * Convert to JSON
 * @param item
 */
const toJson = (item: ItemInterface): object => {
    return {
        id: item.id || null,
        amount: formatNumberToFloat(item.amount),
        note: item.note || '',
        date: item.date.toString(),
        category: item.category,
        type: item.type
    };
};

/**
 * Get a config we'll use to search for items
 * 
 * @param monthNumber 
 */
const getMonthConfig = (monthNumber: number) => {
    let date = new Date();

    // I swear this makese sense.
    // go one month forward
    // go to the first day of the month
    // go back an hour so we're on the LAST day of the month we actually want
    date.setMonth((monthNumber + 1));
    date.setDate(0); // going to 1st of the month
    date.setHours(-1); // going to last hour before this date even started.

    // add 1 because the month numbers start at 0 in JS and we store them in MySQL which starts at 1
    const startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-01';
    const endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    return {
        name: getMonthName(date.getMonth()),
        startDate: startDate,
        endDate: endDate
    };
};

/**
 * @param userId 
 * @param numberMonths 
 */
const getData = async (userId: number, numberMonths: number) => {
    const service = new ItemService();
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let data = {};

    for (let i = 0; i < numberMonths; i++) {
        const monthConfig = getMonthConfig(currentMonth);

        data[i] = {
            'month': monthConfig['name'],
        };

        for (let key in ITEM_TYPES) {
            let sum = 0;
            await service.getItemsByDateRange(
                userId,
                ITEM_TYPES[key],
                monthConfig['startDate'],
                monthConfig['endDate']
            )
            .then(function (results: Array<object>) {
                let items = [];
                if (results) {
                    items = results.map((item: ItemInterface) => {
                        return toJson(item); 
                    });
                }

                for (let item in items) {
                    sum += items[item].amount;
                }
                
                data[i][ITEM_TYPES[key]] = {
                    'items': items,
                    'sum': sum
                };
            });
        }

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
        if (!data[item.date.getTime()]) {
            data[item.date.getTime()] = {
                'date': item.date,
                'income': 0,
                'expenses': 0
            };
        }

        if (item.type == 'income') {
            data[item.date.getTime()]['income'] += item.amount;
        } else if (item.type == 'expense') {
            data[item.date.getTime()]['expenses'] += item.amount;
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
    getData,
    sumItemsByDay,
    groupItemsByCategory,
    INCOME_ITEM_CATEGORIES,
    EXPENSE_ITEM_CATEGORIES,
    ITEM_TYPES
};