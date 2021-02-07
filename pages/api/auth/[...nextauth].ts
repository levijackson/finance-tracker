import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options: object = {
    providers: [
        Providers.Google({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET
        })
    ],
    database: process.env.MONGODB_URI
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);