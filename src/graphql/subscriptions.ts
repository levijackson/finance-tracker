/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($owner: String!) {
    onCreateItem(owner: $owner) {
      PK
      SK
      item_uuid
      user_uuid
      type
      category
      amount
      date
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem($owner: String!) {
    onUpdateItem(owner: $owner) {
      PK
      SK
      item_uuid
      user_uuid
      type
      category
      amount
      date
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem($owner: String!) {
    onDeleteItem(owner: $owner) {
      PK
      SK
      item_uuid
      user_uuid
      type
      category
      amount
      date
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
