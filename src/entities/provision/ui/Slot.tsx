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
            className={`min-w-(--width-date-card) flex flex-col items-center justify-center py-5 px-0 rounded-xl cursor-pointer transition-colors ${
                slotDate.isSelected 
                    ? 'bg-accent text-icon-dark'
                    : 'bg-bg-slot/70 text-text-primary'
            }`}
        >
            <p className="text-lg">{slotDate.label}</p>
            <p className="text-[10px] uppercase">{slotDate.sublabel}</p>
        </button>
    );
}

function SlotTime({ slotTime }: {slotTime: SlotProps}) {
    return (
        <button
            onClick={slotTime.onSelect}
            className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl cursor-pointer transition-colors ${
                slotTime.isSelected 
                    ? 'bg-accent text-icon-dark'
                    : 'bg-bg-slot/70 text-text-primary'
            }`}
        >
            <span className="text-sm">{slotTime.label}</span>
        </button>
    );
}

export { SlotDate, SlotTime };