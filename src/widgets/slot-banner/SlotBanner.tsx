import { SlotTime, SlotDate } from "../../entities/provision/ui/Slot";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { provisionService } from "../../entities/provision/api/provisionApi";
import { useState } from "react";
import BookNowButton from "../../shared/ui/DefaultButton/DefaultButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import DefaultError from "../../shared/ui/DefaultError/DefaultError";

interface GroupedSlot {
    id: number;
    day: string;
    time: string;
}

type GroupedSlots = Record<string, GroupedSlot[]>;

function SlotBanner({
    onClose,
    provisionId
}: {
    onClose: () => void
    provisionId: number
}) {

    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    const { data: provisions, isLoading, error } = useQuery({
        queryKey: ['provisions', 'free', provisionId],
        queryFn: () => provisionService.getFreeSlots(provisionId),
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
        <BottomSheet onClose={onClose}>
            <div className="flex flex-col gap-6">
                <h2 className="text-lg font-bold text-text-primary uppercase">Date & Time</h2>

                {isLoading && (
                    <p className="text-text-secondary text-sm">Loading slots...</p>
                )}

                {error && (
                    <DefaultError text="Failed to load slots" />
                )}

                {!isLoading && !error && (
                    <>
                        <div className="flex items-center justify-between rounded-xl p-3 border border-border/10">
                            <button onClick={prevMonth} className="text-accent cursor-pointer p-1 rounded-md hover:bg-accent-hover/30">
                                <ChevronLeft size={20} />
                            </button>

                            <span className="text-sm font-semibold text-text-primary uppercase">
                                {currentMonth}
                            </span>

                            <button onClick={nextMonth} className="text-accent cursor-pointer p-1 rounded-md hover:bg-accent-hover/30">
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div>
                            <p className="text-sm text-text-primary font-semibold uppercase mb-4">Date</p>
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
                                <p className="text-sm text-text-primary font-semibold uppercase mb-4">Time</p>
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
                        <div className="pt-4">
                            <BookNowButton text="BOOK"/>
                        </div>
                    </>
                )}
            </div>
        </BottomSheet>
    )

}

export default SlotBanner;