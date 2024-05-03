import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  addDays,
  isSameMonth,
} from "date-fns";

export const getWeekDates = (date: Date): Date[] => {
  const startDate = startOfWeek(date, { weekStartsOn: 0 });
  const endDate = endOfWeek(date, { weekStartsOn: 0 });

  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const getMonthDates = (today: Date): Date[] => {
  const startDate = startOfMonth(today);
  const endDate = endOfMonth(today);

  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const getWeekMonthRange = (weekDates: Date[]) => {
  const startOfWeekDate = startOfWeek(weekDates[0]);
  const endOfWeekDate = endOfWeek(weekDates[6]);

  let currentDate = startOfWeekDate;
  let currentMonth = format(currentDate, "MMMM");
  let nextMonth = null;

  while (!isSameMonth(currentDate, endOfWeekDate)) {
    currentDate = addDays(currentDate, 1);
    nextMonth = format(currentDate, "MMMM");
  }

  if (nextMonth && nextMonth !== currentMonth) {
    return `${currentMonth}/${nextMonth}`;
  } else {
    return currentMonth;
  }
};
