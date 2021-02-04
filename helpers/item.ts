import { formatDate } from 'utils/date';
import { formatCurrency } from 'utils/currency';
import { ItemInterface } from 'components/interfaces/Item';
import db from 'helpers/db';
import Item from 'models/item';

const toJson = (item: ItemInterface) => {
    return {
        id: item.id || null,
        amount: formatCurrency(item.amount),
        note: item.note || '',
        date: formatDate(item.date),
        category: item.category,
        type: item.type
    };
};

const getData = async (type: string, numberMonths: number) => {
    await db();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentDate = new Date();
    let data = [];
    let sum = 0.
    for (let i = 0; i < numberMonths; i++) {
        currentDate.setDate(0); // going to 1st of the month
        currentDate.setHours(-1); // going to last hour before this date even started.
        let monthName = monthNames[currentDate.getMonth()];

        let startDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-01';
        let endDate = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate();

        let items = (await Item.find({
            'type': type,
            'date': {
                $gt: startDate,
                $lt: endDate
            }
        }).exec()).map((item) => {
            return toJson(item);
        });

        for (let item in items) {
            sum += items[item].amount;
        }

        data.push({
            'month': monthName,
            'items': items,
            'sum': sum
        });

        
    }

    return {
        data
    };
};

export {
    toJson,
    getData
};