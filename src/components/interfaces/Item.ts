// Used to validate core Item properties
// API.ts defines the interface for an Item in DynamoDB
export interface ItemInterface {
  user_uuid?: string,
  item_uuid?: string,
  type: string,
  category: string,
  amount: number,
  date: string,
  note?: string | null,
  createdAt?: string | null
}