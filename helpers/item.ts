import { formatDate } from '../utils/date';

// todo: how to type hint Item
const toJson = (item) => {
    return {
        amount: item.amount,
        note: item.note || '',
        date: formatDate(item.date)
    };
};

export {
    toJson
};