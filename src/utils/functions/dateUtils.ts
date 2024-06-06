import { format } from "path";
import { Timeslot } from "../../types/TimeSlot";

export const formatDate = (inputDate: string) => {
  return new Date(Date.parse(inputDate)).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

export function getAllWeeks(year: number): Array<{
  weekNumber: number;
  startDate: string;
  endDate: string;
  year: number;
}> {
  const weeks = [];
  let currentDate = new Date(year, 0, 1);

  // Adjust to the first Monday of the year
  while (currentDate.getDay() !== 1) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  let weekNumber = getISOWeekNumber(currentDate);

  while (
    currentDate.getFullYear() === year ||
    (currentDate.getFullYear() === year + 1 &&
      getISOWeekNumber(currentDate) === 1)
  ) {
    const startOfWeek = new Date(currentDate);
    const endOfWeek = new Date(currentDate);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    // Adjust endOfWeek if it crosses into the next year
    if (endOfWeek.getFullYear() !== year) {
      endOfWeek.setDate(31);
      endOfWeek.setMonth(11); // December is month 11 (0-indexed)
    }

    weeks.push({
      weekNumber,
      startDate: formatDateddMM(startOfWeek),
      endDate: formatDateddMM(endOfWeek),
      year: year,
    });

    // Move to the start of the next week
    currentDate.setDate(currentDate.getDate() + 7);
    weekNumber = getISOWeekNumber(currentDate);
  }

  return weeks.slice(0, weeks.length - 1);
}

function getISOWeekNumber(date: Date): number {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const firstThursday = tempDate.getTime();
  tempDate.setMonth(0, 1);
  if (tempDate.getDay() !== 4) {
    tempDate.setMonth(0, 1 + ((4 - tempDate.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - tempDate.getTime()) / 604800000);
}

function formatDateddMM(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}/${month}`;
}

function formatDateMMddYYYY(date: Date): string {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function getDayName(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

export function getDaysInWeek(
  weekNumber: number,
  year: number,
  format: string
) {
  const firstDayOfYear = new Date(year, 0, 1); // Ngày đầu tiên của năm
  const dayOffset =
    firstDayOfYear.getDay() === 0 ? -6 : 1 - firstDayOfYear.getDay(); // Điều chỉnh nếu ngày đầu năm là Chủ Nhật
  const firstWeekDate = new Date(
    firstDayOfYear.setDate(firstDayOfYear.getDate() + dayOffset)
  ); // Ngày đầu tiên của tuần đầu tiên
  const firstDayOfWeek = new Date(
    firstWeekDate.setDate(firstWeekDate.getDate() + (weekNumber - 1) * 7)
  ); // Ngày đầu tiên của tuần được chọn

  const daysInWeek = [];

  // Lặp qua từng ngày trong tuần và thêm vào mảng
  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(firstDayOfWeek);
    nextDay.setDate(firstDayOfWeek.getDate() + i);
    daysInWeek.push({
      day: getDayName(nextDay),

      date:
        format === "ddMM"
          ? formatDateddMM(nextDay)
          : formatDateMMddYYYY(nextDay),
    });
  }

  return daysInWeek;
}

export function getCurrentYear(): number {
  const currentDate = new Date();
  return currentDate.getFullYear();
}

export function getCurrentWeek(): number {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const pastDaysOfYear =
    (currentDate.valueOf() - firstDayOfYear.valueOf()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

export function getCurrentWeekday(
  formatdate: string
): Array<{ day: string; date: string }> {
  return getDaysInWeek(getCurrentWeek(), getCurrentYear(), formatdate);
}

export const yearArr: number[] = [2021, 2022, 2023, 2024];
