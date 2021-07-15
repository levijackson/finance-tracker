import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { ItemInterface } from 'components/interfaces/Item';
import { formatDate } from 'utils/date';


interface RecentProps {
  data: {
    [key: number]: {
      month: string;
      expense: {
        items: Array<ItemInterface>;
        sum: number;
      },
      income: {
        items: Array<ItemInterface>;
        sum: number;
      }
    }
  }
}

const Recent = (props: RecentProps) => {
  let markup = [];

  if(!props.data || !props.data[0]) {
      markup.push(<FontAwesomeIcon icon={faSpinner} className="fa-spin" />);
  } else {
    for(let i in props.data) {
      let itemMarkup = [];

      if (props.data[i].income.items.length > 0) {
        markup.push(<h4 key={'income-header'+ i}>{ props.data[i].month } - Income</h4>);
        props.data[i].income.items.map((item: ItemInterface, itemIndex: number) => {
          itemMarkup.push(
            <li key={item.item_uuid}>
              <Link href={"/item/edit/" + item.item_uuid}><a>${item.amount} ({formatDate(new Date(item.date))})</a></Link>
            </li>
          );
        });
        markup.push(<ul key={'income'+ i}>{ itemMarkup }</ul>);
      }

      if (props.data[i].expense.items.length > 0) {
        markup.push(<h4 key={'expense-header'+ i}>{ props.data[i].month } - Expense</h4>);
        itemMarkup = [];
        props.data[i].expense.items.map((item: ItemInterface, itemIndex: number) => {
          itemMarkup.push(
            <li key={item.item_uuid}>
              <Link href={"/item/edit/" + item.item_uuid}><a>${item.amount} ({formatDate(new Date(item.date))})</a></Link>
            </li>
          );
        });
        markup.push(<ul key={'expense' + i}>{ itemMarkup }</ul>);
      }
    }
  }

  
  
  return (
    <>
    <h2>Recent Transactions</h2>
    { markup }
    </>
  );
};

export default Recent;