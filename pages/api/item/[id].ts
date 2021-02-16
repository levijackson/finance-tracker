import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from 'helpers/db';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    try {
        // convert date into MySQL format
        const date = new Date(req.body.date).toISOString().slice(0, 19).replace('T', ' ');

        await query(
            `
            UPDATE items
            SET type = ?,
            category = ?,
            amount = ?,
            date = ?,
            note = ?
            WHERE id = ?
          `,
            [
                req.body.type,
                req.body.category, 
                req.body.amount, 
                date, 
                req.body.note, 
                req.query.id
            ]
        );
        
        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}
