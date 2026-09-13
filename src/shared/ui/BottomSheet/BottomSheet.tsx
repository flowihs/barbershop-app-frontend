import styles from './styles/BottomSheet.module.css';
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDragControls } from "motion/react";

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
        <>
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
                dragDirectionLock
                dragMomentum={false}
                dragListener={false}
                dragElastic={{ top: 0, bottom: 0.8 }}
                dragConstraints={{ top: 0, bottom: 0 }}
                onDragEnd={(_, info) => {
                    if (info.offset.y >= limit) onClose();
                }}
                initial={{ y: "100%" }}
                animate={{ y: "0" }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.2}}
            >

                <div
                    onPointerDown={event => controls.start(event)} 
                    className={styles.handle}
                >
                    <div className={styles.handleBar} />
                </div>
                {children}
            </motion.div>
        </>
    );
}

export { BottomSheet };