import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'helpers/db';
import Item from 'models/item';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    await db();

    try {
        let data = req.body;
        const date = new Date(data.date);
        data.date = date.toLocaleDateString();
        
        const item = await Item.create(data);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}
