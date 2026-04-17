import { motion } from "motion/react";

function BottomSheet({ 
    onClose, 
    children 
}: { 
    onClose: () => void, 
    children: React.ReactNode 
}) {

    const limit = 300;

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
                    z-2 fixed inset-x-0 bottom-0 bg-bg-primary
                    h-[90vh] max-w-(--width-app) mx-auto border
                    border-t-border/10 rounded-t-[10px] px-4 pt-3
                    calc(env(safe-area-inset-bottom) + 24px)

                "
                drag="y"
                dragDirectionLock
                dragMomentum={false}
                dragElastic={{top: 0, bottom: 0.8}}
                dragConstraints={{ top: 0, bottom: 0 }}
                initial={{ y: "100%" }}
                animate={{ y: "0" }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.2}}
                onDragEnd={(_, info) => {
                    if (info.offset.y >= limit) onClose();
                }}
            >
                <div className="mt-1 mb-4 flex justify-center">
                    <div className="h-1 w-13 rounded-full bg-text-primary/70"/>
                </div>
                {children}
            </motion.div>
        </>
    );
}

export { BottomSheet };