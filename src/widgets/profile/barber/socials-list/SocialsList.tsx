import { Plus } from 'lucide-react';
import type { UserProfile } from '@/entities/account';
import {
  SOCIAL_LINKS,
  SOCIAL_LINKS_MODAL_ID,
  SocialIcon,
} from '@/features/social-links';
import { useModalStore } from '@/shared/lib/store/modalStore';
import styles from './SocialsList.module.css';

function Socials({ tiktok, instagram, number }: Partial<Pick<UserProfile, 'tiktok' | 'instagram' | 'number'>>) {
  const openModal = useModalStore((state) => state.openModal);
  const socialValues = { tiktok, instagram, number };

  return (
    <div className={styles.socials}>
      {SOCIAL_LINKS.map((social) => {
        const value = socialValues[social.key];

        if (!value) return null;

        const href = social.key === 'number' ? `tel:${value}` : value;

        return (
          <a
            key={social.key}
            href={href}
            target={social.key === 'number' ? undefined : '_blank'}
            rel={social.key === 'number' ? undefined : 'noreferrer'}
            aria-label={social.name}
            className={styles.socialLink}
          >
            <SocialIcon social={social} />
          </a>
        );
      })}

      <button
        type="button"
        onClick={() => openModal(SOCIAL_LINKS_MODAL_ID)}
        aria-label="Add socials"
        className={styles.addButton}
      >
        <Plus size={20} />
      </button>
    </div>
  );
}

export { Socials };
