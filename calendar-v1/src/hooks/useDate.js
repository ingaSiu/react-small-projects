/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';

export const useDate = (events, nav) => {
  const [days, setDays] = useState([]);
  const [dateDisplay, setDateDisplay] = useState('');

  const eventForDate = (date) => {
    return events.find((e) => e.date === date);
  };
  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();

    if (nav !== 0) {
      date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    setDateDisplay(`${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`);

    const daysArr = [];

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i > paddingDays) {
        daysArr.push({
          value: i - paddingDays,
          event: eventForDate(dayString),
          isCurrentDay: i - paddingDays === day && nav === 0,
          date: dayString,
        });
      } else {
        daysArr.push({
          value: 'padding',
          event: null,
          isCurrentDay: false,
          date: '',
        });
      }
    }

    setDays(daysArr);
  }, [events, nav]);

  return {
    days,
    dateDisplay,
  };
};
