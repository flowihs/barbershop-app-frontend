import styles from './styles/ServiceInfo.module.css';
import { Clock, Scissors, MapPin } from 'lucide-react';
import type { ProvisionRequest } from '../../entities/provision';
import { Like } from '../../entities/provision/ui/like/Like';
import { useState } from 'react';
import ListScroll from '@/shared/ui/ListScroll/ListScroll.tsx';

function ServiceInfo({ provision }: { provision: ProvisionRequest }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const allImages = [provision.avatar, ...(provision.images || [])];
    const mainImage = allImages[activeIndex];

    return (
        <div className={styles.content}>
            <div className={styles.headerImages}>
                <div className={styles.imageFrame}>
                    <img
                        src={mainImage}
                        alt={provision.title}
                        className={styles.image}
                    />
                </div>
                <ListScroll gap={8}>
                    {allImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            className={`${styles.imagesContainerItem} ${
                                index === activeIndex
                                    ? styles['imagesContainerItem--active']
                                    : ''
                            }`}
                            onClick={() => setActiveIndex(index)}
                            alt={'Потом вставлю'}
                        />
                    ))}
                </ListScroll>
            </div>

            <div className={styles.heading}>
                <h1 className={styles.title}>{provision.title}</h1>
                <span className={styles.price}>0 $</span>
            </div>

            <div
                className={`${styles.descriptionContainer} ${
                    isDescriptionExpanded ? styles['descriptionContainer--expanded'] : ''
                }`}
                onClick={() => setIsDescriptionExpanded(() => true)}
                role="button"
                tabIndex={0}
            >
                <p className={styles.description}>{provision.description}</p>

                {!isDescriptionExpanded && (
                    <div className={styles.descriptionFade} />
                )}


                {!isDescriptionExpanded && (
                    <span className={styles.descriptionToggle}>
                        Смотреть все
                    </span>
                )}
            </div>

            <div className={styles.metadata}>
                <div className={styles.detail}>
                    <Clock size={16} className={styles.accent} />
                    <span className={styles.detailText}>40 mins</span>
                </div>
                <div className={styles.detail}>
                    <Scissors size={16} className={styles.accent} />
                    <span className={styles.detailText}>
                        {provision.provisionCategory.name}
                    </span>
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
                        <MapPin size={20} className={styles.locationIcon} />
                    </button>
                    <Like id={provision.id} />
                </div>
            </div>
        </div>
    );
}

export default ServiceInfo;
