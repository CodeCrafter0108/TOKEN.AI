import { SkeletonWrapper } from './styles';

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
}

export const Skeleton = ({ width, height, borderRadius = '8px', children, isLoading = true }: SkeletonProps) => {
  return (
    <>
      {isLoading ? (
        <SkeletonWrapper $width={width} $height={height} $borderRadius={borderRadius} />
      ) : (
        children
      )}
    </>
  );
};
