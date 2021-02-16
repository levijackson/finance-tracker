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
    database: process.env.MYSQL_URI,
    callbacks: {
        async session(session: object, user: object) {
            return { ...session, userId: user['id'] };
        },
    }
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);