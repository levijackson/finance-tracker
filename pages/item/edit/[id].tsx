import { GetServerSideProps } from 'next';
import FinanceForm from 'components/FinanceForm';
import { connectToDatabase } from 'helpers/db';
import { ItemInterface } from 'components/interfaces/Item';
import { ObjectId } from 'mongodb';
import { toJson } from 'helpers/item';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { db } = await connectToDatabase();

    let item = await db
            .collection('items')
            .findOne({
                '_id': new ObjectId(query.id)
            });
    item = toJson(item);

    return {
        props: {
            item,
            id: query.id
        }
      };
};

interface EditProps {
    item: ItemInterface;
    id: string
}

const EditForm = (props: EditProps) => {
    return (
        <>
        <h1 className="col-xs-12">Edit</h1>
        <FinanceForm type="expense" item={props.item} id={props.id} className="col-xs-12" />
        </>
    );
}

export default EditForm;