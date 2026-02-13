'use client';

import { useLocale } from 'next-intl';
import schoolHolidays from '@/data/school-holidays.json';

type HolidayType = 'holiday' | 'public' | 'school';

interface DayInfo {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  holidayType?: HolidayType;
  holidayName?: string;
}

const MONTHS_EN = [
  'September', 'October', 'November', 'December',
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August'
];

const MONTHS_NL = [
  'September', 'Oktober', 'November', 'December',
  'Januari', 'Februari', 'Maart', 'April',
  'Mei', 'Juni', 'Juli', 'Augustus'
];

const DAYS_EN = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const DAYS_NL = ['M', 'D', 'W', 'D', 'V', 'Z', 'Z'];

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function isDateInRange(date: Date, start: Date, end: Date): boolean {
  const d = date.getTime();
  return d >= start.getTime() && d <= end.getTime();
}

function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

function getHolidayInfo(date: Date, locale: string): { type: HolidayType; name: string } | null {
  // Check multi-day holidays
  for (const holiday of schoolHolidays.holidays) {
    const start = parseDate(holiday.start);
    const end = parseDate(holiday.end);
    if (isDateInRange(date, start, end)) {
      return {
        type: holiday.type as HolidayType,
        name: locale === 'nl' ? holiday.nameNl : holiday.name
      };
    }
  }

  // Check single-day special days
  for (const special of schoolHolidays.specialDays) {
    const specialDate = parseDate(special.date);
    if (isSameDay(date, specialDate)) {
      return {
        type: special.type as HolidayType,
        name: locale === 'nl' ? special.nameNl : special.name
      };
    }
  }

  return null;
}

function getMonthDays(year: number, month: number, locale: string): DayInfo[] {
  const days: DayInfo[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  // Convert to Monday-based (0 = Monday, 6 = Sunday)
  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;

  // Add empty days for the start of the month
  for (let i = 0; i < startDayOfWeek; i++) {
    const prevDate = new Date(year, month, -startDayOfWeek + i + 1);
    days.push({
      date: prevDate,
      dayOfMonth: prevDate.getDate(),
      isCurrentMonth: false,
      isWeekend: false
    });
  }

  // Add days of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const holidayInfo = getHolidayInfo(date, locale);

    days.push({
      date,
      dayOfMonth: day,
      isCurrentMonth: true,
      isWeekend,
      holidayType: holidayInfo?.type,
      holidayName: holidayInfo?.name
    });
  }

  return days;
}

function MonthCalendar({ year, month, monthName, locale }: {
  year: number;
  month: number;
  monthName: string;
  locale: string;
}) {
  const days = getMonthDays(year, month, locale);
  const dayLabels = locale === 'nl' ? DAYS_NL : DAYS_EN;

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-border">
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 text-center">
        {monthName} {year}
      </h3>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {dayLabels.map((day, i) => (
          <div
            key={i}
            className={`text-[10px] sm:text-xs font-medium text-center py-1 ${
              i >= 5 ? 'text-muted-light' : 'text-muted'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, i) => {
          if (!day.isCurrentMonth) {
            return <div key={i} className="aspect-square" />;
          }

          let bgClass = '';
          let textClass = 'text-foreground';

          if (day.holidayType === 'holiday') {
            bgClass = 'bg-primary text-white';
            textClass = 'text-white';
          } else if (day.holidayType === 'public') {
            bgClass = 'bg-secondary';
            textClass = 'text-primary';
          } else if (day.isWeekend) {
            textClass = 'text-muted-light';
          }

          return (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center text-[10px] sm:text-xs rounded-sm ${bgClass} ${textClass} ${
                day.holidayName ? 'cursor-help' : ''
              }`}
              title={day.holidayName}
            >
              {day.dayOfMonth}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function YearCalendar() {
  const locale = useLocale();
  const months = locale === 'nl' ? MONTHS_NL : MONTHS_EN;

  // School year months: September 2024 to August 2025
  const schoolYearMonths = [
    { year: 2024, month: 8 },  // September
    { year: 2024, month: 9 },  // October
    { year: 2024, month: 10 }, // November
    { year: 2024, month: 11 }, // December
    { year: 2025, month: 0 },  // January
    { year: 2025, month: 1 },  // February
    { year: 2025, month: 2 },  // March
    { year: 2025, month: 3 },  // April
    { year: 2025, month: 4 },  // May
    { year: 2025, month: 5 },  // June
    { year: 2025, month: 6 },  // July
    { year: 2025, month: 7 },  // August
  ];

  return (
    <div>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-primary" />
          <span className="text-sm text-muted">
            {locale === 'nl' ? 'Schoolvakantie' : 'School Holiday'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-secondary" />
          <span className="text-sm text-muted">
            {locale === 'nl' ? 'Feestdag' : 'Public Holiday'}
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {schoolYearMonths.map(({ year, month }, i) => (
          <MonthCalendar
            key={`${year}-${month}`}
            year={year}
            month={month}
            monthName={months[i]}
            locale={locale}
          />
        ))}
      </div>

      {/* School year info */}
      <p className="text-center text-sm text-muted mt-6">
        {locale === 'nl'
          ? `Schooljaar ${schoolHolidays.schoolYear}`
          : `School Year ${schoolHolidays.schoolYear}`}
      </p>
    </div>
  );
}
