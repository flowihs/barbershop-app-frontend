import { useRef, useState } from "react";

function ListScroll({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollStart = useRef(0);

    const handlePointerDown = (event: React.PointerEvent) => {
        const container = containerRef.current;
        if (!container) return;

        setIsDragging(true);
        startX.current = event.clientX;
        scrollStart.current = container.scrollLeft;
    }

    const handlePointerMove = (event: React.PointerEvent) => {
        if (!isDragging) return;
        const container = containerRef.current;
        if (!container) return;

        const delta = startX.current - event.clientX;
        container.scrollLeft = scrollStart.current + delta;
    }

    const handlePointerUp = () => {
        setIsDragging(false);
    }

    return (
        <div
            ref={containerRef}
            className="flex gap-4 overflow-x-auto select-none scrollbar-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onDragStart={(e) => e.preventDefault()}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
            {children}
        </div>
    );
}

export default ListScroll;
