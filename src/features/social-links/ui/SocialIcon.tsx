import { Phone } from 'lucide-react';
import type { SocialLinkConfig } from '@/shared/config/socialLinks';

function SocialIcon({ social }: { social: SocialLinkConfig }) {
  if (social.iconSrc) {
    return (
      <img
        src={social.iconSrc}
        alt=""
        aria-hidden="true"
        className={social.iconClassName}
      />
    );
  }

  return <Phone aria-hidden="true" className={social.iconClassName} />;
}

export { SocialIcon };
