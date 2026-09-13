import styles from './ExpandButton.module.css';
import { ChevronDown } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import * as motion from "motion/react-client"

function ExpandButton({ children }: { children: React.ReactNode }) {
    
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedH, setExpandedH] = useState(0);
    const container = useRef<HTMLDivElement>(null);
    
    const normalH = 40;
    const animationDefaultTime = 0.6;

    useLayoutEffect(() => {
        if (container.current ) {
            setExpandedH(container.current.scrollHeight);
        }
    }, [children]);

    const extensible = expandedH > normalH;

    return (
        <div className={styles.container}>
            <motion.div
                animate={
                    extensible
                    ? { height: isExpanded ? expandedH : normalH }
                    : { height: normalH }
                }
                transition={{ duration: animationDefaultTime, ease: "easeInOut"}}
                className={styles.content}
            >
                <div ref={container} className={styles.inner}>
                    {children}
                </div>
            </motion.div>

            {extensible && (
                <motion.button 
                    transition={{ duration: animationDefaultTime, ease: "easeInOut"}}
                    className={styles.button}
                    onClick={() => setIsExpanded((v) => !v)}
                >
                    <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: animationDefaultTime, ease: "easeInOut"}}
                    >
                        <ChevronDown 
                            size={23} 
                            className={styles.icon}
                                />
                    </motion.div>
                </motion.button>
            )}   
        </div>
    )
}

export { ExpandButton }
