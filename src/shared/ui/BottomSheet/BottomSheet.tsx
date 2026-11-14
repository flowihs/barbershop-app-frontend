import styles from './styles/BottomSheet.module.css';
import { motion, MotionConfig } from "motion/react";
import { useEffect } from "react";
import { useDragControls } from "motion/react";

function scalePointerPosition(point: { x: number; y: number }) {
    const scale = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--ui-scale'),
    ) || 1;

    // Convert pointer coordinates to zoomed layout units for Motion.
    return { x: point.x / scale, y: point.y / scale };
}

function BottomSheet({ 
    onClose,
    children
}: {
    onClose: () => void, 
    children: React.ReactNode 
}) {
    const controls = useDragControls();
    const limit = 300;

    useEffect(() => {
        const preOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = preOverflow;
        }
    }, []);

    return (
        <MotionConfig transformPagePoint={scalePointerPosition}>
            <motion.div
                className={styles.overlay}
                transition={{ type: "tween", duration: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                className={styles.sheet}
                drag="y"
                dragControls={controls}
                dragListener={false}
                dragDirectionLock
                dragMomentum={false}
                dragConstraints={{ top: 0, bottom: 9999 }}
                dragElastic={{ top: 0.05, bottom: 0 }}
                onDragEnd={(_, info) => {
                    if (info.offset.y > limit || info.velocity.y > 500) {
                        onClose();
                    }
                }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.2 }}
            >

                <div
                    onPointerDown={event => controls.start(event)}
                    className={styles.handle}
                >
                    <div className={styles.handleBar} />
                </div>
                {children}
            </motion.div>
        </MotionConfig>
    );
}

export { BottomSheet };