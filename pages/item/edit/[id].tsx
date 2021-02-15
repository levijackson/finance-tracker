import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

import { ItemInterface } from 'components/interfaces/Item';
import FinanceForm from 'components/FinanceForm';
import { query } from 'helpers/db';
import { toJson } from 'helpers/item';

const getItem = (userId: number, itemId: number) => {
    return new Promise(function (resolve, reject) {
        query(
            `
        SELECT *
        FROM items i
        LEFT JOIN user_items ui
        ON ui.itemId = i.id
        WHERE
        i.id = ?
        AND
        ui.userId = ?
      `,
            [
                itemId,
                userId
            ],
            function (error, results, fields) {
                resolve(results);
            }
        )
    });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const results = await getItem(session.userId, context.query.id);

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
            <h1 className="col-xs-12">Edit</h1>
            <FinanceForm type="expense" item={props.item} className="col-xs-12" />
        </>
    );
}

export default EditForm;