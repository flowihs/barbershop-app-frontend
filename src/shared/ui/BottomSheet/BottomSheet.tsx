import { AnimatePresence, motion } from "motion/react";
import { Minus } from 'lucide-react';

interface SheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function BottomSheet({ sheet }: {sheet: SheetProps}) {
    return (
        <AnimatePresence>
            {sheet.isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={sheet.onClose}
                    />
                    <motion.div
                        className="fixed inset-0 z-50 bg-bg-primary rounded-t-2x1 px-4 pt-6 pb-8 max-w-(--width-app) mx-auto"
                        initial={{ y: "100%" }}
                        animate={{ y: "0" }}
                        exit={{ y: "100%" }}
                        transition={{ type: "tween", duration: 0.3}}
                    >
                        <Minus width={16} height={16}/>
                        {sheet.children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export { BottomSheet };