import { X } from 'lucide-react';
import { type SubmitEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  accountQueryKeys,
  accountService,
  useUserStore,
} from '@/entities/account';
import { useUpdateSocials } from '@/features/edit-profile';
import { useModalStore } from '@/shared/lib/store/modalStore';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { SOCIAL_LINKS_MODAL_ID } from '../model/constants';
import { SOCIAL_LINKS } from '@/shared/config/socialLinks';
import { SocialIcon } from './SocialIcon';

type Socials = {
  tiktok: string,
  instagram: string,
  number: string
}

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
  const currentSocials = {
    tiktok: userProfile?.tiktok,
    instagram: userProfile?.instagram,
    number: userProfile?.number,
  };

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
    const socials = SOCIAL_LINKS.reduce<Socials>((values, social) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="social-links-title"
        className="w-full max-w-97.5 rounded-2xl border border-border/10 bg-bg-primary p-5 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2
            id="social-links-title"
            className="text-lg font-bold text-text-primary"
          >
            Social contacts
          </h2>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Close social contacts"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-bg-card-2 hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {SOCIAL_LINKS.map((social) => (
            <div key={social.key} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-card-2 text-accent">
                <SocialIcon social={social} />
              </span>

              <input
                type={social.inputType}
                name={social.key}
                aria-label={social.name}
                placeholder={social.placeholder}
                defaultValue={currentSocials?.[social.key] ?? ''}
                autoComplete={social.inputType === 'tel' ? 'tel' : 'url'}
                className="h-11 min-w-0 flex-1 rounded-xl border border-border/10 bg-bg-card-2 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/60"
              />
            </div>
          ))}

          <div className="mt-2">
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
