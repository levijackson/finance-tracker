import type { NextApiRequest, NextApiResponse } from 'next';
import Amplify, { withSSRContext } from 'aws-amplify';
import awsconfig from '../../../aws-exports.js';
import { createItem } from '../../../graphql/mutations';
import { CreateItemInput } from '../../../API';
import { getPrimaryKey, getSortKey, getItemUuid } from '../../../helpers/item';
import { ItemInterface } from 'src/components/interfaces/Item.js';


// needs to be enabled in each API route
Amplify.configure({ ...awsconfig, ssr: true });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
  }

  const { API } = withSSRContext({ req });

  try {
    const currentTime = new Date().toISOString();
    const item: ItemInterface = {
      date: req.body.date,
      type: req.body.type,
      category: req.body.category,
      amount: req.body.amount,
      note: req.body.note,
      user_uuid: req.body.user_uuid,
      createdAt: currentTime
    };

    const dynamoItem: CreateItemInput = {
      ...item,
      PK: getPrimaryKey(item),
      SK: getSortKey(item),
      item_uuid: getItemUuid(item)
    };

    await API.graphql({
      query: createItem,
      variables: {input: dynamoItem},
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
  
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
