import styles from './ServiceForm.module.css';
import { Plus, Tag } from 'lucide-react';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { ProfilePageDefaultButton } from '@/shared/ui/Buttons/profile-page-button';
import { ServiceCategoryField } from './ServiceCategoryField';
import { ServicePhotoField } from './ServicePhotoField';
import type { SubmitEventHandler } from 'react';
import type { CreateProvisionRequest } from '@/entities/provision';

export interface ServiceFormValues extends Partial<Pick<CreateProvisionRequest, 'title' | 'description' | 'categoryId'>> {
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

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>
            Название услуги
          </span>
          <span className={styles.inputWrap}>
            <input
              type="text"
              name="title"
              defaultValue={initialValues.title}
              placeholder="Например: Стрижка + Борода"
              className={styles.input}
            />
            <Tag
              size={20}
              strokeWidth={1.7}
              className={styles.inputIcon}
            />
          </span>
        </label>

        <ServiceCategoryField categoryId={initialValues.categoryId} />

        <label className={styles.field}>
          <span className={styles.label}>
            Описание услуги
          </span>
          <textarea
            name="description"
            defaultValue={initialValues.description}
            rows={5}
            placeholder="Опишите услугу"
            className={styles.description}
          />
        </label>

        <div className={styles.addSlot}>
          <ProfilePageDefaultButton ariaLabel="Добавить временной слот">
            <Plus size={26} strokeWidth={1.7} />
          </ProfilePageDefaultButton>
        </div>

        <div className={styles.submit}>
          <HomePageButton text={submitText} />
        </div>
      </div>
    </form>
  );
}
