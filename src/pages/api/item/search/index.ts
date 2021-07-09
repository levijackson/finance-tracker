import type { NextApiRequest, NextApiResponse } from 'next';
import Amplify, { withSSRContext } from 'aws-amplify';
import awsconfig from '../../../../aws-exports.js';
import { listItems } from '../../../../graphql/queries';

// needs to be enabled in each API route
Amplify.configure({ ...awsconfig, ssr: true });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405);
  }

  const { API, Auth } = withSSRContext({ req });

  const user = await Auth.currentAuthenticatedUser();

  try {
    const type = req.body.type;

    const items = await API.graphql({
      query: listItems,
      variables: {
        PK: 'USER#' + user.attributes.sub,
        SK: { beginsWith: type + '#' + req.body.date }
      },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    res.status(201).json({ success: true, items: items.data.listItems.items });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
}
