import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { ItemInterface } from 'components/interfaces/Item';
import FinanceForm from 'components/FinanceForm';
import ItemService from 'services/ItemService';
import { toJson } from 'helpers/item';



export const getServerSideProps: GetServerSideProps = async (context) => {
    const service = new ItemService();
    const session = await getSession(context);
    const results: ItemInterface[] = await service.getItem(session.userId, context.query.id);

    if (results && results.length === 0) {
        context.res.setHeader('Location', '/item/add');
        context.res.statusCode = 302;
        context.res.end();
    }

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
            <h1 className="col-xs-12">Edit {props.item.type}</h1>
            <FinanceForm type="expense" item={props.item} className="col-xs-12" />
        </>
    );
}

export default EditForm;