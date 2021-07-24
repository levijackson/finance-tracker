import { formatDate, getMonthName, getYearMonth } from 'src/utils/date';

test('dateFormat works', () => {
  const date = new Date('2021-01-01T05:00:00.000+00:00');
  expect(formatDate(date)).toBe('2021-01-01');
});

test('month name works', () => {
  const date = new Date('2021-01-01T05:00:00.000+00:00');
  expect(formatDate(date)).toBe('2021-01-01');
});

test.each([
  ['0', 'January'],
  ['1', 'February'],
  ['2', 'March'],
  ['3', 'April'],
  ['4', 'May'],
  ['5', 'June'],
  ['6', 'July'],
  ['7', 'August'],
  ['8', 'September'],
  ['9', 'October'],
  ['10', 'November'],
  ['11', 'December']
])('getMonthName(%i)', (monthName, expected) => {
  expect(getMonthName(monthName)).toBe(expected);
});

test('get current year month', () => {
  const yearMonth = getYearMonth();
  expect(yearMonth).toContain('-');
  expect(yearMonth.length).toBe(7);
});
