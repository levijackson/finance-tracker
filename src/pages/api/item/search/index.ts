import type { NextApiRequest, NextApiResponse } from 'next';
import Amplify, { withSSRContext } from 'aws-amplify';
import awsconfig from 'aws-exports.js';
import ItemService from 'services/ItemService';

// needs to be enabled in each API route
Amplify.configure({ ...awsconfig, ssr: true });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
  }

  const { API, Auth } = withSSRContext({ req });
  const user = await Auth.currentAuthenticatedUser();
  const service = new ItemService();

  try {
    const items = await service.getItemsByMonth(API, user.attributes.sub, req.body.type, req.body.date)
    res.status(201).json({ success: true, items: items });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
