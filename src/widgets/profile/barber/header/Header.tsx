import { Check, Plus } from 'lucide-react';
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

function HeaderBarberSide() {
  const user = useUserStore((state) => state.user);
  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);
  const updateDescription = useUpdateDescription();
  const uploadAvatar = useUploadAvatar();

  const { data: userProfile } = useQuery({
    queryKey: accountQueryKeys.profile(user?.id),
    queryFn: () => accountService.getProfileById(user?.id),
    enabled: Boolean(user?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const profileName = userProfile?.firstName ?? user?.firstName ?? '';
  const profileDescription = userProfile?.description ?? user?.description ?? '';
  const profilePhotoUrl = userProfile?.photoUrl ?? user?.photoUrl ?? 'public/default-user.png';
  const profileSocials = userProfile?.socials;

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
            disabled={uploadAvatar.isPending}
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
            disabled={updateDescription.isPending}
            className="flex cursor-pointer items-center gap-1 rounded-lg bg-accent px-3 py-1 text-[10px] font-semibold text-icon-dark transition-colors hover:bg-accent-hover"
          >
            <Check size={12} />
            Save
          </button>
        )}
      </form>
      <Socials
        tiktok={profileSocials?.tiktok}
        instagram={profileSocials?.instagram}
        number={profileSocials?.number}
      />
    </section>
  );
}

export { HeaderBarberSide };
