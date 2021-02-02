import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client';

import Recent from 'components/Recent';
import db from 'helpers/db';
import Item from 'models/item';
import { ItemInterface } from 'components/interfaces/Item';
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

interface HomeProps {
  income: Array<ItemInterface>;
  expense: Array<ItemInterface>;
}

export default function Home(props: HomeProps) {
    const [ session, loading ] = useSession();

    if (!session) {
      return (
          <>
              <p>You must log in to use this.</p>
          </>
      );
    }

    return (
      <>
        <h1 className="col-xs-12">
          Welcome
          { session && session.user.name && <span> {session.user.name}</span>}
          !
        </h1>
        <Recent title="Income" items={props.income} />
        <Recent title="Expenses" items={props.expense} />
      </>
    )
}
