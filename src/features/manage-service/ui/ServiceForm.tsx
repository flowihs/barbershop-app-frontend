import styles from './styles/ServiceForm.module.css';
import { Tag } from 'lucide-react';
import HomePageButton from '@/shared/ui/Buttons/home-button';
import { ServiceCategoryField } from './ServiceCategoryField';
import { ServicePhotoField, type ServicePhotosValue } from './ServicePhotoField';
import { useState, type SubmitEvent } from 'react';
import type { CreateProvisionSlotRequest } from '@/entities/provision/model/types';
import { ServiceSlots } from './ServiceSlotsFiled';

export interface ServiceFormValues {
  title?: string;
  description?: string;
  categoryId?: number;
  photoUrls?: string[];
  avatarUrl?: string;
  slots?: CreateProvisionSlotRequest[];
}

interface ServiceFormProps {
  initialValues?: ServiceFormValues;
  submitText: string;
  onSubmit: (event: SubmitEvent<HTMLFormElement>, slots: CreateProvisionSlotRequest[]) => void;
  onPhotosChange?: (value: ServicePhotosValue) => void;
  isSubmitting?: boolean;
  error?: string;
}

function createDraftProvisionId(): number {
  const bytes = crypto.getRandomValues(new Uint32Array(2));
  return (bytes[0] & 0x1fffff) * 0x100000000 + bytes[1] || 1;
}

export function ServiceForm({
  initialValues,
  submitText,
  onSubmit,
  onPhotosChange,
  isSubmitting = false,
  error,
}: ServiceFormProps) {
  const [provisionId] = useState(() => initialValues?.slots?.[0]?.provisionId ?? createDraftProvisionId());
  const [slots, setSlots] = useState<CreateProvisionSlotRequest[]>(() => initialValues?.slots ?? []);

  return (
    <form aria-busy={isSubmitting} onSubmit={(event) => onSubmit(event, slots)}>
      <fieldset disabled={isSubmitting} className={styles.content}>
        <ServicePhotoField
          photoUrls={initialValues?.photoUrls}
          avatarUrl={initialValues?.avatarUrl}
          onChange={onPhotosChange}
        />

        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>
              Название услуги
            </span>
            <span className={styles.inputWrap}>
              <input
                type="text"
                name="title"
                required
                defaultValue={initialValues?.title}
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

          <ServiceCategoryField categoryId={initialValues?.categoryId} />

          <label className={styles.field}>
            <span className={styles.label}>
              Описание услуги
            </span>
            <textarea
              name="description"
              defaultValue={initialValues?.description}
              rows={5}
              placeholder="Опишите услугу"
              className={styles.description}
            />
          </label>

          <ServiceSlots provisionId={provisionId} slots={slots} onChange={setSlots} />

          <div className={styles.submit}>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <HomePageButton type="submit" disabled={isSubmitting} text={submitText} />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
