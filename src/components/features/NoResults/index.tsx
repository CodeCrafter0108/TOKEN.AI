import { AnimatedWrapper } from '@/components/shared/AnimatedWrapper';
import Button from '@/components/shared/Button';
import { EmptyState } from '@/components/shared/EmptyState';

interface NoResultsProps {
  handleClear: () => void;
}

export const NoResults = ({ handleClear }: NoResultsProps) => {
  return (
    <AnimatedWrapper.Opacity duration={0.2} delay={0.2}>
      <EmptyState
        title='No results found'
        description='Please try to adjust your search request'
        styles={{ padding: '0', justifyContent: 'flex-start' }}
      >
        <Button style={{ width: '100%', maxWidth: '275px' }} onClick={handleClear}>
          Clear search results
        </Button>
      </EmptyState>
    </AnimatedWrapper.Opacity>
  );
};
