import type { NextApiRequest, NextApiResponse } from 'next';
import Amplify, { withSSRContext } from 'aws-amplify';
import awsconfig from '../../../aws-exports.js';
import { byItemUuid } from '../../../graphql/queries';
import { updateItem, deleteItem } from '../../../graphql/mutations';
import { UpdateItemInput, DeleteItemInput, Item } from '../../../API';
import { getItemUuid } from '../../../helpers/item';

// needs to be enabled in each API route
Amplify.configure({ ...awsconfig, ssr: true });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { API } = withSSRContext({ req });
  const item_uuid = req.body.item_uuid;

  const results = await API.graphql({
    query: byItemUuid,
    variables: {item_uuid: item_uuid},
    authMode: 'AMAZON_COGNITO_USER_POOLS'
  });
  let item: Item = results.data.byItemUuid.items[0];

  if (!item) {
    return res.status(405);
  }

  if (req.method == 'DELETE') {
    const dynamoItem: DeleteItemInput = {
      PK: item.PK,
      SK: item.SK
    }
    await API.graphql({
      query: deleteItem,
      variables: {input: dynamoItem},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    return res.status(201).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405);
  }

  try {
    let dynamoItem: UpdateItemInput = {
      PK: item.PK,
      SK: item.SK,
      user_uuid: item.user_uuid,
      type: req.body.type,
      category: req.body.category,
      amount: req.body.amount,
      date: req.body.date,
      note: req.body.note,
      createdAt: item.createdAt
    }
    // Set it after we change the data
    dynamoItem.item_uuid = getItemUuid(dynamoItem);

    await API.graphql({
      query: updateItem,
      variables: {input: dynamoItem},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
      
    res.status(201).json({ success: true, item_uuid: dynamoItem.item_uuid });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
