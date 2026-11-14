import { useId, useRef, useState, type SubmitEvent } from 'react';
import { CalendarDays, Clock3, Plus, Trash2 } from 'lucide-react';
import type { CreateProvisionSlotRequest } from '@/entities/provision/model/types';
import { useModalStore } from '@/shared/lib/store/modalStore';
import { Modal } from '@/shared/ui/Modal/Modal';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';
import { createSlot, formatSlotDate, formatSlotTime, groupSlots, localDateKey, slotError } from '../model/slotDates';
import ServiceSlotDatePicker from './ServiceSlotDatePicker';
import ServiceSlotTimePicker from './ServiceSlotTimePicker';
import styles from './styles/ServiceSlotsFiled.module.css';

interface ServiceSlotsProps {
  provisionId: number;
  slots: CreateProvisionSlotRequest[];
  onChange: (slots: CreateProvisionSlotRequest[]) => void;
}

type PickerField = 'date' | 'startTime' | 'endTime';

export function ServiceSlots({ provisionId, slots, onChange }: ServiceSlotsProps) {
  const id = useId();
  const modalId = `service-slots-${id}`;
  const isOpen = useModalStore((state) => state.activeModal === modalId);
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const [date, setDate] = useState(() => localDateKey(new Date()));
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [picker, setPicker] = useState<PickerField | null>(null);
  const [error, setError] = useState('');
  const dateButton = useRef<HTMLButtonElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const endButton = useRef<HTMLButtonElement>(null);
  const groups = groupSlots(slots);

  const open = (selectedDate?: string) => {
    setDate(selectedDate ?? localDateKey(new Date()));
    setStartTime('');
    setEndTime('');
    setError('');
    setPicker(null);
    openModal(modalId);
  };

  const togglePicker = (field: PickerField) => {
    setError('');
    setPicker((current) => current === field ? null : field);
  };

  const confirmTime = (value: string) => {
    if (picker === 'startTime') {
      setStartTime(value);
      startButton.current?.focus();
    } else {
      setEndTime(value);
      endButton.current?.focus();
    }
    setPicker(null);
  };

  const handleAdd = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const slot = createSlot(provisionId, date, startTime, endTime);
    if (!slot) {
      setError('Выберите дату, время начала и окончания.');
      return;
    }
    const validationError = slotError(slot, slots);
    if (validationError) {
      setError(validationError);
      return;
    }
    // A new date goes first; another time keeps its existing date card in place.
    const firstDateIndex = slots.findIndex((entry) => localDateKey(new Date(entry.startTime)) === date);
    const next = [...slots];
    if (firstDateIndex === -1) next.unshift(slot);
    else {
      let lastDateIndex = firstDateIndex;
      while (lastDateIndex + 1 < next.length && localDateKey(new Date(next[lastDateIndex + 1].startTime)) === date) lastDateIndex++;
      next.splice(lastDateIndex + 1, 0, slot);
    }
    onChange(next);
    closeModal();
  };

  return (
    <section className={styles.section} aria-label="Свободные слоты">
      {slots.length === 0 ? (
        <div className={styles.empty}>
          <ProfilePageDefaultButton ariaLabel="Добавить временной слот" onClick={() => open()}>
            <Plus size={26} strokeWidth={1.7} />
          </ProfilePageDefaultButton>
        </div>
      ) : (
        <>
          <div className={styles.heading}>
            <h3>Свободные слоты</h3>
            <button type="button" className={styles.add} aria-label="Добавить временной слот" onClick={() => open()}>
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
          <ul className={styles.cards}>
            {groups.map((group) => (
              <li key={group.date} className={styles.card} data-slot-date={group.date}>
                <h4 className={styles.date}>
                  <CalendarDays size={16} aria-hidden="true" />
                  <time dateTime={group.date}>{formatSlotDate(group.date)}</time>
                </h4>
                <ul className={styles.times}>
                  {group.slots.map((slot) => (
                    <li key={`${slot.startTime}/${slot.endTime}`} className={styles.time}>
                      <time dateTime={slot.startTime} title={`До ${formatSlotTime(slot.endTime)}`}>{formatSlotTime(slot.startTime)}</time>
                      <button
                        type="button"
                        className={styles.remove}
                        aria-label={`Удалить слот ${formatSlotDate(group.date)} ${formatSlotTime(slot.startTime)}–${formatSlotTime(slot.endTime)}`}
                        onClick={() => onChange(slots.filter((entry) => entry !== slot))}
                      >
                        <Trash2 size={13} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                  <li>
                    <button type="button" className={styles.addTime} aria-label={`Добавить слот на ${formatSlotDate(group.date)}`} onClick={() => open(group.date)}>
                      <Plus size={18} aria-hidden="true" />
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}

      <Modal isOpen={isOpen} onClose={closeModal} title="Добавить слот" className={styles.dialog}>
        <form onSubmit={handleAdd} className={styles.form}>
          <p className={styles.description}>Выберите дату и время для создания нового слота записи.</p>
          <div className={styles.field}>
            <span id={`${id}-date-label`} className={styles.label}>Дата</span>
            <button ref={dateButton} type="button" className={styles.fieldButton} aria-labelledby={`${id}-date-label ${id}-date-value`} aria-expanded={picker === 'date'} aria-controls={`${id}-date-picker`} onClick={() => togglePicker('date')}>
              <CalendarDays size={20} aria-hidden="true" />
              <span id={`${id}-date-value`}>{formatSlotDate(date)}</span>
            </button>
            {picker === 'date' && (
              <div id={`${id}-date-picker`} className={styles.picker}>
                <ServiceSlotDatePicker value={date} markedDates={groups.map((group) => group.date)} onChange={(value) => {
                  setDate(value);
                  setPicker(null);
                  dateButton.current?.focus();
                }} />
              </div>
            )}
          </div>
          <div className={styles.field}>
            <span id={`${id}-start-label`} className={styles.label}>Время начала</span>
            <button ref={startButton} type="button" className={styles.fieldButton} aria-labelledby={`${id}-start-label ${id}-start-value`} aria-expanded={picker === 'startTime'} aria-controls={`${id}-start-picker`} onClick={() => togglePicker('startTime')}>
              <Clock3 size={20} aria-hidden="true" />
              <span id={`${id}-start-value`}>{startTime || 'Выберите время'}</span>
            </button>
            {picker === 'startTime' && (
              <div id={`${id}-start-picker`} className={styles.picker}>
                <ServiceSlotTimePicker value={startTime || '09:00'} onConfirm={confirmTime} />
              </div>
            )}
          </div>
          <div className={styles.field}>
            <span id={`${id}-end-label`} className={styles.label}>Время окончания</span>
            <button ref={endButton} type="button" className={styles.fieldButton} aria-labelledby={`${id}-end-label ${id}-end-value`} aria-expanded={picker === 'endTime'} aria-controls={`${id}-end-picker`} onClick={() => togglePicker('endTime')}>
              <Clock3 size={20} aria-hidden="true" />
              <span id={`${id}-end-value`}>{endTime || 'Выберите время'}</span>
            </button>
            {picker === 'endTime' && (
              <div id={`${id}-end-picker`} className={styles.picker}>
                <ServiceSlotTimePicker value={endTime || startTime || '10:00'} onConfirm={confirmTime} />
              </div>
            )}
          </div>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <button type="submit" className={styles.submit}>Добавить слот</button>
          <button type="button" className={styles.cancel} onClick={closeModal}>Отмена</button>
        </form>
      </Modal>
    </section>
  );
}
