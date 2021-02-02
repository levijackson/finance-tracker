import { formatDate } from 'utils/date';
import { formatCurrency } from 'utils/currency';
import { ItemInterface } from 'components/interfaces/Item';

const toJson = (item: ItemInterface) => {
    return {
        amount: formatCurrency(item.amount),
        note: item.note || '',
        date: formatDate(item.date)
    };
};

export {
    toJson
};