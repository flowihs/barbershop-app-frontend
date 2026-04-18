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
                className="
                    fixed inset-0 z-1 bg-black/50
                "
                transition={{ type: "tween", duration: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                className="
                    fixed z-2 inset-x-0 bottom-0 bg-bg-primary
                    h-[90vh] w-full max-w-(--width-app) mx-auto border
                    border-t-border/10 rounded-t-[10px] px-4 pt-10
                "
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
                    className="
                        absolute inset-x-0 rounded-t-[10px] top-0 py-4.5 
                        w-full cursor-grab max-w-(--width-app) 
                        flex justify-center active:cursor-grabbing 
                        active:select-none
                    "
                >
                    <div className="h-1 w-13 rounded-full bg-text-primary/70" />
                </div>
                {children}
            </motion.div>
        </>
    );
}

export { BottomSheet };