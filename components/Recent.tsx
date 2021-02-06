import { ItemInterface } from 'components/interfaces/Item';
import Link from 'next/link';
import { formatDate } from 'utils/date';

interface RecentProps {
    data: {
        month: string;
        items: Array<ItemInterface>
    };
}

const Recent = (props: RecentProps) => {
    let markup = [];
    for(let i in props.data) {
        markup.push(<h4>{ props.data[i].month } - Income</h4>);
        let itemMarkup = [];
        props.data[i].income.items.map((item: ItemInterface, itemIndex: number) => {
            itemMarkup.push(
                <li key={itemIndex}>
                    <Link href={"/item/edit/" + item.id}><a>${item.amount} ({formatDate(new Date(item.date))})</a></Link>
                </li>
            );
        });
        markup.push(<ul>{ itemMarkup }</ul>);

        markup.push(<h4>{ props.data[i].month } - Expense</h4>);
        itemMarkup = [];
        props.data[i].expense.items.map((item: ItemInterface, itemIndex: number) => {
            itemMarkup.push(
                <li key={itemIndex}>
                    <Link href={"/item/edit/" + item.id}><a>${item.amount} ({formatDate(new Date(item.date))})</a></Link>
                </li>
            );
        });
        markup.push(<ul>{ itemMarkup }</ul>);
    }
    return (
        <div className="col-xs-12 col-sm-6">
            { markup }
        </div>
    );
};

export default Recent;