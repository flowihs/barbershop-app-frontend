
export type SocialFieldName = 'tiktok' | 'instagram' | 'number';

export interface SocialLinkConfig {
  key: SocialFieldName;
  name: string;
  iconSrc?: string;
  inputType: 'url' | 'tel';
  placeholder: string;
}

export const SOCIAL_LINKS: readonly SocialLinkConfig[] = [
  {
    key: 'tiktok',
    name: 'TikTok',
    iconSrc: '/images/icons/tik-tok.png',
    inputType: 'url',
    placeholder: 'TikTok URL',
  },
  {
    key: 'instagram',
    name: 'Instagram',
    iconSrc: '/images/icons/instagram.png',
    inputType: 'url',
    placeholder: 'Instagram URL',
  },
  {
    key: 'number',
    name: 'Phone number',
    inputType: 'tel',
    placeholder: 'Phone number',
  },
];
