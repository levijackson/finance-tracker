import { GetServerSideProps } from 'next'

import Recent from 'components/recent';
import db from 'helpers/db';
import Item from 'models/item';
import { toJson } from 'helpers/item'
import useUser from 'lib/useUser';

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
  const { user, mutateUser } = useUser();

    if (!user) {
        return null;
    }

    return (
      <>
        <Recent title="Income" items={props.income} />
        <Recent title="Expenses" items={props.expense} />
      </>
    )
}
