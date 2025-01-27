import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '../Skeleton';
import { ImageWrapper } from './styles';

export const ImageWithFallback = (
  props: ImageProps & { widthSkeleton: number; heightSkeleton: number; shape?: 'rect' | 'circle' | 'round' }
) => {
  const { widthSkeleton, heightSkeleton, shape = 'round', ...restProps } = props;
  const [hasError, setHasError] = useState(false);

  const skeletonSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200" preserveAspectRatio="none">
      <rect x="0" y="0" width="400" height="200" fill="#d0d0d0" />
      <rect x="0" y="0" width="400" height="200" fill="url(#gradient)" />
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stop-color="#e5e5e5" />
          <stop offset="50%" stop-color="#d0d0d0" />
          <stop offset="100%" stop-color="#e5e5e5" />
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
      <Image
        {...restProps}
        placeholder='blur'
        blurDataURL={blurDataURL}
        alt={props.alt || 'Image'}
        onError={handleError}
        style={{ display: hasError ? 'none' : 'block' }}
      />
      {hasError && <Skeleton width={widthSkeleton} height={heightSkeleton} isLoading shape={shape} />}
    </ImageWrapper>
  );
};
