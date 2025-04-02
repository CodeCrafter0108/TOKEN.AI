import { RuleSet } from 'styled-components';
import { SkeletonWrapper } from './styles';

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  styles?: RuleSet<object>;
}

export const Skeleton = ({ width, height, borderRadius = '8px', children, isLoading = true, styles }: SkeletonProps) => {
  return (
    <>
      {isLoading ? (
        <SkeletonWrapper $width={width} $height={height} $borderRadius={borderRadius} $styles={styles}/>
      ) : (
        children
      )}
    </>
  );
};
