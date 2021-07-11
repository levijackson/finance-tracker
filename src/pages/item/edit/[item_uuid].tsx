import { GetServerSideProps } from 'next';

import { withSSRContext } from 'aws-amplify';

import { ItemInterface } from 'components/interfaces/Item';
import { UserInterface } from 'components/interfaces/User';
import FinanceForm from 'components/FinanceForm';
import { toJson } from 'helpers/item';
import { byItemUuid } from 'graphql/queries';
import ItemService from 'services/ItemService';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const service = new ItemService();
    const { API } = withSSRContext(context);
    
    const item = await service.getItemByUuid(API, context.query.item_uuid);


    if (!item) {
        context.res.setHeader('Location', '/item/add');
        context.res.statusCode = 302;
        context.res.end();
    }
    
    return {
        props: {
            item: toJson(item)
        }
      };
};

interface EditProps {
    item: ItemInterface;
    user: UserInterface;
}

const EditForm = (props: EditProps) => {
    return (
        <>
            <h1 className="col-xs-12">Edit {props.item.type}</h1>
            <FinanceForm user={props.user} type="expense" item={props.item} className="col-xs-12" />
        </>
    );
}

export default EditForm;