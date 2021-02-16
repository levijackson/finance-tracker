import { formatCurrency } from 'utils/currency';
import { ItemInterface } from 'components/interfaces/Item';
import { query } from 'helpers/db';
import { getMonthName } from 'utils/date';

const toJson = (item: ItemInterface): object => {
    return {
        id: item.id || null,
        amount: formatCurrency(item.amount),
        note: item.note || '',
        date: item.date.toString(),
        category: item.category,
        type: item.type
    };
};

const getData = async (userId: number, numberMonths: number) => {
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

        for (let key in ITEM_TYPES) {
            let sum = 0;
            await getItems(userId, ITEM_TYPES[key], startDate, endDate).then(function (results: Array<object>) {
                const items = results.map((item: ItemInterface) => {
                    return toJson(item); 
                });

                for (let item in items) {
                    sum += items[item].amount;
                }
                
                data[i][ITEM_TYPES[key]] = {
                    'items': items,
                    'sum': sum
                };
            });
        }
    }

    return {
        data
    };
};

/**
 * Get items for a user in a specific type/date range
 * 
 * @param userId 
 * @param type 
 * @param startDate 
 * @param endDate 
 */
const getItems = (userId: number, type: string, startDate: string, endDate: string ) => {
    return new Promise(function (resolve, reject) {
        query(
            `
        SELECT i.* FROM items i
        LEFT JOIN user_items ui
        ON i.id = ui.itemId
        WHERE 
        ui.userId = ?
        AND i.type = ?
        AND i.date BETWEEN ? AND ?
        `,
            [
                userId,
                type,
                startDate,
                endDate
            ], function (error, results, fields) {
                resolve(results);
            }
        );
    });
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