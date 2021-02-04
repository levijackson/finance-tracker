export interface ItemInterface {
    id?: string;
    date: string | Date;
    amount: number;
    type: string;
    note?: string;
    category: string;
}