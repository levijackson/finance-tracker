import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Recent from '../components/recent';
import { GetServerSideProps } from 'next'
import db from '../helpers/db';
import Item from '../models/item';
import { toJson } from 'helpers/item'

export const getServerSideProps: GetServerSideProps = async (context) => {
    await db();
    const income = await (await Item.find().where('category').equals('income').exec()).map((item) => {
        return toJson(item);
    });
    const expense = await (await Item.find().where('category').equals('expense').exec()).map((item) => {
      return toJson(item);
    });

  return {
    props: {
      income: income,
      expense: expense
    }
  }
}


export default function Home(props) {
    return (
        <div className={styles.container}>
            <Link href="/expense/add">Add an Expense</Link>
            <br />
            <Link href="/income/add">Add some Income</Link>

            <Recent title="Income" items={props.income} />
            <Recent title="Expenses" items={props.expense} />
        </div>
    )
}
