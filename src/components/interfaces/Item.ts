export interface ItemInterface {
    id?: number;
    date: Date;
    amount: number;
    type: string;
    note?: string;
    category: string;
}