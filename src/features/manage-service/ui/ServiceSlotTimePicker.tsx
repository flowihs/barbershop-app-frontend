import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import styles from './styles/ServiceSlotTimePicker.module.css';

interface ServiceSlotTimePickerProps {
  value: string;
  onConfirm: (value: string) => void;
}

const HOURS = Array.from({ length: 24 }, (_, hour) => String(hour).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, mins) => String(mins).padStart(2, '0'));

export default function ServiceSlotTimePicker({ value, onConfirm }: ServiceSlotTimePickerProps) {
  
  const initialTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(value) ? value : '00:00';
  
  const [hour, setHour] = useState(() => initialTime.slice(0, 2));
  const [minute, setMinute] = useState(() => initialTime.slice(3, 5));

  const hourColumnRef = useRef<HTMLDivElement>(null);
  const minuteColumnRef = useRef<HTMLDivElement>(null);

  const minutes = MINUTES.includes(initialTime.slice(3, 5)) ? MINUTES : [...MINUTES, initialTime.slice(3, 5)].sort();

  useEffect(() => {
    for (const column of [hourColumnRef.current, minuteColumnRef.current]) {
      const selected = column?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (column && selected) {
        column.scrollTop = selected.offsetTop - (column.clientHeight - selected.clientHeight) / 2;
      }
    }
  }, []);

  const selectedTime = `${hour}:${minute}`;

  return (
    <div className={styles.picker}>
      <div className={styles.columns}>
        <div className={styles.columnWrapper}>
          <span className={styles.label}>Часы</span>
          <div ref={hourColumnRef} className={styles.column} role="group" aria-label="Часы">
            {HOURS.map((option) => (
              <button
                key={option}
                type="button"
                className={styles.option}
                aria-label={`Часы: ${option}`}
                aria-pressed={hour === option}
                onClick={() => setHour(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.columnWrapper}>
          <span className={styles.label}>Минуты</span>
          <div ref={minuteColumnRef} className={styles.column} role="group" aria-label="Минуты">
            {minutes.map((option) => (
              <button
                key={option}
                type="button"
                className={styles.option}
                aria-label={`Минуты: ${option}`}
                aria-pressed={minute === option}
                onClick={() => setMinute(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button type="button" className={styles.confirm} onClick={() => onConfirm(selectedTime)}>
        <Check size={18} aria-hidden="true" />
        Выбрать {selectedTime}
      </button>
    </div>
  );
}
