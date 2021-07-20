import { ItemInterface } from 'src/components/interfaces/Item';
import { createItem, updateItem, deleteItem } from 'src/graphql/mutations';
import { byItemUuid, listItems } from 'src/graphql/queries';
import { CreateItemInput, UpdateItemInput, DeleteItemInput, Item, TYPE } from 'src/API';
import { getPrimaryKey, getSortKey, getItemUuid } from 'src/helpers/item';



export default class ItemService {

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
  async updateItem(API: any, currentItem: Item, itemChanges: ItemInterface) {
    try {
      let dynamoItem: UpdateItemInput = {
        PK: currentItem.PK,
        SK: currentItem.SK,
        user_uuid: currentItem.user_uuid,
        item_uuid: currentItem.item_uuid,
        type: TYPE[itemChanges.type],
        category: itemChanges.category,
        amount: itemChanges.amount,
        date: itemChanges.date,
        note: itemChanges.note,
        createdAt: currentItem.createdAt,
      }

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
      // CreateItemInput
      const dynamoItem = {
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

  /**
   * Get a list of items that were logged in a given month
   * 
   * @param API  Amplify authenticated API object
   * @param string user_uuid
   * @param string type   income|expense
   * @param string date    2021-02
   */
  async getItemsByMonth(API: any, user_uuid: string, type: string, date: string) {
    try {
      const items = await API.graphql({
        query: listItems,
        variables: {
          PK: 'USER#' + user_uuid,
          SK: { beginsWith: type + '#' + date }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      return items.data.listItems.items;
    } catch(error) {
      console.log('addItem failed');
      console.log(error);
    }
  }
}