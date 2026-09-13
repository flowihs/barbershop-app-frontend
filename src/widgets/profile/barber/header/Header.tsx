import { Check, Heart, MessageCircle, Plus } from 'lucide-react';
import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import {
  accountQueryKeys,
  accountService,
  useUserStore,
} from '@/entities/account';
import { Socials } from '../socials-list/SocialsList';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { useQuery } from '@tanstack/react-query';
import {
  useUpdateDescription,
  useUploadAvatar,
} from '@/features/edit-profile';
import styles from './Header.module.css';

function HeaderBarberSide() {
  const user = useUserStore((state) => state.user);
  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const updateDescription = useUpdateDescription();
  const uploadAvatar = useUploadAvatar();

  const { data: userProfile } = useQuery({
    queryKey: accountQueryKeys.profile(user?.id),
    queryFn: () => accountService.getProfileById(user?.id),
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const profileName = [
    userProfile?.firstName ?? user?.firstName,
    userProfile?.lastName ?? user?.lastName,
  ].filter(Boolean).join(' ');
  const profileDescription = userProfile?.description ?? user?.description ?? '';
  const profilePhotoUrl = userProfile?.photoUrl ?? user?.photoUrl ?? 'public/default-user.png';
  const profileUsername = userProfile?.username ?? user?.username;
  const profilePhone = userProfile?.number ?? user?.number;

  const handleDescriptionSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const description = String(formData.get('description') ?? '');

    updateDescription.mutate(description, {
      onSuccess: () => setIsDescriptionChanged(false),
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) return;

    uploadAvatar.mutate(file);
    event.currentTarget.value = '';
  };

  return (
    <section className={styles.section}>
      <div className={styles.avatarWrap}>
        <Avatar
          photo={profilePhotoUrl}
          alt={profileName}
          className={styles.avatar}
        />

        <label
          aria-label="Change profile photo"
          className={styles.avatarButton}
        >
          <input
            onChange={handleFileChange}
            disabled={uploadAvatar.isPending}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className={styles.hiddenInput}
          />
          <Plus size={25} />
        </label>
      </div>

      <p className={styles.name}>
        {profileName}
      </p>

      <Socials
        tiktok={userProfile?.tiktok}
        instagram={userProfile?.instagram}
        number={userProfile?.number}
      />

      <div className={styles.actionRow}>
        {profileUsername || profilePhone ? (
          <a
            href={profileUsername ? `https://t.me/${profileUsername.replace(/^@/, '')}` : `tel:${profilePhone}`}
            target={profileUsername ? '_blank' : undefined}
            rel={profileUsername ? 'noreferrer' : undefined}
            className={styles.messageButton}
          >
            <MessageCircle size={15} />
            Message
          </a>
        ) : (
          <span className={styles.messageButtonDisabled}>
            Message unavailable
          </span>
        )}
        <span className={styles.rating} aria-label="Rating 4.5 out of 5">
          4.5
        </span>
        <button
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => setIsFavorite((value) => !value)}
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <form
        onSubmit={handleDescriptionSubmit}
        className={styles.descriptionForm}
      >
        <textarea
          key={profileDescription}
          name="description"
          defaultValue={profileDescription}
          onChange={() => setIsDescriptionChanged(true)}
          maxLength={400}
          rows={2}
          aria-label="Barber description"
          placeholder="Tell clients about your experience and style"
          className={styles.description}
        />

        {isDescriptionChanged && (
          <button
            type="submit"
            disabled={updateDescription.isPending}
            className={styles.saveButton}
          >
            <Check size={12} />
            Save
          </button>
        )}
      </form>
    </section>
  );
}

export { HeaderBarberSide };
