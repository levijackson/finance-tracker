import { GetServerSideProps } from 'next';
import FinanceForm from 'components/FinanceForm';
import db from 'helpers/db';
import Item from 'models/item';
import { ItemInterface } from 'components/interfaces/item';
import { toJson } from 'helpers/item';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    await db();
    let item = (await Item.findById(query.id).exec());
    item = toJson(item);

    return {
        props: {
            item,
            id: query.id
        }
      };
};

interface ExpenseProps {
    item: ItemInterface;
    id: string
}

const Expense = (props: ExpenseProps) => {
    return (
        <>
        <h1 className="col-xs-12">Edit Expense</h1>
        <FinanceForm type="expense" item={props.item} id={props.id} className="col-xs-12" />
        </>
    );
}

export default Expense;