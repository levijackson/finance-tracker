/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem($owner: String!) {
    onCreateItem(owner: $owner) {
      user_uuid
      type
      category
      amount
      date
      created
      updated
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
      user_uuid
      type
      category
      amount
      date
      created
      updated
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
      user_uuid
      type
      category
      amount
      date
      created
      updated
      note
      createdAt
      updatedAt
      owner
    }
  }
`;
