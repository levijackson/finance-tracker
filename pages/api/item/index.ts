import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'helpers/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    const { db } = await connectToDatabase();

    try {        
        await db
            .collection('items')
            .insertOne(req.body);

        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}
