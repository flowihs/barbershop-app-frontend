import { Phone } from 'lucide-react';
import type { SocialLinkConfig } from '@/shared/config/socialLinks';
import styles from './styles/SocialIcon.module.css';

function SocialIcon({ social }: { social: SocialLinkConfig }) {
  if (social.iconSrc) {
    return (
      <img
        src={social.iconSrc}
        alt=""
        aria-hidden="true"
        className={styles.image}
      />
    );
  }

  return <Phone aria-hidden="true" className={styles.phone} />;
}

export { SocialIcon };
