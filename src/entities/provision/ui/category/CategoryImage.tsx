import { useState } from 'react';
import { Paintbrush, Scissors, Sparkles, SprayCan, UserRound } from 'lucide-react';
import type { Category } from '../../model/types';

function renderFallbackIcon(name: string) {
  const iconProps = { size: 26, strokeWidth: 1.7, 'aria-hidden': true } as const;
  const normalizedName = name.toLowerCase();

  if (/окраш|колор|color|colour|dye/.test(normalizedName)) {
    return <Paintbrush {...iconProps} />;
  }
  if (/уклад|стайлинг|styling/.test(normalizedName)) {
    return <SprayCan {...iconProps} />;
  }
  if (/уход|комплекс|care|combo/.test(normalizedName)) {
    return <Sparkles {...iconProps} />;
  }
  if (/бород|брить|beard|shav/.test(normalizedName)) {
    return <UserRound {...iconProps} />;
  }

  return <Scissors {...iconProps} />;
}

export function CategoryImage({ category }: { category: Pick<Category, 'name' | 'image'> }) {
  const [failedImage, setFailedImage] = useState<string | null>(null);
  const image = category.image?.trim();

  return (
    <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-bg-card-2 text-accent">
      {image && image !== failedImage ? (
        <img
          src={image}
          alt=""
          className="size-full object-cover"
          onError={() => setFailedImage(image)}
        />
      ) : (
        renderFallbackIcon(category.name)
      )}
    </span>
  );
}
