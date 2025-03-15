import Image, { ImageProps } from 'next/image';
import { useMemo, useState } from 'react';
import { Skeleton } from '../../shared/Skeleton';
import { ImageWrapper } from './styles';

export const ImageWithFallback = (
  props: ImageProps & { widthSkeleton: number; heightSkeleton: number; shape?: 'rect' | 'circle' | 'round' }
) => {
  const { widthSkeleton, heightSkeleton, shape = 'round', src, ...restProps } = props;
  const [hasError, setHasError] = useState(false);


  const isValidSrc = useMemo(() => {
    if (typeof src !== 'string' || !src.trim()) return false;
    try {
      if (src.startsWith('/')) return true;
      new URL(src);
      return true;
    } catch {
      return false;
    }
  }, [src]);

  const skeletonSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
      <rect x="0" y="0" width="400" height="200" fill="#413f3f" />
      <rect x="0" y="0" width="400" height="200" fill="url(#gradient)" />
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#818181" />
          <stop offset="50%" stop-color="#413f3f" />
          <stop offset="100%" stop-color="#818181" />
        </linearGradient>
      </defs>
      <animateTransform
        attributeName="transform"
        type="translate"
        from="-400 0"
        to="400 0"
        dur="2s"
        repeatCount="indefinite"
      />
    </svg>
  `;

  const blurDataURL = `data:image/svg+xml;base64,${btoa(skeletonSVG)}`;

  const handleError = () => {
    setHasError(true);
  };

  return (
    <ImageWrapper $size={widthSkeleton}>
      {isValidSrc && !hasError ? (
        <Image
          {...restProps}
          src={src}
          unoptimized //TODO remove after connect ssl certificate
          placeholder='blur'
          blurDataURL={blurDataURL}
          alt={props.alt || 'Image'}
          onError={handleError}
        />
      ) : (
        <Skeleton width={widthSkeleton} height={heightSkeleton} isLoading shape={shape} />
      )}
    </ImageWrapper>
  );
};
