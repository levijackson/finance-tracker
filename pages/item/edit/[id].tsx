import { GetServerSideProps } from 'next';

import { ItemInterface } from 'components/interfaces/Item';
import FinanceForm from 'components/FinanceForm';
import { query } from 'helpers/db';
import { toJson } from 'helpers/item';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const results = await query(
        `
        SELECT *
        FROM items
        WHERE id = ?
      `,
        context.query.id
    );

    let item = toJson(results[0]);

    return {
        props: {
            item
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
            <FinanceForm type="expense" item={props.item} className="col-xs-12" />
        </>
    );
}

export default EditForm;