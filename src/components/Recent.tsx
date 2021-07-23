import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEdit } from '@fortawesome/free-solid-svg-icons';

import { ItemInterface } from 'src/components/interfaces/Item';
import { formatDate } from 'src/utils/date';
import WidgetWrapper from 'src/components/WidgetWrapper';

import styles from 'src/styles/recent.module.scss';


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
        markup.push(<h4 className={styles.heading} key={'income-header'+ i}>Income - { props.data[i].month }</h4>);
        props.data[i].income.items.map((item: ItemInterface, itemIndex: number) => {
          itemMarkup.push(
            <li key={item.item_uuid}>
              <Link href={"/item/edit/" + item.item_uuid}>
                <a>
                  <FontAwesomeIcon icon={faEdit} />
                  ${item.amount} ({formatDate(new Date(item.date))})
                </a>
              </Link>
            </li>
          );
        });
        markup.push(<ul className={styles.transactions} key={'income'+ i}>{ itemMarkup }</ul>);
      }

      if (props.data[i].expense.items.length > 0) {
        markup.push(<h4 className={styles.heading} key={'expense-header'+ i}>Expenses - { props.data[i].month }</h4>);
        itemMarkup = [];
        props.data[i].expense.items.map((item: ItemInterface, itemIndex: number) => {
          itemMarkup.push(
            <li key={item.item_uuid}>
              <Link href={"/item/edit/" + item.item_uuid}>
                <a>
                  <FontAwesomeIcon icon={faEdit} />
                  ${item.amount} ({formatDate(new Date(item.date))})
                </a>
              </Link>
            </li>
          );
        });
        markup.push(<ul className={styles.transactions} key={'expense' + i}>{ itemMarkup }</ul>);
      }
    }
  }

  
  
  return (
    <WidgetWrapper>
      <h2>Recent Transactions</h2>
      { markup }
    </WidgetWrapper>
  );
};

export default Recent;