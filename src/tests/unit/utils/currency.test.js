import { formatNumberToFloat, formatCurrency } from '../../../utils/currency';

describe('formatNumberToFloat', () => {
  test('no decimals adds .00', () => {
    expect(formatNumberToFloat(12)).toBe(12.00);
  });
  
  test('one decimal adds a second - .1 becomes .10', () => {
    expect(formatNumberToFloat(12.1)).toBe(12.10);
  });
  
  test('already a decimal changes nothing', () => {
    expect(formatNumberToFloat(12.12)).toBe(12.12);
  });
});

describe('formatCurrency', () => {
  test('no decimals adds .00', () => {
    expect(formatCurrency(12, 'USD')).toBe('$12.00');
  });
  
  test('one decimal adds a second - .1 becomes .10', () => {
    expect(formatCurrency(12.1, 'USD')).toBe('$12.10');
  });
  
  test('already a decimal changes nothing', () => {
    expect(formatCurrency(12.12, 'USD')).toBe('$12.12');
  });

  test('commas added', () => {
    expect(formatCurrency(12123, 'USD')).toBe('$12,123.00');
  });
});