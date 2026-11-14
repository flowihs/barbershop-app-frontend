import styles from './styles/ListScroll.module.css';
import { useRef, useState } from "react";

type Props = {
    children: React.ReactNode;
    gap?: number | string;
};

function ListScroll({ children, gap }: Props) {
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
        const scale = container.getBoundingClientRect().width / container.offsetWidth || 1;
        container.scrollLeft = scrollStart.current + delta / scale;
    }

    const handlePointerUp = () => {
        setIsDragging(false);
    }

    return (
        <div
            ref={containerRef}
            className={styles.scroll}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onDragStart={(e) => e.preventDefault()}
            style={{
                cursor: isDragging ? "grabbing" : "grab",
                ...(gap !== undefined && { gap }),
            }}
        >
            {children}
        </div>
    );
}

export default ListScroll;