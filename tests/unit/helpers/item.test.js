import { toJson, sumItemsByDay } from '../../../helpers/item';

describe('toJson tests', () => {
    test('An object can be turned into json', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation'
        };
    
        const jsonItem = toJson(item);
        expect(jsonItem.amount).toBeDefined();
        expect(jsonItem.note).toBeDefined();
        expect(jsonItem.category).toBeDefined();
        expect(jsonItem.type).toBeDefined();
        expect(jsonItem.date).toBeDefined();
    });
    
    test('Handles undefined notes', () => {
        const item = {
            amount: 12,
            note: undefined,
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation'
        };
    
        const jsonItem = toJson(item);
    
        expect(jsonItem.amount).toBeDefined();
        expect(jsonItem.note).toBeDefined();
        expect(jsonItem.category).toBeDefined();
        expect(jsonItem.type).toBeDefined();
        expect(jsonItem.date).toBeDefined();
        expect(jsonItem.note).toBe('');
    });
});


describe('sumItemsByDay tests', () => {
    test('Amounts on the same day are added together', () => {
        const items = [
            {
                date: new Date('2021-01-02'),
                amount: 100,
                type: 'income'
            },
            {
                date: new Date('2021-01-02'),
                amount: 200,
                type: 'income'
            }
        ];

        const data = sumItemsByDay(items);
        expect(data.length).toBe(1);
        expect(data[0].income).toBe(300);
    });

    test('The previous days amounts are added to this day', () => {
        const items = [
            {
                date: new Date('2021-01-02'),
                amount: 100,
                type: 'income'
            },
            {
                date: new Date('2021-01-02'),
                amount: 200,
                type: 'income'
            },
            {
                date: new Date('2021-01-05'),
                amount: 300,
                type: 'income'
            }
        ];

        const data = sumItemsByDay(items);
        expect(data.length).toBe(2);
        expect(data[0].income).toBe(300);
        expect(data[1].income).toBe(600);
    });

    test('Income and expenses at the same time!', () => {
        const items = [
            {
                date: new Date('2021-01-02'),
                amount: 100,
                type: 'income'
            },
            {
                date: new Date('2021-01-02'),
                amount: 200,
                type: 'income'
            },
            {
                date: new Date('2021-01-05'),
                amount: 300,
                type: 'income'
            },
            {
                date: new Date('2021-01-04'),
                amount: 100,
                type: 'expense'
            },
            {
                date: new Date('2021-01-04'),
                amount: 200,
                type: 'expense'
            },
            {
                date: new Date('2021-01-05'),
                amount: 300,
                type: 'expense'
            }
        ];

        const data = sumItemsByDay(items);

        expect(data.length).toBe(3);
        expect(data[0].income).toBe(300);
        expect(data[0].expenses).toBe(0);

        expect(data[1].income).toBe(300);
        expect(data[1].expenses).toBe(300)

        expect(data[2].income).toBe(600);
        expect(data[2].expenses).toBe(600)
    });
});