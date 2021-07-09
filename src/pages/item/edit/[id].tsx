import { GetServerSideProps } from 'next';

import { withSSRContext } from 'aws-amplify';

import { ItemInterface } from 'components/interfaces/Item';
import FinanceForm from 'components/FinanceForm';
import { toJson } from 'helpers/item';
import { byItemUuid } from '../../../graphql/queries';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { API } = withSSRContext(context);
console.log(context.query);
    // const results = await API.graphql({
    //     query: byItemUuid,
    //     variables: {
    //         item_uuid: context.query.item_uuid,
    //     },
    //     authMode: 'AMAZON_COGNITO_USER_POOLS'
    //   });

    // console.log(results);

    // if (results && results.length === 0) {
    //     context.res.setHeader('Location', '/item/add');
    //     context.res.statusCode = 302;
    //     context.res.end();
    // }

    // let item = toJson(results[0]);

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