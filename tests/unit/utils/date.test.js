import { formatDate } from '../../../utils/date';

test('dateFormat works', () => {
    const date = new Date('2021-01-01T05:00:00.000+00:00');
    expect(formatDate(date)).toBe('2021-01-01');
});