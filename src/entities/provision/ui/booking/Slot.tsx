import styles from './styles/Slot.module.css';

interface SlotProps {
    label: string;
    sublabel?: string; 
    isSelected: boolean;
    onSelect: () => void;
}

function SlotDate({ slotDate }: { slotDate: SlotProps }) {
    return (
        <button
            onClick={slotDate.onSelect}
            className={`${styles.date} ${slotDate.isSelected ? styles.selected : styles.unselected}`}
        >
            <p className={styles.day}>{slotDate.label}</p>
            <p className={styles.weekday}>{slotDate.sublabel}</p>
        </button>
    );
}

function SlotTime({ slotTime }: {slotTime: SlotProps}) {
    return (
        <button
            onClick={slotTime.onSelect}
            className={`${styles.time} ${slotTime.isSelected ? styles.selected : styles.unselected}`}
        >
            <span className={styles.timeLabel}>{slotTime.label}</span>
        </button>
    );
}

export { SlotDate, SlotTime };