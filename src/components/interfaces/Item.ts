import TYPE from 'API';

// Used to validate core Item properties
// API.ts defines the interface for an Item in DynamoDB
export interface ItemInterface {
  user_uuid: string,
  type: TYPE,
  category: string,
  amount: number,
  date: string,
  note?: string | null,
  createdAt?: string | null
}