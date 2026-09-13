import styles from './styles/ServiceInfo.module.css';
import { Clock, Scissors, MapPin } from 'lucide-react';
import type { ProvisionRequest } from '../../entities/provision';
import { ExpandButton } from '../../shared/ui/ExpandButton/ExpandButton';
import { Like } from '../../entities/provision/ui/like/Like';


function ServiceInfo({ provision }: {provision: ProvisionRequest}) {

    return (
        <div className={styles.content}>
            <div className={styles.imageFrame}>
                <img
                    src={provision.avatar}
                    alt={provision.title}
                    className={styles.image}
                />
            </div>

            <div className={styles.heading}>
                <h1 className={styles.title}>{provision.title}</h1>
                <span className={styles.price}>0 $</span>
            </div>  
            <ExpandButton>
                <p className={styles.description}>
                    {provision.description}
                </p>
            </ExpandButton>
            <div className={styles.metadata}>
                <div className={styles.detail}>
                    <Clock size={16} className={styles.accent}/>
                    {/*<span className="text-xs">{provision.time} mins</span>*/}
                    <span className={styles.detailText}>40 mins</span>
                </div>
                <div className={styles.detail}>
                    <Scissors size={16} className={styles.accent}/>
                    <span className={styles.detailText}>{provision.provisionCategory.name}</span>
                </div>
            </div>

            <div className={styles.footer}>
                <div className={styles.barber}>
                    <img
                        src="/public/default-user.png"
                        alt={provision.user.firstName}
                        className={styles.avatar}
                    />
                    <div>
                        <p className={styles.barberName}>{provision.user.firstName}</p>
                        <p className={styles.barberRole}>Barber or client</p>
                    </div>
                </div>
                <div className={styles.actions}>
                    <button className={styles.actionButton}>
                        <MapPin size={20} className={styles.locationIcon}/>
                    </button>
                    <Like id={provision.id} />
                </div>
            </div>
        </div>
    )
}

export default ServiceInfo
