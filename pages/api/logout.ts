import type { NextApiRequest, NextApiResponse } from 'next';
import withSession from 'lib/session';

export default withSession(async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
