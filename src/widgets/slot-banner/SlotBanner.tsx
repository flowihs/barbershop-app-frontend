import styles from './styles/SlotBanner.module.css';
import { SlotTime, SlotDate } from "../../entities/provision";
import { BottomSheet } from "../../shared/ui/BottomSheet/BottomSheet";
import { provisionService } from "../../entities/provision/api/provisionApi";
import { useState } from "react";
import BookNowButton from "../../shared/ui/Buttons/home-button";
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

    const { data: provision, isLoading, error } = useQuery({
        queryKey: ['provisions', 'free', provisionId],
        queryFn: () => provisionService.getFreeSlots(provisionId),
        staleTime: 2000,
        gcTime: 20000
    });

    const freeSlots = provision?.provisionSlot.filter((slot) => slot.available) ?? [];

    const groupedSlots: GroupedSlots = {};

    freeSlots.forEach((slot) => {
        const dateObject = new Date(slot.startTime);
        if (Number.isNaN(dateObject.getTime())) return;

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
            <div className={styles.content}>
                <h2 className={styles.title}>Date & Time</h2>

                {isLoading && (
                    <p className={styles.loading}>Loading slots...</p>
                )}

                {error && (
                    <DefaultError text="Failed to load slots" />
                )}

                {!isLoading && !error && (
                    <>
                        <div className={styles.monthPicker}>
                            <button onClick={prevMonth} className={styles.monthButton}>
                                <ChevronLeft size={20} />
                            </button>

                            <span className={styles.monthTitle}>
                                {currentMonth}
                            </span>

                            <button onClick={nextMonth} className={styles.monthButton}>
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div>
                            <p className={styles.fieldLabel}>Date</p>
                            <ListScroll>
                                <div className={styles.dates}>
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
                                <p className={styles.fieldLabel}>Time</p>
                                <div className={styles.timeScroll}>
                                    <div className={styles.times}>
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
