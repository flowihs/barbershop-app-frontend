import styles from './styles/CategoryImage.module.css';
import { useState } from 'react';
import { CloudAlert } from 'lucide-react';
import type { Category } from '../../model/types';

function renderFallbackIcon() {
  const iconProps = { size: 26, strokeWidth: 1.7, 'aria-hidden': true } as const;

  return <CloudAlert {...iconProps} />;
}

export function CategoryImage({ category }: { category: Pick<Category, 'name' | 'image'> }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const image = category.image?.trim();

  return (
    <span className={styles.frame}>
      {image && image !== failedImage ? (
        <img
          src={image}
          alt=""
          className={styles.image}
          onError={() => setFailedImage(image)}
        />
      ) : (
        renderFallbackIcon()
      )}
    </span>
  );
}
