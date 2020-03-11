import * as moment from "moment";
export interface Day_Type {
  date: string | null;
  type: string | null;
}

export type Week_Type = Day_Type[];

export interface Month_Type {
  year: number;
  month: number;
  id: string;
}

export function getMonths(pastYearRange: number, futureYearRange: number) {
  const currentYear = moment().year();
  const startYear = currentYear - pastYearRange;
  const endYear = currentYear + futureYearRange;

  const months: any = [];
  for (let i = 0; i < endYear - startYear; i++) {
    const year = startYear + i;
    for (let i = 0; i < 12; i++) {
      months.push({
        id: moment(new Date(`${year}-${i + 1}`)).format("YYYY-MM"),
        year,
        month: i + 1
      });
    }
  }
  return months;
}

export function getWeeks(
  month: string,
  startDate: string | null,
  endDate: string | null
) {
  const currentMonth = moment(month).month();
  const currentDate = moment(month).startOf("month");
  let week: any = [];
  let weeks: any = [];
  let dayObj: any = {};

  do {
    week = [];
    for (let i = 0; i < 7; i++) {
      dayObj = {
        type: null,
        date: null
      };
      const currentDateString = currentDate.format("YYYY-MM-DD");
      if (i == currentDate.days() && currentDate.month() == currentMonth) {
        if (startDate && startDate === currentDateString) {
          if (!endDate) {
            dayObj.type = "single";
          } else {
            dayObj.type = "start";
          }
        }

        if (endDate && endDate == currentDateString) {
          if (startDate === endDate) {
            dayObj.type = "single";
          } else {
            dayObj.type = "end";
          }
        }
        if (
          startDate &&
          startDate < currentDateString &&
          endDate &&
          endDate > currentDateString
        ) {
          dayObj.type = "between";
        }

        dayObj.date = currentDate.clone().format("YYYY-MM-DD");
        week.push(dayObj);
        currentDate.add(1, "day");
      } else {
        if (
          startDate &&
          endDate &&
          startDate < startDate &&
          endDate >= startDate
        ) {
          dayObj.type = "between";
        }

        week.push(dayObj);
      }
    }

    weeks.push(week);
  } while (currentDate.month() == currentMonth);

  return weeks;
}