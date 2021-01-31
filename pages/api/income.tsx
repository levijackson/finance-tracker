import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/db';
import Item from '../../models/item';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    await db();

    try {
        const item = await Item.create(req.body)
        res.status(201).json({ success: true, data: item })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
