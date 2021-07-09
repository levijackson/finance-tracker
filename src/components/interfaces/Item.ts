export enum TYPE {
  EXPENSE = "income",
  INCOME = "expense",
}
  
export interface ItemInterface {
  user_uuid: string,
  type: TYPE,
  category: string,
  amount: number,
  date: string,
  note?: string | null,
  createdAt?: string | null
}