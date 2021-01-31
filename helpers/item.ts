import { formatDate } from 'utils/date';
import { formatCurrency } from 'utils/currency';

// todo: how to type hint Item
const toJson = (item) => {
    return {
        amount: formatCurrency(item.amount),
        note: item.note || '',
        date: formatDate(item.date)
    };
};

export {
    toJson
};