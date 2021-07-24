import type { NextApiRequest, NextApiResponse } from 'next';
import Amplify, { withSSRContext } from 'aws-amplify';
import { amplifyConfiguration } from 'src/helpers/aws';
import ItemService from 'src/services/ItemService';
import { ItemInterface } from 'src/components/interfaces/Item';

// needs to be enabled in each API route
Amplify.configure(amplifyConfiguration());

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const service = new ItemService();
  const { API } = withSSRContext({ req });
  const item_uuid = req.body.item_uuid;

  const item = await service.getItemByUuid(API, item_uuid);

  if (!item) {
    return res.status(405);
  }

  if (req.method == 'DELETE') {
    service.deleteItem(API, item);
    return res.status(201).json({ success: true });
  }

  if (req.method !== 'POST') {
    return res.status(405);
  }

  try {
    const itemChanges: ItemInterface = {
      type: req.body.type,
      category: req.body.category,
      amount: req.body.amount,
      date: req.body.date,
      note: req.body.note,
    }
    const return_item_uuid = await service.updateItem(API, item, itemChanges);
      
    res.status(201).json({ success: true, item_uuid: return_item_uuid });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
