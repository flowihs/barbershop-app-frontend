import { useRef, useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { ServiceForm } from '@/features/manage-service/ui/ServiceForm';
import type { ServicePhotosValue } from '@/features/manage-service/ui/ServicePhotoField';
import { useCreateProvision } from '@/features/manage-service/model/use-create-provision';
import { ErrorHandlingMassage } from '@/shared/lib/api-error/apiErrorHandling';
import type { CreateProvisionSlotRequest } from '@/entities/provision/model/types';
import type { CreateProvisionRequest } from '@/entities/provision/model/types';

function prepareServicePhotos(value: ServicePhotosValue): Pick<CreateProvisionRequest, 'avatar' | 'images'> {
  if (value.photos.length === 0) throw new Error('Добавьте хотя бы одну фотографию услуги.');

  const images = value.photos.map((photo) => {
    if (!photo.file) throw new Error('Выберите файлы фотографий перед созданием услуги.');
    return photo.file;
  });
  
  const avatar = value.photos.find((photo) => photo.url === value.avatarUrl)?.file;
  if (!avatar) throw new Error('Выберите фотографию, которая будет аватаркой услуги.');

  return { avatar, images };
}

export default function CreateService() {
  const createProvision = useCreateProvision();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<ServicePhotosValue>({ photos: [], avatarUrl: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = useRef(false);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>, slots: CreateProvisionSlotRequest[]) => {
    event.preventDefault();
    if (submitting.current) return;

    const form = new FormData(event.currentTarget);
    const title = String(form.get('title') ?? '').trim();
    const description = String(form.get('description') ?? '').trim();
    const categoryId = Number(form.get('categoryId'));
    if (!title) {
      setError('Введите название услуги.');
      return;
    }
    if (!Number.isSafeInteger(categoryId) || categoryId <= 0) {
      setError('Выберите категорию услуги.');
      return;
    }

    submitting.current = true;
    setIsSubmitting(true);
    setError('');
    try {
      const { avatar, images } = prepareServicePhotos(photos);
      await createProvision.mutateAsync({ title, description, categoryId, avatar, images, slots });
      navigate('/barber-services', { replace: true });
    } catch (cause) {
      setError(ErrorHandlingMassage(cause));
    } finally {
      submitting.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <ServiceForm
      submitText={isSubmitting ? 'Создание…' : 'Создать услугу'}
      onSubmit={handleSubmit}
      onPhotosChange={setPhotos}
      isSubmitting={isSubmitting}
      error={error}
    />
  );
}
