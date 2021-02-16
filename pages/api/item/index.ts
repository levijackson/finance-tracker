import type { NextApiRequest, NextApiResponse } from 'next';
import { query } from 'helpers/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(405);
    }

    try {        
        await query(
            `
            INSERT INTO items (type, category, amount, date, note)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                req.body.type,
                req.body.category, 
                req.body.amount, 
                req.body.data, 
                req.body.note
            ],
            function (error, result, fields) {
                console.log(req.body.userId);
                console.log(result);
                query(
                    `INSERT INTO user_items (userId, itemId)
                    VALUES (?, ?)`,
                    [
                        req.body.userId,
                        result.insertId
                    ]
                );
            }
          )
      
        res.status(201).json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
}
