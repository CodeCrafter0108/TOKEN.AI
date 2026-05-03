import { useFallBackImage } from '@/hooks/useFallBackImage';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '../../shared/Skeleton';
import { ImageWrapper } from './styles';

export const ImageWithFallback = (
  props: ImageProps & { widthSkeleton: number; heightSkeleton: number }
) => {
  const { widthSkeleton, heightSkeleton, src, style, ...restProps } = props;

  const originalSrc = typeof src === 'string' ? src : null;
  const { src: resolvedSrc, onError } = useFallBackImage(originalSrc);

  const isValid = !!resolvedSrc;

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
      <animateTransform attributeName="transform" type="translate"
        from="-400 0" to="400 0" dur="2s" repeatCount="indefinite" />
    </svg>
  `;

  const blurDataURL = `data:image/svg+xml;base64,${btoa(skeletonSVG)}`;

  return (
    <ImageWrapper $size={widthSkeleton}>
      {isValid ? (
        <Image
          {...restProps}
          style={{ ...style }}
          src={resolvedSrc}
          unoptimized
          placeholder="blur"
          blurDataURL={blurDataURL}
          alt={props.alt || 'Image'}
          onError={onError}
        />
      ) : (
        <Skeleton
          width={widthSkeleton}
          height={heightSkeleton}
          isLoading
          borderRadius={style?.borderRadius?.toString()}
        />
      )}
    </ImageWrapper>
  );
};