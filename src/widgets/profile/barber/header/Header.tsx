import { Check, Plus } from 'lucide-react';
import { type ChangeEvent, type SubmitEvent, useState } from 'react';
import { accountService, useUserStore } from '@/entities/account';
import { Socials } from '../socials-list/SocialsList';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { useQuery } from '@tanstack/react-query';

function HeaderBarberSide() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>();

  if (!user?.id) {
    throw new Error('User is not authenticated');
  }

  const { data: userProfile } = useQuery({
    queryKey: ['userProfile', user.id],
    queryFn: () => accountService.getProfileById(user.id),
    enabled: Boolean(user?.id),
  });

  const profileName = userProfile?.firstName ?? user?.firstName ?? '';
  const profileDescription = userProfile?.description ?? user?.description ?? '';
  const profilePhotoUrl = avatarPreview ?? userProfile?.photoUrl ?? user?.photoUrl;

  const handleDescriptionSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const description = String(formData.get('description') ?? '');
    const id = user?.id;

    if (!id) return;

    const form = {
      id,
      description
    }

    const res = await accountService.updateDescription(form);

    if (!res) return;

    updateUser({ description });
    setIsDescriptionChanged(false);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') return;

      setAvatarPreview(reader.result);
      updateUser({ photoUrl: reader.result });
    };

    reader.readAsDataURL(file);

    try {
      const updatedProfile = await accountService.updateAvatar(file);

      if (updatedProfile?.photoUrl) {
        setAvatarPreview(updatedProfile.photoUrl);
        updateUser({ photoUrl: updatedProfile.photoUrl });
      }
    } catch (error) {
      console.error('Failed to upload avatar', error);
    } finally {
      event.target.value = '';
    }
  };

  return (
    <section className="flex flex-col items-center px-3 pb-6 pt-4">
      <div className="relative">
        <Avatar
          photo={profilePhotoUrl}
          alt={profileName}
          className="h-28 w-28"
        />

        <label
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-text-primary text-icon-dark shadow-lg"
        >
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            className="sr-only"
          />
          <Plus size={25} />
        </label>
      </div>

      <p className="mt-4 w-full px-3 py-2 text-center text-xl font-bold text-text-primary">
        {profileName}
      </p>

      <form
        onSubmit={handleDescriptionSubmit}
        className="mt-4 flex w-full flex-col items-end gap-2"
      >
        <textarea
          key={profileDescription}
          name="description"
          defaultValue={profileDescription}
          onChange={() => setIsDescriptionChanged(true)}
          maxLength={400}
          rows={4}
          aria-label="Barber description"
          placeholder="Tell clients about your experience and style"
          className="min-h-28 w-full resize-none rounded-xl border border-accent/40 bg-transparent px-6 py-4 text-center text-sm leading-5 text-text-secondary outline-none transition-colors focus:border-accent focus:text-text-primary"
        />

        {isDescriptionChanged && (
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-accent px-3 py-1 text-[10px] font-semibold text-icon-dark transition-colors hover:bg-accent-hover"
          >
            <Check size={12} />
            Save
          </button>
        )}
      </form>
      <Socials />
    </section>
  );
}

export { HeaderBarberSide };
