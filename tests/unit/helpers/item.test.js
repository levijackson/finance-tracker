import { toJson } from '../../../helpers/item';

test('toJson works', () => {
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

test('toJson handles undefined notes', () => {
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