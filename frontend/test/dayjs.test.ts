import { describe, expect, it } from 'vitest'
import { dateSummary, dayjs } from '../src/helpers/dayjs'

describe('dateSummary', () => {
  const dates = [
    {
      date: dayjs().toLocaleString(),
      expected: 'Today'
    },
    {
      date: dayjs().subtract(1, 'day').toLocaleString(),
      expected: 'Yesterday'
    },
    {
      date: dayjs().startOf('week').add(2, 'day').toLocaleString(),
      expected: 'This week'
    },
    {
      date: dayjs().subtract(1, 'week').toLocaleString(),
      expected: 'Last week'
    },
    {
      date: dayjs().startOf('month').add(5, 'day').toLocaleString(),
      expected: 'This month'
    },
    {
      date: dayjs().subtract(1, 'month').toLocaleString(),
      expected: 'Last month'
    },
    {
      date: '1989-08-15 00:00:00',
      expected: 'August 1989'
    },
    {
      date: '2016-09-18',
      expected: 'September 2016'
    },
  ]

  for (const date of dates) {
    it('should print ' + date.expected, function () {
      console.log(date.date, 'is', dateSummary(date.date))
      expect(dateSummary(date.date)).eq(date.expected)
    })
  }

})
