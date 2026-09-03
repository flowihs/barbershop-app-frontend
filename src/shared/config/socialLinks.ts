
export type SocialFieldName = 'tiktok' | 'instagram' | 'number';

export interface SocialLinkConfig {
  key: SocialFieldName;
  name: string;
  iconSrc?: string;
  iconClassName: string;
  inputType: 'url' | 'tel';
  placeholder: string;
}

export const SOCIAL_LINKS: readonly SocialLinkConfig[] = [
  {
    key: 'tiktok',
    name: 'TikTok',
    iconSrc: '/images/icons/tik-tok.png',
    iconClassName: 'h-9 w-9 object-contain',
    inputType: 'url',
    placeholder: 'TikTok URL',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    iconSrc: '/images/icons/instagram.png',
    iconClassName: 'h-9 w-9 object-contain',
    inputType: 'url',
    placeholder: 'Instagram URL',
  },
  {
    key: 'number',
    name: 'Phone number',
    iconClassName: 'h-6 w-6',
    inputType: 'tel',
    placeholder: 'Phone number',
  },
];
