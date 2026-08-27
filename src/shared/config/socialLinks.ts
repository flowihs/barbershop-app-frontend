
interface SocialLink {
  name: string;
  href: string;
  iconSrc: string;
  iconClassName: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/',
    iconSrc: '/images/icons/tik-tok.png',
    iconClassName: 'h-9 w-9 object-contain'
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/',
    iconSrc: '/images/icons/instagram.png',
    iconClassName: 'h-9 w-9 object-contain',
  },
  {
    name: 'X',
    href: 'https://x.com/',
    iconSrc: '/images/icons/twitter.png',
    iconClassName: 'h-7 w-7 object-contain invert',
  },
];
