import { toJson, getPrimaryKey, getSortKey, getItemUuid, sumItemsByDay } from '../../../helpers/item';

describe('toJson tests', () => {
    test('An object can be turned into json without an existing item_uuid', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const jsonItem = toJson(item);
        expect(jsonItem.amount).toBeDefined();
        expect(jsonItem.note).toBeDefined();
        expect(jsonItem.category).toBeDefined();
        expect(jsonItem.type).toBeDefined();
        expect(jsonItem.date).toBeDefined();
        expect(jsonItem.item_uuid).toBeDefined();
    });

    test('An object can be turned into json with an existing item_uuid, and it stays the same', () => {
        const item = {
            item_uuid: '23532024-914c-5674-b76b-00337d851b63',
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const jsonItem = toJson(item);
        expect(jsonItem.amount).toBeDefined();
        expect(jsonItem.note).toBeDefined();
        expect(jsonItem.category).toBeDefined();
        expect(jsonItem.type).toBeDefined();
        expect(jsonItem.date).toBeDefined();
        expect(jsonItem.item_uuid).toBe(item.item_uuid);
    });
    
    test('Handles undefined notes', () => {
        const item = {
            amount: 12,
            note: undefined,
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
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

describe('getPrimaryKey tests', () => {
    test('Has all the data - succeeds', () => {
        const item = {
            user_uuid: '00337d851b63-914c-5674-b76b-23532024',
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const primaryKey = getPrimaryKey(item);
        expect(primaryKey).toBeDefined();
    });

    test('Is missing user_uuid - fails', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const primaryKey = getPrimaryKey(item);
        expect(primaryKey).not.toBeDefined();
    });
});

describe('getSortKey tests', () => {
    test('Has all the data - succeeds', () => {
        const item = {
            user_uuid: '00337d851b63-914c-5674-b76b-23532024',
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const sortKey = getSortKey(item);
        expect(sortKey).toBeDefined();
    });

    test('Is missing type - fails', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const sortKey = getSortKey(item);
        expect(sortKey).not.toBeDefined();
    });

    test('Is missing date - fails', () => {
        const item = {
            amount: 12,
            note: 'some note',
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const sortKey = getSortKey(item);
        expect(sortKey).not.toBeDefined();
    });

    test('Is missing category - fails', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const sortKey = getSortKey(item);
        expect(sortKey).not.toBeDefined();
    });

    test('Is missing createdAt - fails', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
        };
    
        const sortKey = getSortKey(item);
        expect(sortKey).not.toBeDefined();
    });
});

describe('getItemUuid tests', () => {
    test('Has all the data - succeeds', () => {
        const item = {
            user_uuid: '00337d851b63-914c-5674-b76b-23532024',
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            type: 'income',
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const itemUuid = getItemUuid(item);
        expect(itemUuid).toBeDefined();
    });

    test('Is missing type - fails', () => {
        const item = {
            amount: 12,
            note: 'some note',
            date: new Date('2021-01-03T00:00:00.000Z'),
            category: 'Transportation',
            createdAt: new Date('2021-01-03T00:00:00.000Z')
        };
    
        const itemUuid = getItemUuid(item);
        expect(itemUuid).not.toBeDefined();
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