import styles from './ProvisionTicket.module.css';

import { SquareArrowOutUpRight } from 'lucide-react';
import { Clock } from 'lucide-react';

function ProvisionTicket({ 
    title,
    price,
    time 
}: {
    title: string,
    price: number,
    time: string 
}) {

    return (
        <div>
            <div className={styles.ticket} >
                <div>
                    {title}
                </div>
                <div className={styles.priceRow}>
                    <span className={styles.price}>
                        {price}
                    </span>
                    <span>
                        <SquareArrowOutUpRight size={10} className={styles.muted}/>
                    </span>
                </div>
                <div className={styles.metadata}>
                    <span>
                        <Clock size={6} className={styles.muted} />
                    </span>
                    <span className={styles.duration}>{time} min</span>
                </div>
            </div>
        </div>
    )
}

export { ProvisionTicket }