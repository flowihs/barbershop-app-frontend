interface SlotProps {
    label: string;
    sublabel?: string;
    isSelected: boolean;
    onSelect: () => void;
}

function Slot({ slot }: { slot: SlotProps }) {
    return (
        <button
            onClick={slot.onSelect}
            className={`flex flex-col items-center justify-center py-2 px-4 rounded-xl cursor-pointer transition-colors ${
                slot.isSelected 
                    ? 'bg-accent text-icon-dark'
                    : 'bg-bg-secondary text-text-primary'
                }`}
        >
            <span className="text-sm font-bold">{slot.label}</span>
            {slot.sublabel && (
                <span className={`text-xs uppercase ${
                    slot.isSelected ? 'text-icon-dark/70' : `text-text-muted`
                }`}>
                    {slot.sublabel}
                </span>
            )}
        </button>
    );
}

export default Slot;