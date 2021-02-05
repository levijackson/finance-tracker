import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from 'helpers/db';
import { ObjectId } from 'mongodb';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    const { db } = await connectToDatabase();

    try {
        await db
            .collection('items')
            .findOneAndUpdate({
                '_id': new ObjectId(req.query.id)
            },
            {
                $set: req.body
            });

        
        res.status(201).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}
