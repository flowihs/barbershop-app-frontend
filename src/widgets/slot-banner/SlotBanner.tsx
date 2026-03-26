import { SlotTime, SlotDate } from "../../entities/provision/ui/Slot";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { provisionService } from "../../entities/provision/api/provisionApi";
import { useState } from "react";
import BookNowButton from "../../shared/ui/BookNowButton/BookNowButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface SlotBannerProps {
    isOpen: boolean;
    onClose: () => void;
    provisionId: number;
}
interface GroupedSlot {
    id: number;
    day: string;
    time: string;
}

type GroupedSlots = Record<string, GroupedSlot[]>;


function SlotBanner({ slotBanner }: { slotBanner: SlotBannerProps}) {

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: provisions, isLoading, error } = useQuery({
        queryKey: ['provisions', 'free', slotBanner.provisionId],
        queryFn: () => provisionService.getFreeSlots(slotBanner.provisionId),
        enabled: slotBanner.isOpen
    });

    const freeSlots = provisions?.slots ?? [];

    const groupedSlots: GroupedSlots = {};

    freeSlots.forEach((slot) => {
        const dateObject = new Date(slot.time);

        const date = dateObject.toLocaleString("en", { month: "long", year: "numeric" });

        if (!groupedSlots[date]) groupedSlots[date] = [];

        groupedSlots[date].push({
             id: slot.id,
             day: dateObject.toLocaleString("en", { weekday: "short", day: "numeric" }),
             time: dateObject.toLocaleString("en-GB", { timeStyle: "short"})
         })
    });

    const prevMonth = () => {
        setCurrentDate((current) => new Date(current.getFullYear(), current.getMonth() - 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const nextMonth = () => {
        setCurrentDate((current) => new Date(current?.getFullYear(), current?.getMonth() + 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const currentMonth = currentDate.toLocaleString("en", { month: "long", year: "numeric" });
    const currentSlots = groupedSlots[currentMonth] ?? [];
    
    return (
        <BottomSheet sheet={{ isOpen: slotBanner.isOpen, onClose: slotBanner.onClose}}>
            <div className="flex flex-col gap-6">
                <h2 className="text-lg font-bold text-text-primary uppercase">Date & Time</h2>

                {isLoading && (
                    <p className="text-text-secondary text-sm">Loading slots...</p>
                )}

                {error && (
                    <p className="text-red-500 text-sm">Failed to load slots</p>
                )}

                {!isLoading && !error && (
                    <>
                        <div className="flex items-center justify-between">
                            <button onClick={prevMonth} className="text-accent">
                                <ChevronLeft size={20} />
                            </button>

                            <span className="text-sm font-semibold text-text-primary uppercase">
                                {currentMonth}
                            </span>

                            <button onClick={nextMonth} className="text-accent">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div>
                            <p className="text-xs text-text-secondary font-semibold uppercase mb-2">Date</p>
                            <div className="flex gap-2 overflow-x-auto">
                                {currentSlots.map((slot) => (
                                    <SlotDate
                                        key={slot.id}
                                        slotDate={{
                                            label: slot.day,
                                            isSelected: selectedDate === slot.day,
                                            onSelect: () => {
                                                setSelectedDate(slot.day);
                                                setSelectedTime(null);
                                            },
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {selectedDate && (
                            <div>
                                <p className="text-xs text-text-secondary font-semibold uppercase mb-3">Time</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {currentSlots.filter((slot) => slot.day === selectedDate).map((slot) => (
                                        <SlotTime
                                            key={slot.id}
                                            slotTime={{
                                                label: slot.time,
                                                isSelected: selectedTime === slot.time,
                                                onSelect: () => setSelectedTime(slot.time),
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <BookNowButton />
                    </>
                )}

            </div>
        </BottomSheet>
    )

}

export default SlotBanner;