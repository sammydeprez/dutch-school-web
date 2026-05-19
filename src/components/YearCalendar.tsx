'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import schoolHolidays from '@/data/school-holidays.json';

type HolidayType = 'holiday' | 'public' | 'school';

interface Holiday {
  name: string;
  nameNl: string;
  start: string;
  end: string;
  type: string;
}

interface SpecialDay {
  name: string;
  nameNl: string;
  date: string;
  type: string;
}

interface SchoolYearData {
  schoolYear: string;
  endDate: string;
  holidays: Holiday[];
  specialDays: SpecialDay[];
}

interface DayInfo {
  date: Date;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  holidayType?: HolidayType;
  holidayName?: string;
}

const MONTHS_EN = [
  'August', 'September', 'October', 'November', 'December',
  'January', 'February', 'March', 'April',
  'May', 'June', 'July'
];

const MONTHS_NL = [
  'Augustus', 'September', 'Oktober', 'November', 'December',
  'Januari', 'Februari', 'Maart', 'April',
  'Mei', 'Juni', 'Juli'
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

function selectSchoolYear(today: Date): SchoolYearData | null {
  const sorted = [...schoolHolidays.schoolYears].sort(
    (a, b) => parseDate(a.endDate).getTime() - parseDate(b.endDate).getTime()
  );
  for (const year of sorted) {
    if (today.getTime() <= parseDate(year.endDate).getTime()) {
      return year;
    }
  }
  return null;
}

function getSchoolYearMonths(schoolYear: string): { year: number; month: number }[] {
  const startYear = Number(schoolYear.split('-')[0]);
  const endYear = startYear + 1;
  return [
    { year: startYear, month: 7 },   // August
    { year: startYear, month: 8 },   // September
    { year: startYear, month: 9 },   // October
    { year: startYear, month: 10 },  // November
    { year: startYear, month: 11 },  // December
    { year: endYear, month: 0 },     // January
    { year: endYear, month: 1 },     // February
    { year: endYear, month: 2 },     // March
    { year: endYear, month: 3 },     // April
    { year: endYear, month: 4 },     // May
    { year: endYear, month: 5 },     // June
    { year: endYear, month: 6 },     // July
  ];
}

function getHolidayInfo(
  date: Date,
  locale: string,
  data: SchoolYearData
): { type: HolidayType; name: string } | null {
  for (const holiday of data.holidays) {
    const start = parseDate(holiday.start);
    const end = parseDate(holiday.end);
    if (isDateInRange(date, start, end)) {
      return {
        type: holiday.type as HolidayType,
        name: locale === 'nl' ? holiday.nameNl : holiday.name
      };
    }
  }

  for (const special of data.specialDays) {
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

function getMonthDays(
  year: number,
  month: number,
  locale: string,
  data: SchoolYearData
): DayInfo[] {
  const days: DayInfo[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startDayOfWeek = firstDay.getDay() - 1;
  if (startDayOfWeek < 0) startDayOfWeek = 6;

  for (let i = 0; i < startDayOfWeek; i++) {
    const prevDate = new Date(year, month, -startDayOfWeek + i + 1);
    days.push({
      date: prevDate,
      dayOfMonth: prevDate.getDate(),
      isCurrentMonth: false,
      isWeekend: false
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const holidayInfo = getHolidayInfo(date, locale, data);

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

function MonthCalendar({ year, month, monthName, locale, data }: {
  year: number;
  month: number;
  monthName: string;
  locale: string;
  data: SchoolYearData;
}) {
  const days = getMonthDays(year, month, locale, data);
  const dayLabels = locale === 'nl' ? DAYS_NL : DAYS_EN;

  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-border">
      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-2 text-center">
        {monthName} {year}
      </h3>

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
  const t = useTranslations('schedulePage.calendar');
  const months = locale === 'nl' ? MONTHS_NL : MONTHS_EN;

  const sortedYears = [...schoolHolidays.schoolYears].sort(
    (a, b) => parseDate(a.endDate).getTime() - parseDate(b.endDate).getTime()
  );
  const defaultYear = selectSchoolYear(new Date()) ?? sortedYears[sortedYears.length - 1] ?? null;
  const [selectedKey, setSelectedKey] = useState<string>(defaultYear?.schoolYear ?? '');
  const selected = sortedYears.find((y) => y.schoolYear === selectedKey) ?? null;

  if (!selected) {
    return (
      <div className="bg-surface rounded-2xl py-12 px-6 text-center">
        <p className="text-muted text-base sm:text-lg">
          {t('notAvailable')}
        </p>
      </div>
    );
  }

  const schoolYearMonths = getSchoolYearMonths(selected.schoolYear);

  return (
    <div>
      {sortedYears.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {sortedYears.map((y) => {
            const isActive = y.schoolYear === selectedKey;
            return (
              <button
                key={y.schoolYear}
                type="button"
                onClick={() => setSelectedKey(y.schoolYear)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-surface text-foreground hover:bg-border'
                }`}
              >
                {locale === 'nl' ? `Schooljaar ${y.schoolYear}` : `School Year ${y.schoolYear}`}
              </button>
            );
          })}
        </div>
      )}

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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {schoolYearMonths.map(({ year, month }, i) => (
          <MonthCalendar
            key={`${year}-${month}`}
            year={year}
            month={month}
            monthName={months[i]}
            locale={locale}
            data={selected}
          />
        ))}
      </div>
    </div>
  );
}
