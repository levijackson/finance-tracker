/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItem = /* GraphQL */ `
  query GetItem($user_uuid: String!, $type: TYPE!) {
    getItem(user_uuid: $user_uuid, type: $type) {
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
export const listItems = /* GraphQL */ `
  query ListItems(
    $user_uuid: String
    $type: ModelStringKeyConditionInput
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listItems(
      user_uuid: $user_uuid
      type: $type
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const itemsByDate = /* GraphQL */ `
  query ItemsByDate(
    $date: AWSDate
    $sortDirection: ModelSortDirection
    $filter: ModelItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    itemsByDate(
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
