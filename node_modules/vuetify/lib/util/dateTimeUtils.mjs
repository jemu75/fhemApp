// Utilities
import { createRange, padStart } from "./index.mjs";
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1);
}
export function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0);
}
function getNumberOfDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}
export function changeMonth(year, month, change) {
  if (change < 0 && month + change < 1) {
    return [year - 1, 12 + (month + change)];
  } else if (change > 0 && month + change > 12) {
    return [year + 1, (month + change) % 12];
  } else {
    return [year, month + change];
  }
}
export function getDate(year, month, day) {
  return `${year}-${padStart(String(month), 2, '0')}-${padStart(String(day), 2, '0')}`;
}
export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return getDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
}
export function parseDate(date) {
  const [year, month, day] = date.split('-').map(Number);
  return [year, month, day];
}
function getMondayOfFirstWeekOfYear(year) {
  const januaryFirst = new Date(year, 0, 1);
  const mondayOfFirstWeek = new Date(januaryFirst);
  mondayOfFirstWeek.setDate(mondayOfFirstWeek.getDate() + (11 - januaryFirst.getDay()) % 7 - 3);
  return mondayOfFirstWeek;
}

// https://stackoverflow.com/questions/274861/how-do-i-calculate-the-week-number-given-a-date/275024#275024
export function getWeek(date) {
  let year = date.getFullYear();
  let d1w1 = getMondayOfFirstWeekOfYear(year);
  if (date < d1w1) {
    year = year - 1;
    d1w1 = getMondayOfFirstWeekOfYear(year);
  } else {
    const tv = getMondayOfFirstWeekOfYear(year + 1);
    if (date >= tv) {
      year = year + 1;
      d1w1 = tv;
    }
  }
  const diffTime = Math.abs(date.getTime() - d1w1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7) + 1;
}
export function getDaysInMonth(year, month) {
  return createRange(getNumberOfDaysInMonth(year, month), 1).map(day => ({
    year,
    month,
    day,
    date: getDate(year, month, day)
  }));
}

// old

function createUTCDate(year) {
  let month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  let date;
  if (year < 100 && year >= 0) {
    date = new Date(Date.UTC(year, month, day));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(year);
    }
  } else {
    date = new Date(Date.UTC(year, month, day));
  }
  return date;
}
function firstWeekOffset(year, firstDayOfWeek, firstDayOfYear) {
  const firstWeekDayInFirstWeek = 7 + firstDayOfWeek - firstDayOfYear;
  const firstWeekDayOfYear = (7 + createUTCDate(year, 0, firstWeekDayInFirstWeek).getUTCDay() - firstDayOfWeek) % 7;
  return -firstWeekDayOfYear + firstWeekDayInFirstWeek - 1;
}
function dayOfYear(year, month, day, firstDayOfWeek) {
  let dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][month];
  if (month > 1 && isLeapYear(year)) {
    dayOfYear++;
  }
  return dayOfYear + day;
}
function weeksInYear(year, firstDayOfWeek, firstDayOfYear) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, firstDayOfYear);
  const weekOffsetNext = firstWeekOffset(year + 1, firstDayOfWeek, firstDayOfYear);
  const daysInYear = isLeapYear(year) ? 366 : 365;
  return (daysInYear - weekOffset + weekOffsetNext) / 7;
}
export function weekNumber(year, month, day, firstDayOfWeek, localeFirstDayOfYear) {
  const weekOffset = firstWeekOffset(year, firstDayOfWeek, localeFirstDayOfYear);
  const week = Math.ceil((dayOfYear(year, month, day, firstDayOfWeek) - weekOffset) / 7);
  if (week < 1) {
    return week + weeksInYear(year - 1, firstDayOfWeek, localeFirstDayOfYear);
  } else if (week > weeksInYear(year, firstDayOfWeek, localeFirstDayOfYear)) {
    return week - weeksInYear(year, firstDayOfWeek, localeFirstDayOfYear);
  } else {
    return week;
  }
}
export function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
//# sourceMappingURL=dateTimeUtils.mjs.map