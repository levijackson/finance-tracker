export enum TYPE {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}
  
export interface ItemInterface {
  user_uuid: string,
  type: TYPE,
  category: string,
  amount: number,
  date: string,
  created: string,
  updated: string,
  note?: string | null,
}