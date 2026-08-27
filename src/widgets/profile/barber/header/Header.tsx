import { Check, MessageSquare, Plus } from 'lucide-react';
import { type SubmitEvent, useState } from 'react';
import { useUserStore } from '@/entities/account';
import { Like } from '@/entities/provision';
import { Socials } from '../socials-list/SocialsList';

interface HeaderBarberSideProps {
  provisionId: number;
}

function HeaderBarberSide({ provisionId }: HeaderBarberSideProps) {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);

  const profileName = user?.firstName ?? '';
  const profileDescription = user?.description ?? '';
  const profilePhotoUrl = user?.photoUrl ?? undefined;

  const [isDescriptionChanged, setIsDescriptionChanged] = useState(false);

  const handleDescriptionSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const description = String(formData.get('description') ?? '');

    updateUser({ description });
    setIsDescriptionChanged(false);
  };

  return (
    <section className="flex flex-col items-center px-3 pb-6 pt-4">
      <div className="relative">
        <img
          src={profilePhotoUrl}
          alt={profileName}
          className="h-28 w-28 rounded-full object-cover"
        />

        <label
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-text-primary text-icon-dark shadow-lg"
        >
          <input
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

      <div className="mt-3 flex w-full items-stretch gap-2">
        <button
          type="button"
          className="flex min-h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border/10 text-xs font-semibold text-text-primary transition-colors hover:bg-bg-card-2"
        >
          <MessageSquare size={13} />
          Message
        </button>

        <div className="flex min-h-10 min-w-11 items-center justify-center rounded-lg border border-border/10 transition-colors hover:bg-bg-card-2">
          <Like id={provisionId} />
        </div>
      </div>
    </section>
  );
}

export { HeaderBarberSide };
