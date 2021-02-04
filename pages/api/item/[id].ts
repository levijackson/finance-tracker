import type { NextApiRequest, NextApiResponse } from 'next';
import db from 'helpers/db';
import Item from 'models/item';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    await db();

    try {
        let result = (await Item.findById(req.query.id).exec());
        let data = req.body;
        const date = new Date(data.date);
        result.date = date.toLocaleDateString();
        result.category = data.category;
        result.amount = data.amount;
        result.note = data.note;
        await result.save();
        
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}
