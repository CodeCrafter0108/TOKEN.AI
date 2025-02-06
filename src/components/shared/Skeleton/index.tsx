import { SkeletonWrapper } from './styles';

interface SkeletonProps {
  width: number;
  height: number;
  shape?: 'rect' | 'circle' | 'round';
  borderRadius?: number;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const Skeleton = ({ width, height, shape = 'rect', borderRadius = 8, children, isLoading = true }: SkeletonProps) => {
  return (
    <>
      {isLoading ? (
        <SkeletonWrapper $width={width} $height={height} $shape={shape} $borderRadius={borderRadius} />
      ) : (
        children
      )}
    </>
  );
};
