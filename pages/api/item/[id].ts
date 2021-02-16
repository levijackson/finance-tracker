import { ItemInterface } from 'components/interfaces/Item';
import type { NextApiRequest, NextApiResponse } from 'next';
import ItemService from 'services/ItemService';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    try {
        const item: ItemInterface = {
            date: req.body.date,
            type: req.body.type,
            category: req.body.category,
            amount: req.body.amount,
            note: req.body.note,
            id: req.body.id
        };
        const service = new ItemService();
        service.updateItem(item);
        
        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}
