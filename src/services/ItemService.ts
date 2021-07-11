import { ItemInterface } from 'components/interfaces/Item';
import { createItem, updateItem, deleteItem } from 'graphql/mutations';
import { byItemUuid } from 'graphql/queries';
import { CreateItemInput, UpdateItemInput, DeleteItemInput, Item } from 'API';
import { getPrimaryKey, getSortKey, getItemUuid } from 'helpers/item';



export default class ItemService {
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


    /**
     * @param API  Amplify authenticated API object
     * @param item_uuid 
     * 
     * @returns object|null
     */
    async getItemByUuid(API: any, item_uuid: string) {
      try {
        const results = await API.graphql({
          query: byItemUuid,
          variables: {item_uuid: item_uuid},
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
        if (results.data.byItemUuid.items) {
          return results.data.byItemUuid.items[0];
        }
      } catch (error) {
        console.log('getItemByUuid failed');
        console.log(error);
      }
    }


    /**
     * @param API  Amplify authenticated API object
     * @param currentItem
     * @param itemChanges  JSON object of changes to make to item. Key=>Value
     * 
     * @return string  item_uuid for the item
     */
    async updateItem(API: any, currentItem: Item, itemChanges: Item) {
      try {
        let dynamoItem: UpdateItemInput = {
          PK: currentItem.PK,
          SK: currentItem.SK,
          user_uuid: currentItem.user_uuid,
          type: itemChanges.type,
          category: itemChanges.category,
          amount: itemChanges.amount,
          date: itemChanges.date,
          note: itemChanges.note,
          createdAt: currentItem.createdAt
        }
        // Set it after we change the data
        dynamoItem.item_uuid = getItemUuid(dynamoItem);

        await API.graphql({
          query: updateItem,
          variables: {input: dynamoItem},
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });

        return dynamoItem.item_uuid;
      } catch (error) {
        console.log('updateItem failed');
        console.log(error);
      }
    }

    /**
     * @param API  Amplify authenticated API object
     * @param item
     */
    async deleteItem(API: any, item: Item) {
      try {
        const dynamoItem: DeleteItemInput = {
          PK: item.PK,
          SK: item.SK
        }

        await API.graphql({
          query: deleteItem,
          variables: {input: dynamoItem},
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
      } catch (error) {
        console.log('deleteItem failed');
        console.log(error);
      }
    }

    /**
     * @param API  Amplify authenticated API object
     * @param item 
     */
    async addItem(API: any, item: ItemInterface) {
      try {
        const dynamoItem: CreateItemInput = {
          ...item,
          PK: getPrimaryKey(item),
          SK: getSortKey(item),
          item_uuid: getItemUuid(item)
        };
    
        await API.graphql({
          query: createItem,
          variables: {input: dynamoItem},
          authMode: 'AMAZON_COGNITO_USER_POOLS'
        });
      } catch(error) {
        console.log('addItem failed');
        console.log(error);
      }
    }

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