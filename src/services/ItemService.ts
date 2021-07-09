import { createItem } from '../graphql/mutations';
import { ItemInterface } from '../components/interfaces/Item';



export default class ItemService {
    // db: object;

    // constructor() {
    //     this.db = mysql({
    //         config: {
    //             host: process.env.MYSQL_HOST,
    //             port: parseInt(process.env.MYSQL_PORT),
    //             database: process.env.MYSQL_DATABASE,
    //             user: process.env.MYSQL_USERNAME,
    //             password: process.env.MYSQL_PASSWORD,
    //         },
    //     });
    // }

    // async query(
    //     q: string,
    //     values: (string | number)[] | string | number = [],
    //     callback = null
    // ) {
    //     try {
    //         if (!callback) {
    //             callback = function () {
    
    //             };
    //         }
    
    //         const results = await this.db.query(q, values, callback)
    //         await this.db.end();
    //         return results;
    //     } catch (e) {
    //         throw Error(e.message);
    //     }
    // };

    // /**
    //  * Get items for a user in a specific type/date range
    //  * 
    //  * @param userId 
    //  * @param type 
    //  * @param startDate 
    //  * @param endDate 
    //  */
    // getItemsByDateRange (userId: number, type: string, startDate: string, endDate: string ) {
    //     const db = this.db;
    //     return new Promise(function (resolve, reject) {
    //         db.query(
    //             `
    //             SELECT i.* FROM items i
    //             LEFT JOIN user_items ui
    //             ON i.id = ui.itemId
    //             WHERE 
    //             ui.userId = ?
    //             AND i.type = ?
    //             AND i.date BETWEEN ? AND ?
    //             `,
    //             [
    //                 userId,
    //                 type,
    //                 startDate,
    //                 endDate
    //             ], function (errors, results, fields) {
    //                 resolve(results);
    //             }
    //         );
    //     });
    // }

    // /**
    //  * @param userId 
    //  * @param itemId 
    //  */
    // getItem (userId: number, itemId: number) {
    //     const db = this.db;
    //     return new Promise(function (resolve, reject) {
    //         db.query(
    //             `
    //             SELECT i.*
    //             FROM items i
    //             LEFT JOIN user_items ui
    //             ON ui.itemId = i.id
    //             WHERE
    //             i.id = ?
    //             AND
    //             ui.userId = ?
    //             `,
    //             [
    //                 itemId,
    //                 userId
    //             ],
    //             function (errors, results, fields) {
    //                 resolve(results);
    //             }
    //         )
    //     });
    // }

    // /**
    //  * Convert date into MySQL format
    //  * 
    //  * @param date 
    //  */
    // formatDateTime(date: string) {
    //     return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    // }

    // /**
    //  * @param item 
    //  */
    // async updateItem(item: ItemInterface) {
    //     await this.db.query(
    //         `
    //         UPDATE items
    //         SET type = ?,
    //         category = ?,
    //         amount = ?,
    //         date = ?,
    //         note = ?
    //         WHERE id = ?
    //       `,
    //         [
    //             item.type,
    //             item.category, 
    //             item.amount, 
    //             this.formatDateTime(item.date), 
    //             item.note, 
    //             item.id
    //         ]
    //     );
    // }

    // /**
    //  * @param itemId 
    //  */
    // async deleteItem(itemId: number) {
    //     await this.db.query(
    //         `
    //         DELETE FROM items
    //         WHERE id = ?
    //       `,
    //         [
    //             itemId
    //         ]
    //     );

    //     await this.db.query(
    //         `
    //         DELETE FROM user_items
    //         WHERE itemId = ?
    //       `,
    //         [
    //             itemId
    //         ]
    //     );   
    // }

    // /**
    //  * @param item 
    //  */
    // async addItem(item: ItemInterface) {
    //     return (
    //       await API.graphql({
    //         query: createItem,
    //         variables: {input: item},
    //         authMode: 'AMAZON_COGNITO_USER_POOLS'
    //       })
    //     );
        // graphqlOperation(createItem, item)));

        // const db = this.db;
        // await db.query(
        //     `
        //     INSERT INTO items (type, category, amount, date, note)
        //     VALUES (?, ?, ?, ?, ?)
        //     `,
        //     [
        //         item.type,
        //         item.category, 
        //         item.amount, 
        //         this.formatDateTime(item.date), 
        //         item.note
        //     ],
        //     function (error, result, fields) {
        //         db.query(
        //             `INSERT INTO user_items (userId, itemId)
        //             VALUES (?, ?)`,
        //             [
        //                 userId,
        //                 result.insertId
        //             ]
        //         );
        //     }
        //   )
    // }

    // /**
    //  * Get the year/month options
    //  * @param userId 
    //  */
    // getDateOptions(userId: number) {
    //     const db = this.db;
    //     return new Promise(function (resolve, reject) {
    //         const months = db.query(
    //             `
    //             SELECT DISTINCT
    //                 DATE_FORMAT(i.date, '%Y') AS year,
    //                 DATE_FORMAT(i.date, '%m') AS month
    //             FROM items i
    //             LEFT JOIN user_items ui
    //                 ON i.id = ui.itemId
    //             WHERE 
    //                 ui.userId = ?
    //             `,
    //             [userId],
    //             function (errors, results, fields) {
    //                 resolve(results);
    //             }
    //         );
    //     });
    // }
}