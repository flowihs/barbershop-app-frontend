import { Plus } from 'lucide-react';
import type { Socials as SocialValues } from '@/entities/account';
import {
  SOCIAL_LINKS,
  SOCIAL_LINKS_MODAL_ID,
  SocialIcon,
} from '@/features/social-links';
import { useModalStore } from '@/shared/lib/store/modalStore';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';

function Socials({ tiktok, instagram, number }: SocialValues) {
  const openModal = useModalStore((state) => state.openModal);
  const socialValues: SocialValues = { tiktok, instagram, number };

  return (
    <div className="mt-5 flex items-center justify-center gap-4">
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
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-card-2 transition-transform hover:scale-105"
          >
            <SocialIcon social={social} />
          </a>
        );
      })}

      <ProfilePageDefaultButton
        onClick={() => openModal(SOCIAL_LINKS_MODAL_ID)}
        ariaLabel="Add socials"
      >
        <Plus size={20} />
      </ProfilePageDefaultButton>
    </div>
  );
}

export { Socials };
