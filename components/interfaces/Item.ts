export interface ItemInterface {
    _id?: string;
    date: string | Date;
    amount: number;
    type: string;
    note?: string;
    category: string;
}