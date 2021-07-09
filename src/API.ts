/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateItemInput = {
  user_uuid: string,
  type: TYPE,
  category: string,
  amount: number,
  date: string,
  created: string,
  updated: string,
  note?: string | null,
};

export enum TYPE {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}


export type ModelItemConditionInput = {
  category?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  date?: ModelStringInput | null,
  created?: ModelStringInput | null,
  updated?: ModelStringInput | null,
  note?: ModelStringInput | null,
  and?: Array< ModelItemConditionInput | null > | null,
  or?: Array< ModelItemConditionInput | null > | null,
  not?: ModelItemConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Item = {
  __typename: "Item",
  user_uuid: string,
  type: TYPE,
  category: string,
  amount: number,
  date: string,
  created: string,
  updated: string,
  note?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateItemInput = {
  user_uuid: string,
  type: TYPE,
  category?: string | null,
  amount?: number | null,
  date?: string | null,
  created?: string | null,
  updated?: string | null,
  note?: string | null,
};

export type DeleteItemInput = {
  user_uuid: string,
  type: TYPE,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelItemFilterInput = {
  user_uuid?: ModelStringInput | null,
  type?: ModelTYPEInput | null,
  category?: ModelStringInput | null,
  amount?: ModelFloatInput | null,
  date?: ModelStringInput | null,
  created?: ModelStringInput | null,
  updated?: ModelStringInput | null,
  note?: ModelStringInput | null,
  and?: Array< ModelItemFilterInput | null > | null,
  or?: Array< ModelItemFilterInput | null > | null,
  not?: ModelItemFilterInput | null,
};

export type ModelTYPEInput = {
  eq?: TYPE | null,
  ne?: TYPE | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelItemConnection = {
  __typename: "ModelItemConnection",
  items?:  Array<Item | null > | null,
  nextToken?: string | null,
};

export type CreateItemMutationVariables = {
  input: CreateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type CreateItemMutation = {
  createItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateItemMutationVariables = {
  input: UpdateItemInput,
  condition?: ModelItemConditionInput | null,
};

export type UpdateItemMutation = {
  updateItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteItemMutationVariables = {
  input: DeleteItemInput,
  condition?: ModelItemConditionInput | null,
};

export type DeleteItemMutation = {
  deleteItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetItemQueryVariables = {
  user_uuid: string,
  type: TYPE,
};

export type GetItemQuery = {
  getItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListItemsQueryVariables = {
  user_uuid?: string | null,
  type?: ModelStringKeyConditionInput | null,
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListItemsQuery = {
  listItems?:  {
    __typename: "ModelItemConnection",
    items?:  Array< {
      __typename: "Item",
      user_uuid: string,
      type: TYPE,
      category: string,
      amount: number,
      date: string,
      created: string,
      updated: string,
      note?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ItemsByDateQueryVariables = {
  date?: string | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ItemsByDateQuery = {
  itemsByDate?:  {
    __typename: "ModelItemConnection",
    items?:  Array< {
      __typename: "Item",
      user_uuid: string,
      type: TYPE,
      category: string,
      amount: number,
      date: string,
      created: string,
      updated: string,
      note?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateItemSubscriptionVariables = {
  owner: string,
};

export type OnCreateItemSubscription = {
  onCreateItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateItemSubscriptionVariables = {
  owner: string,
};

export type OnUpdateItemSubscription = {
  onUpdateItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteItemSubscriptionVariables = {
  owner: string,
};

export type OnDeleteItemSubscription = {
  onDeleteItem?:  {
    __typename: "Item",
    user_uuid: string,
    type: TYPE,
    category: string,
    amount: number,
    date: string,
    created: string,
    updated: string,
    note?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
