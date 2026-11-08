import { useState } from 'react';
import { DayPicker } from '@daypicker/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './styles/ServiceSlotDatePicker.module.css';

interface ServiceSlotDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  markedDates?: string[];
  minDate?: string;
}

function parseLocalDate(value: string) {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function formatLocalDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

export default function ServiceSlotDatePicker({
  value,
  onChange,
  markedDates = [],
  minDate,
}: ServiceSlotDatePickerProps) {
  const selected = parseLocalDate(value);
  const minimum = minDate ? parseLocalDate(minDate) : undefined;
  const [month, setMonth] = useState(() => selected ?? minimum ?? new Date());
  const canGoBack = !minimum
    || new Date(month.getFullYear(), month.getMonth())
      > new Date(minimum.getFullYear(), minimum.getMonth());

  const changeMonth = (offset: number) => {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  };

  return (
    <div className={styles.picker}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navigation}
          aria-label="Предыдущий месяц"
          disabled={!canGoBack}
          onClick={() => changeMonth(-1)}
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <span className={styles.monthLabel} aria-live="polite">
          {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          className={styles.navigation}
          aria-label="Следующий месяц"
          onClick={() => changeMonth(1)}
        >
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <DayPicker
        mode="single"
        required
        selected={selected}
        onSelect={(date) => onChange(formatLocalDate(date))}
        month={month}
        onMonthChange={setMonth}
        startMonth={minimum}
        disabled={minimum ? { before: minimum } : undefined}
        weekStartsOn={1}
        hideNavigation
        showOutsideDays={false}
        aria-label="Выберите дату слота"
        modifiers={{ hasSlots: (date) => markedDates.includes(formatLocalDate(date)) }}
        modifiersClassNames={{ hasSlots: styles.hasSlots }}
        formatters={{
          formatWeekdayName: (date) => date.toLocaleDateString('en-US', { weekday: 'short' }),
        }}
        classNames={{
          root: styles.calendar,
          months: styles.months,
          month: styles.month,
          month_caption: styles.caption,
          month_grid: styles.grid,
          weekday: styles.weekday,
          day: styles.day,
          day_button: styles.dayButton,
          selected: styles.selected,
          today: styles.today,
          disabled: styles.disabled,
          hidden: styles.hidden,
        }}
      />
    </div>
  );
}
