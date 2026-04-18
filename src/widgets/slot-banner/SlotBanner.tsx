import { SlotTime, SlotDate } from "../../entities/provision/ui/Slot";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { provisionService } from "../../entities/provision/api/provisionApi";
import { useState } from "react";
import BookNowButton from "../../shared/ui/DefaultButton/DefaultButton";
import ListScroll from "../../shared/ui/ListScroll/ListScroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import DefaultError from "../../shared/ui/DefaultError/DefaultError";

type GroupedSlots = Record<string, Record<string, string[]>>;

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
        staleTime: 2000,
        gcTime: 20000
    });

    const freeSlots = provisions?.slots ?? [];

    const groupedSlots: GroupedSlots = {};

    freeSlots.forEach((slot) => {
        const dateObject = new Date(slot.time);

        const date = dateObject.toLocaleString("en", { month: "long", year: "numeric" }); // "March 2026"
        const day = dateObject.toLocaleString("en", { weekday: "short", day: "numeric" }).replace(',', ''); // Wed 1

        if (!groupedSlots[date]) groupedSlots[date] = {}
        if (!groupedSlots[date][day]) groupedSlots[date][day] = [];

        groupedSlots[date][day].push(
            dateObject.toLocaleString("en-GB", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        ); // 09:00
    });

    const prevMonth = () => {
        setCurrentDate((current) => new Date(current.getFullYear(), current.getMonth() - 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const nextMonth = () => {
        setCurrentDate((current) => new Date(current.getFullYear(), current.getMonth() + 1));
        setSelectedDate(null);
        setSelectedTime(null);
    };

    const currentMonth = currentDate.toLocaleString("en", { month: "long", year: "numeric" });
    const currentSlots = groupedSlots[currentMonth] ?? {};
    const currentDays = Object.keys(currentSlots);
    const selectedTimes = selectedDate ? currentSlots[selectedDate] ?? [] : [];
    
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
                            <ListScroll>
                                <div className="flex flex-row-reverse gap-3">
                                    {currentDays.map((dateSlot, i) => {
                                        
                                        // получить отдельно day = 2, weekday = Mon
                                        
                                        const day = dateSlot?.split(' ')[0];
                                        const weekday = dateSlot?.split(' ')[1];

                                        return <SlotDate
                                            key={i}
                                            slotDate={{
                                                label: day,
                                                sublabel: weekday,
                                                isSelected: selectedDate === dateSlot,
                                                onSelect: () => {
                                                    setSelectedDate(dateSlot);
                                                    setSelectedTime(null);
                                                },
                                            }}
                                        />
                                        }
                                    )}   
                                </div>
                            </ListScroll>
                        </div>

                        {selectedDate && (
                            <div>
                                <p className="text-sm text-text-primary font-semibold uppercase mb-4">Time</p>
                                <div className="pr-1 max-h-[100px] overflow-y-auto">
                                    <div className="grid grid-cols-2 gap-3">
                                        {selectedTimes.map((time, i) => (
                                            <SlotTime
                                                key={i}
                                                slotTime={{
                                                    label: time,
                                                    isSelected: selectedTime === time,
                                                    onSelect: () => setSelectedTime(time),
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div>
                            <BookNowButton text="BOOK"/>
                        </div>
                    </>
                )}
            </div>
        </BottomSheet>
    )

}

export default SlotBanner;