import { Phone, X } from 'lucide-react';
import { type SubmitEvent, useEffect } from 'react';
import { SOCIAL_LINKS } from '@/shared/config/socialLinks';
import { useModalStore } from '@/shared/lib/store/modalStore';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { SOCIAL_LINKS_MODAL_ID } from '../model/constants';

const tiktokIcon = SOCIAL_LINKS.find(
  (social) => social.name === 'TikTok',
)?.iconSrc;
const instagramIcon = SOCIAL_LINKS.find(
  (social) => social.name === 'Instagram',
)?.iconSrc;

function SocialLinksModal() {
  const isOpen = useModalStore(
    (state) => state.activeModal === SOCIAL_LINKS_MODAL_ID,
  );
  const closeModal = useModalStore((state) => state.closeModal);

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
    closeModal();
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
          <label className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-card-2">
              <img
                src={tiktokIcon}
                alt="tiktok-icon"
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </span>
            <input
              type="url"
              name="tiktok"
              aria-label="TikTok URL"
              placeholder="TikTok URL"
              autoComplete="url"
              className="h-11 min-w-0 flex-1 rounded-xl border border-border/10 bg-bg-card-2 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/60"
            />
          </label>

          <label className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-card-2">
              <img
                src={instagramIcon}
                alt=""
                aria-hidden="true"
                className="h-8 w-8 object-contain"
              />
            </span>
            <input
              type="url"
              name="instagram"
              aria-label="Instagram URL"
              placeholder="Instagram URL"
              autoComplete="url"
              className="h-11 min-w-0 flex-1 rounded-xl border border-border/10 bg-bg-card-2 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/60"
            />
          </label>

          <label className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-card-2 text-accent">
              <Phone size={24} />
            </span>
            <input
              type="tel"
              name="phoneNumber"
              aria-label="Phone number"
              placeholder="Phone number"
              autoComplete="tel"
              className="h-11 min-w-0 flex-1 rounded-xl border border-border/10 bg-bg-card-2 px-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent/60"
            />
          </label>

          <div className="mt-2">
            <HomePageButton text="Save" />
          </div>
        </form>
      </section>
    </div>
  );
}

export { SocialLinksModal };
