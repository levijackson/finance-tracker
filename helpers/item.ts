import { formatCurrency } from 'utils/currency';
import { ItemInterface } from 'components/interfaces/Item';
import { connectToDatabase } from 'helpers/db';
import { getMonthName } from 'utils/date';

const toJson = (item: ItemInterface) => {
    return {
        id: item.id.toString() || null,
        amount: formatCurrency(item.amount),
        note: item.note || '',
        date: item.date.toString(),
        category: item.category,
        type: item.type
    };
};

const getData = async (numberMonths: number) => {
    const { db } = await connectToDatabase();

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

        let sum = 0;
        for (let key in types) {
            let items = await db
                .collection('items')
                .find({
                    'type': types[key],
                    'date': {
                        $gt: new Date(startDate),
                        $lt: new Date(endDate)
                    }
                })
                .toArray();

            for (let item in items) {
                items[item].id = items[item]._id;
                // we change it from _id to id for consistency in rendering
                delete items[item]._id;
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

const ITEM_CATEGORIES = [
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
    'payroll'
];

const ITEM_TYPES = [
    'income',
    'expense'
];

export {
    toJson,
    getData,
    ITEM_CATEGORIES,
    ITEM_TYPES
};