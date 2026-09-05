import { Camera } from 'lucide-react';

interface ServicePhotoFieldProps {
  photo?: File | null;
}

export function ServicePhotoField({ photo }: ServicePhotoFieldProps) {
  return (
    <section className="flex min-h-72 items-center justify-center bg-bg-card px-4 py-8">
      <label className="flex cursor-pointer flex-col items-center text-center">
        <input
          type="file"
          name="photo"
          accept="image/png, image/jpeg, image/webp"
          className="sr-only"
        />
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="Preview"
            className="flex size-16 items-center justify-center rounded-full border border-accent/60 bg-bg-primary/90 text-accent"
          />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-full border border-accent/60 bg-bg-primary/90 text-accent">
            <Camera size={28} strokeWidth={2} />
          </span>
        )}
        <strong className="mt-4 text-lg text-text-primary">
          Добавить фото
        </strong>
        <span className="mt-1 max-w-56 truncate text-xs text-text-secondary">
          до 5 МБ
        </span>
      </label>
    </section>
  );
}
