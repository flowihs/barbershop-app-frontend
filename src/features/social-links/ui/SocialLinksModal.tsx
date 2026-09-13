import styles from './styles/SocialLinksModal.module.css';
import { X } from 'lucide-react';
import { type SubmitEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  accountQueryKeys,
  accountService,
  type UserProfile,
  useUserStore,
} from '@/entities/account';
import { useUpdateSocials } from '@/features/edit-profile';
import { useModalStore } from '@/shared/lib/store/modalStore';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { SOCIAL_LINKS_MODAL_ID } from '../model/constants';
import { SOCIAL_LINKS } from '@/shared/config/socialLinks';
import { SocialIcon } from './SocialIcon';

function SocialLinksModal() {
  const isOpen = useModalStore(
    (state) => state.activeModal === SOCIAL_LINKS_MODAL_ID,
  );
  const closeModal = useModalStore((state) => state.closeModal);
  const userId = useUserStore((state) => state.user?.id);
  const updateSocials = useUpdateSocials();
  const { data: userProfile } = useQuery({
    queryKey: accountQueryKeys.profile(userId),
    queryFn: () => accountService.getProfileById(userId),
    enabled: isOpen && Boolean(userId),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const socials = SOCIAL_LINKS.reduce<Pick<UserProfile, 'tiktok' | 'instagram' | 'number'>>((values, social) => {
      const value = formData.get(social.key);
      
      values[social.key] = typeof value === 'string' ? value.trim() : '';

      return values;
    }, { tiktok: '', instagram: '', number: '' });

    updateSocials.mutate(socials, {
      onSuccess: closeModal,
    });
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-links-title"
        className={styles.dialog}
      >
        <div className={styles.header}>
          <h2
            id="social-links-title"
            className={styles.title}
          >
            Social contacts
          </h2>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close social contacts"
            className={styles.closeButton}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {SOCIAL_LINKS.map((social) => (
            <div key={social.key} className={styles.field}>
              <span className={styles.icon}>
                <SocialIcon social={social} />
              </span>

              <input
                type={social.inputType}
                name={social.key}
                aria-label={social.name}
                placeholder={social.placeholder}
                defaultValue={userProfile?.[social.key] ?? ''}
                autoComplete={social.inputType === 'tel' ? 'tel' : 'url'}
                className={styles.input}
              />
            </div>
          ))}

          <div className={styles.actions}>
            <HomePageButton
              text={updateSocials.isPending ? 'Saving...' : 'Save'}
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export { SocialLinksModal };
