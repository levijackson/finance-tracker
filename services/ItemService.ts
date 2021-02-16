import mysql from 'serverless-mysql';

export default class ItemService {
    // todo what is the serverless connection type?
    db: object;

    constructor() {
        this.db = mysql({
            config: {
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                database: process.env.MYSQL_DATABASE,
                user: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD,
            },
        });
    }

    async query(
        q: string,
        values: (string | number)[] | string | number = [],
        callback = null
    ) {
        try {
            if (!callback) {
                callback = function () {
    
                };
            }
    
            const results = await this.db.query(q, values, callback)
            await this.db.end();
            return results;
        } catch (e) {
            throw Error(e.message);
        }
    };

    /**
     * Get items for a user in a specific type/date range
     * 
     * @param userId 
     * @param type 
     * @param startDate 
     * @param endDate 
     */
    getItems (userId: number, type: string, startDate: string, endDate: string ) {
        const db = this.db;
        return new Promise(function (resolve, reject) {
            db.query(
                `
                SELECT i.* FROM items i
                LEFT JOIN user_items ui
                ON i.id = ui.itemId
                WHERE 
                ui.userId = ?
                AND i.type = ?
                AND i.date BETWEEN ? AND ?
                `,
                [
                    userId,
                    type,
                    startDate,
                    endDate
                ], function (error, results, fields) {
                    resolve(results);
                }
            );
        });
    }
}