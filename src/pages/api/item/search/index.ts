import type { NextApiRequest, NextApiResponse } from 'next';
import Amplify, { withSSRContext } from 'aws-amplify';
import { amplifyConfiguration } from 'src/helpers/aws';
import ItemService from 'src/services/ItemService';

// needs to be enabled in each API route
Amplify.configure(amplifyConfiguration());

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405);
  }

  const { API, Auth } = withSSRContext({ req });
  const user = await Auth.currentAuthenticatedUser();
  const service = new ItemService();

  try {
    const items = await service.getItemsByMonth(API, user.attributes.sub, String(req.query.type), String(req.query.date))
    res.status(201).json({ success: true, items: items });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
