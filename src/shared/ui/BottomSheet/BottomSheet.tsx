import { AnimatePresence, motion } from "motion/react";
import { Minus } from 'lucide-react';

function BottomSheet({ 
    onClose, 
    children 
}: { 
    onClose: () => void, 
    children: React.ReactNode 
}) {

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: "0" }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.3}}
            >
                <Minus width={16} height={16} />
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export { BottomSheet };