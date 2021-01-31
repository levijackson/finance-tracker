import { formatCurrency } from '../../../utils/currency';

test('no decimals adds .00', () => {
    expect(formatCurrency(12)).toBe(12.00);
});

test('one decimal adds a second - .1 becomes .10', () => {
    expect(formatCurrency(12.1)).toBe(12.10);
});

test('already a decimal changes nothing', () => {
    expect(formatCurrency(12.12)).toBe(12.12);
});