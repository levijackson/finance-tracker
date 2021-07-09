/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($PK: String!, $SK: String!) {
    getItem(PK: $PK, SK: $SK) {
      PK
      SK
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $PK: String
    $SK: ModelStringKeyConditionInput
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItems(
      PK: $PK
      SK: $SK
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        PK
        SK
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
      nextToken
    }
  }
`;
