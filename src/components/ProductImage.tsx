import { useState } from 'react';
import { Footprints } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`product-image-fallback ${className}`} role="img" aria-label={alt}>
        <Footprints size={48} strokeWidth={1.25} />
        <span>Изображение недоступно</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
