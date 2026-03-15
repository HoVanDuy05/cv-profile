import { Image, type ImageProps } from '@mantine/core';
import { useState, useEffect, type ComponentPropsWithoutRef } from 'react';
import defaultLogo from '@/assets/images/logo.png';

interface SafeImageProps extends ImageProps, Omit<ComponentPropsWithoutRef<'img'>, keyof ImageProps> {
  fallbackSrc?: string;
  alt?: string;
}

const SafeImage = ({ src, fallbackSrc = defaultLogo, alt, ...others }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <Image
      src={imgSrc}
      onError={handleError}
      alt={alt}
      {...others}
    />
  );
};

export default SafeImage;
