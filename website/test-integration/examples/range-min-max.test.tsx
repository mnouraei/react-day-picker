import React from 'react';

import { render } from '@testing-library/react';

import { clickDay } from 'react-day-picker/test/actions';
import { getAllEnabledDays, getDayButton } from 'react-day-picker/test/po';
import { freezeBeforeAll } from 'react-day-picker/test/utils';

import Example from '@examples/range-min-max';

const today = new Date(2021, 10, 15);

freezeBeforeAll(today);
beforeEach(() => {
  render(<Example />);
});

describe('when the first day is clicked', () => {
  const fromDay = new Date(2021, 10, 15);
  beforeEach(() => clickDay(fromDay));
  test('should disable before the allowed range', () => {
    expect(getAllEnabledDays()[0]).toHaveTextContent('11st November (Monday)');
  });
  test('should disable after the allowed range', () => {
    const enabledDays = getAllEnabledDays();
    expect(enabledDays[enabledDays.length - 1]).toHaveTextContent(
      '30th November (Tuesday)'
    );
  });
  describe('when clicking a day after the from date', () => {
    const toDay = new Date(2021, 10, 17);
    const expectedSelectedDays = [
      new Date(2021, 10, 15),
      new Date(2021, 10, 16),
      new Date(2021, 10, 17)
    ];
    beforeEach(() => clickDay(toDay));
    test.each(expectedSelectedDays)('%s should be selected', (day) => {
      expect(getDayButton(day)).toHaveAttribute('aria-pressed', 'true');
    });
    test('should enable the days up to the clicked day', () => {
      const enabledDays = getAllEnabledDays();
      expect(enabledDays[enabledDays.length - 1]).toHaveTextContent('19th');
    });
  });
  describe('when clicking a day before the from date', () => {
    const toDay = new Date(2021, 10, 11);
    const expectedSelectedDays = [
      new Date(2021, 10, 11),
      new Date(2021, 10, 12),
      new Date(2021, 10, 13),
      new Date(2021, 10, 14),
      new Date(2021, 10, 15)
    ];
    beforeEach(() => clickDay(toDay));
    test.each(expectedSelectedDays)('%s should be selected', (day) => {
      expect(getDayButton(day)).toHaveAttribute('aria-pressed', 'true');
    });
  });
});
