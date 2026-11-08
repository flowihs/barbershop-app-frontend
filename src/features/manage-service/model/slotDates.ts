import type { CreateProvisionSlotRequest } from '@/entities/provision/model/types';

export function localDateKey(date: Date): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-');
}

export function formatSlotDate(value: string): string {
  return new Date(`${value}T12:00:00`).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function formatSlotTime(value: string): string {
  return new Date(value).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function groupSlots(slots: CreateProvisionSlotRequest[]) {
  const groups = new Map<string, CreateProvisionSlotRequest[]>();
  for (const slot of slots) {
    const date = localDateKey(new Date(slot.startTime));
    const group = groups.get(date);
    if (group) group.push(slot);
    else groups.set(date, [slot]);
  }
  return Array.from(groups, ([date, entries]) => ({ date, slots: entries }));
}

export function createSlot(provisionId: number, date: string, startTime: string, endTime: string): CreateProvisionSlotRequest | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) return null;
  const start = new Date(`${date}T${startTime}:00`);
  const end = new Date(`${date}T${endTime}:00`);
  if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime())) return null;
  // Reject normalized/invalid local dates and nonexistent times at a DST change.
  const matches = (value: Date, time: string) => localDateKey(value) === date
    && `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}` === time;
  if (!matches(start, startTime) || !matches(end, endTime)) return null;
  return { provisionId, startTime: start.toISOString(), endTime: end.toISOString() };
}

export function slotError(slot: CreateProvisionSlotRequest, slots: CreateProvisionSlotRequest[]): string {
  const start = Date.parse(slot.startTime);
  const end = Date.parse(slot.endTime);
  if (end <= start) return 'Время окончания должно быть позже времени начала.';
  if (slots.some((entry) => start < Date.parse(entry.endTime) && end > Date.parse(entry.startTime))) {
    return 'Это время пересекается с уже добавленным слотом.';
  }
  return '';
}
