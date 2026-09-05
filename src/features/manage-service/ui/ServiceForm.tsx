import { Plus, Tag } from 'lucide-react';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';
import { ServiceCategoryField } from './ServiceCategoryField';
import { ServicePhotoField } from './ServicePhotoField';
import type { SubmitEventHandler } from 'react';

export interface ServiceFormValues {
  title?: string;
  description?: string;
  categoryId?: number;
  photo?: File;
}

interface ServiceFormProps {
  initialValues?: ServiceFormValues;
  submitText: string;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
}

export function ServiceForm({
  initialValues = {},
  submitText,
  onSubmit
}: ServiceFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <ServicePhotoField photo={initialValues.photo} />

      <div className="space-y-8 px-5 py-7">
        <label className="block">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Название услуги
          </span>
          <span className="relative block">
            <input
              type="text"
              name="title"
              defaultValue={initialValues.title}
              placeholder="Например: Стрижка + Борода"
              className="h-13 w-full rounded-xl border border-border/5 bg-bg-slot px-4 pr-12 text-base font-medium text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent/60"
            />
            <Tag
              size={20}
              strokeWidth={1.7}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            />
          </span>
        </label>

        <ServiceCategoryField categoryId={initialValues.categoryId} />

        <label className="block">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-wide text-text-secondary">
            Описание услуги
          </span>
          <textarea
            name="description"
            defaultValue={initialValues.description}
            rows={5}
            placeholder="Опишите услугу"
            className="min-h-28 w-full resize-none rounded-xl border border-border/5 bg-bg-slot px-4 py-3 text-base text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent/60"
          />
        </label>

        <div className="flex justify-center py-6">
          <ProfilePageDefaultButton ariaLabel="Добавить временной слот">
            <Plus size={26} strokeWidth={1.7} />
          </ProfilePageDefaultButton>
        </div>

        <div className="pt-2">
          <HomePageButton text={submitText} />
        </div>
      </div>
    </form>
  );
}
