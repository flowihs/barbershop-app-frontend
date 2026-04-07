interface SlotProps {
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}

function SlotDate({ slotDate }: { slotDate: SlotProps }) {
    return (
        <button
            onClick={slotDate.onSelect}
            className={`flex flex-col items-center justify-center py-6 px-2 rounded-xl cursor-pointer transition-colors ${
                slotDate.isSelected 
                    ? 'bg-accent text-icon-dark'
                    : 'bg-bg-slot text-text-primary'
            }`}
        >
            <span className="text-sm font-bold">{slotDate.label}</span>
        </button>
    );
}

function SlotTime({ slotTime }: {slotTime: SlotProps}) {
    return (
        <button
            onClick={slotTime.onSelect}
            className={`flex flex-col items-center justify-center py-2 px-2 rounded-md cursor-pointer transition-colors ${
                slotTime.isSelected 
                    ? 'bg-accent text-icon-dark'
                    : 'bg-bg-slot text-text-primary'
            }`}
        >
            <span className="text-sm font-bold">{slotTime.label}</span>
        </button>
    );
}

export { SlotDate, SlotTime };