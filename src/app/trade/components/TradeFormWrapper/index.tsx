'use client';

import { Flex } from '@/styles/global';

export const TradeFormWrapper = ({children}: { children: React.ReactNode }) => {
  return (
    <Flex $align='center' $direction='column' $justify='center' style={{ flex: 1 }}>
      {children}
    </Flex>
  );
};
