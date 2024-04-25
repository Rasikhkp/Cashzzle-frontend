import { startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns'

export const getWeekDates = (date: Date): Date[] => {
    const startDate = startOfWeek(date, { weekStartsOn: 0 });
    const endDate = endOfWeek(date, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: startDate, end: endDate })
}

export const getMonthDates = (today: Date): Date[] => {
    const startDate = startOfMonth(today);
    const endDate = endOfMonth(today);

    return eachDayOfInterval({ start: startDate, end: endDate })
}

