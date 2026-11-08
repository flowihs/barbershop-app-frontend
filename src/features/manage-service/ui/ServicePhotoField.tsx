import styles from './styles/ServicePhotoField.module.css';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';

export interface ServicePhoto {
  url: string;
  file?: File;
}

export interface ServicePhotosValue {
  photos: ServicePhoto[];
  avatarUrl: string;
}

interface ServicePhotoFieldProps {
  photoUrls?: string[];
  avatarUrl?: string;
  onChange?: (value: ServicePhotosValue) => void;
}

const acceptedTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024;

const slideVariants = {
  enter: (direction: number) => ({ x: direction * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction * -48, opacity: 0 }),
};

function PhotoPreview({ url, index }: { url: string; index: number }) {
  const [failed, setFailed] = useState(false);

  return failed ? (
    <div className={styles.failed} role="img" aria-label={`Не удалось загрузить фото ${index + 1}`}>
      <Camera size={32} aria-hidden="true" />
      <span>Не удалось загрузить фото</span>
    </div>
  ) : (
    <img
      src={url}
      alt={`Фото услуги ${index + 1}`}
      className={styles.image}
      onError={() => setFailed(true)}
      draggable={false}
    />
  );
}

export function ServicePhotoField({ photoUrls = [], avatarUrl, onChange }: ServicePhotoFieldProps) {
  const urls = photoUrls.filter((url) => url.trim().length > 0);
  const sourceKey = JSON.stringify([urls, avatarUrl]);

  const [gallery, setGallery] = useState(() => ({
    sourceKey,
    photos: urls.map((url): ServicePhoto => ({ url })),
    avatarUrl: avatarUrl && urls.includes(avatarUrl) ? avatarUrl : urls[0] ?? '',
    index: 0,
    direction: 1,
  }));
  
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const ownedUrls = useRef(new Set<string>());
  const reduceMotion = useReducedMotion();

  if (gallery.sourceKey !== sourceKey) {
    setError('');
    setGallery({
      sourceKey,
      photos: urls.map((url) => gallery.photos.find((photo) => photo.url === url) ?? { url }),
      avatarUrl: avatarUrl && urls.includes(avatarUrl) ? avatarUrl : urls[0] ?? '',
      index: 0,
      direction: 1,
    });
  }

  useEffect(() => {
    const objectUrls = ownedUrls.current;
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
      objectUrls.clear();
    };
  }, []);

  const activePhoto = gallery.photos[gallery.index];
  const isAvatar = activePhoto?.url === gallery.avatarUrl;

  const selectFiles = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    inputRef.current.click();
  };

  const handleFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files ?? []);

    if (files.length === 0) return;

    if (files.some((file) => !acceptedTypes.includes(file.type))) {
      event.currentTarget.value = '';
      setError('Выберите фото в формате PNG, JPEG или WebP.');
      return;
    }

    if (files.some((file) => file.size > maxFileSize)) {
      event.currentTarget.value = '';
      setError('Размер каждого фото не должен превышать 5 МБ.');
      return;
    }

    const selected = (activePhoto ? files.slice(0, 1) : files).map((file) => {
      const url = URL.createObjectURL(file);
      ownedUrls.current.add(url);
      return { url, file };
    });
    
    const photos = activePhoto
      ? gallery.photos.map((photo, index) => index === gallery.index ? selected[0] : photo)
      : selected;

    const nextAvatarUrl = !activePhoto || isAvatar ? selected[0].url : gallery.avatarUrl;
    setGallery({ ...gallery, photos, avatarUrl: nextAvatarUrl });
    setError('');
    onChange?.({ photos, avatarUrl: nextAvatarUrl });
  };

  const goTo = (direction: number) => {
    setGallery((current) => ({
      ...current,
      direction,
      index: (current.index + direction + current.photos.length) % current.photos.length,
    }));
    setError('');
  };

  const makeAvatar = () => {
    if (!activePhoto) return;
    setGallery({ ...gallery, avatarUrl: activePhoto.url });
    onChange?.({ photos: gallery.photos, avatarUrl: activePhoto.url });
  };

  return (
    <section className={styles.section} aria-label="Фотографии услуги">
      <input
        ref={inputRef}
        type="file"
        name="photo"
        accept={acceptedTypes.join(',')}
        multiple={!activePhoto}
        onChange={handleFiles}
        className={styles.input}
        aria-label="Выбрать фотографии услуги"
        tabIndex={-1}
      />
      <div className={styles.viewport}>
        {!activePhoto ? (
          <button type="button" className={styles.fallback} onClick={selectFiles}>
            <span className={styles.camera}><Camera size={32} aria-hidden="true" /></span>
            <strong className={styles.title}>Добавить фото</strong>
            <span className={styles.hint}>Рекомендуем 4:3, до 5 МБ</span>
          </button>
        ) : (
          <>
            <div className={styles.slides} aria-roledescription="карусель">
              <AnimatePresence initial={false} custom={gallery.direction}>
                <motion.div
                  key={`${gallery.index}:${activePhoto.url}`}
                  className={styles.slide}
                  custom={gallery.direction}
                  variants={reduceMotion ? undefined : slideVariants}
                  initial={reduceMotion ? false : 'enter'}
                  animate={reduceMotion ? undefined : 'center'}
                  exit={reduceMotion ? undefined : 'exit'}
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }}
                >
                  <PhotoPreview key={activePhoto.url} url={activePhoto.url} index={gallery.index} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={styles.badges}>
              <span className={styles.badge} role="status" aria-label={`Фото ${gallery.index + 1} из ${gallery.photos.length}`}>
                {gallery.index + 1}/{gallery.photos.length}
              </span>
              {isAvatar && <span className={styles.badge}>Аватарка</span>}
            </div>
            {gallery.photos.length > 1 && (
              <div className={styles.navigation}>
                <button type="button" className={styles.arrow} onClick={() => goTo(-1)} aria-label="Предыдущее фото">
                  <ArrowLeft size={24} aria-hidden="true" />
                </button>
                <button type="button" className={styles.arrow} onClick={() => goTo(1)} aria-label="Следующее фото">
                  <ArrowRight size={24} aria-hidden="true" />
                </button>
              </div>
            )}
            <div className={styles.actions}>
              <button type="button" className={styles.action} onClick={makeAvatar} disabled={isAvatar}>
                <Camera size={20} aria-hidden="true" />
                {isAvatar ? 'Это аватарка' : 'Сделать аватаркой'}
              </button>
              <button type="button" className={styles.action} onClick={selectFiles}>
                <Camera size={20} aria-hidden="true" />
                Заменить фото
              </button>
            </div>
          </>
        )}
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </section>
  );
}
