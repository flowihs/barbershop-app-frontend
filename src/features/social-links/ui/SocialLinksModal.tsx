import styles from './styles/SocialLinksModal.module.css';
import { type SubmitEvent } from 'react';
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
import { Modal } from '@/shared/ui/Modal';

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
    <Modal isOpen={isOpen} onClose={closeModal} title="Social contacts">
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
    </Modal>
  );
}

export { SocialLinksModal };
