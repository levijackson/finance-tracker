import { formatCurrency } from 'utils/currency';
import { ItemInterface } from 'components/interfaces/Item';
import { query } from 'helpers/db';
import { getMonthName } from 'utils/date';

const toJson = (item: ItemInterface) => {
    return {
        id: item.id || null,
        amount: formatCurrency(item.amount),
        note: item.note || '',
        date: item.date.toString(),
        category: item.category,
        type: item.type
    };
};

const getData = async (numberMonths: number) => {
    const types = ['expense', 'income'];
    let currentDate = new Date();
    let data = {};
    for (let i = 0; i < numberMonths; i++) {
        currentDate.setDate(0); // going to 1st of the month
        currentDate.setHours(-1); // going to last hour before this date even started.
        let monthName = getMonthName(currentDate.getMonth());

        data[i] = {
            'month': monthName,
        };

        let startDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-01';
        let endDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();

        for (let key in types) {
            let sum = 0;
            
            let items = await query(
                `
                SELECT * FROM items
                WHERE type = ?
                AND date BETWEEN ? AND ?
                `,
                [
                    types[key],
                    startDate,
                    endDate
                ]
            );

            for (let item in items) {
                sum += items[item].amount;
            }

            data[i][types[key]] = {
                'items': items,
                'sum': sum
            };
        }
    }

    return {
        data
    };
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
    'education'
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
    INCOME_ITEM_CATEGORIES,
    EXPENSE_ITEM_CATEGORIES,
    ITEM_TYPES
};