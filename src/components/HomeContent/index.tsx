import { H2 } from '@/styles/global';
import { Hero } from './components/Hero';
import { TopAgents } from './components/TopAgents';

export const HomeContent = () => {
  return (
    <>
      <Hero />
      <div>
        <H2>Available tokens</H2>
        <div>
          <TopAgents />
        </div>
      </div>
    </>
  );
};
