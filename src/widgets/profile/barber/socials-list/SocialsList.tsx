import { Plus } from 'lucide-react';
import { SOCIAL_LINKS } from '@/shared/config/socialLinks';

function Socials() {
  return (
    <div className="mt-5 flex items-center justify-center gap-4">
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.name}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-bg-card-2 transition-transform hover:scale-105"
        >
          <img
            src={social.iconSrc}
            alt=""
            aria-hidden="true"
            className={social.iconClassName}
          />
        </a>
      ))}

      <button
        type="button"
        aria-label="Add social network"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-accent/40 text-accent transition-colors hover:border-accent hover:bg-bg-card-2"
      >
        <Plus size={28} />
      </button>
    </div>
  );
}

export { Socials };
