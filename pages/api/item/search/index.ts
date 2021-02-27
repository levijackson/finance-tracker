import type { NextApiRequest, NextApiResponse } from 'next';
import ItemService from 'services/ItemService';
import { ItemInterface } from 'components/interfaces/Item';
import { toJson } from 'helpers/item';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }
    
    try {        
        const service = new ItemService();
        const startDate = req.body.date + '-01';
        const endDate = req.body.date + '-31';
        let expenses = [];
        await service.getItemsByDateRange(req.body.userId, 'expense', startDate, endDate).then(function (response) {
            expenses = response.map((item: ItemInterface) => {
                return toJson(item);
            });
        });
        
        let income = [];
        await service.getItemsByDateRange(req.body.userId, 'income', startDate, endDate).then(function (response) {
            income = response.map((item: ItemInterface) => {
                return toJson(item);
            });
        });

        res.status(201).json({ success: true, income: income, expenses: expenses });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}
