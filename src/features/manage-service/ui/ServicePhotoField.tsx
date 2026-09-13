import styles from './ServicePhotoField.module.css';
import { Camera } from 'lucide-react';

interface ServicePhotoFieldProps {
  photo?: File | null;
}

export function ServicePhotoField({ photo }: ServicePhotoFieldProps) {
  return (
    <section className={styles.section}>
      <label className={styles.label}>
        <input
          type="file"
          name="photo"
          accept="image/png, image/jpeg, image/webp"
          className={styles.input}
        />
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="Preview"
            className={styles.preview}
          />
        ) : (
          <span className={styles.preview}>
            <Camera size={28} strokeWidth={2} />
          </span>
        )}
        <strong className={styles.title}>
          Добавить фото
        </strong>
        <span className={styles.hint}>
          до 5 МБ
        </span>
      </label>
    </section>
  );
}
