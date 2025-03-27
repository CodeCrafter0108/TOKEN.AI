'use client';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetLastSwap } from '@/graphql/queries/GetLastSwap';
import { GetSwaps } from '@/graphql/queries/GetSwaps';
import { ISwap, ISwapsData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LatestTransactionCard } from './components/LatestTransactionCard';
import { supportedPages } from './constants';
import { CardList } from './styles';

export const LatestTransactions = () => {
  const [transactions, setTransactions] = useState<ISwap[]>([]);
  const lastTransaction = useRef<ISwap | null>(null);
  const [newTransaction, setNewTransaction] = useState<ISwap | null>(null);

  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsDelayed(false), RefetchInterval.THREE_SECONDS);
    return () => clearTimeout(timeout);
  }, []);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const {
    // loading: agentLoading,
  } = useQuery<ISwapsData>(GetSwaps, {
    client,
    variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: 20 },
    onError: (error) => console.error(error),
    onCompleted: (data) => {
      if (data) {
        setTransactions(data.swaps);
        if (data.swaps?.[0]) lastTransaction.current = (data.swaps[0]);
      }
    }
  });

  const {
    // loading: agentLoading,
    data
  } = useQuery<ISwapsData>(GetLastSwap, {
    client,
    variables: {
      orderBy: 'blockTimestamp',
      orderDirection: 'desc',
      first: 5,
      timestamp: lastTransaction?.current?.blockTimestamp
    },
    pollInterval: RefetchInterval.FAST,
    onError: (error) => console.error(error),
    skip: isDelayed || !lastTransaction?.current?.blockTimestamp
  });

  useEffect(() => {
    if (data) {
      if (data.swaps?.length === 0) return;
      if (data.swaps?.length === 1) {
        setNewTransaction(data.swaps[0]);
        lastTransaction.current = (data.swaps[0]);
        setTransactions((prev) => [data.swaps[0], ...prev]);
        setTimeout(() => {
          setNewTransaction(null);
        }, 300);
      }

      if (data.swaps?.length > 1) {
        let index = data.swaps.length - 1;

        const interval = setInterval(() => {
          if (index === -1) {
            clearInterval(interval);
            setTimeout(() => setNewTransaction(null), 500);
            return;
          }

          if (index === 0) {
            lastTransaction.current = (data.swaps[index]);
          }

          const swap = data.swaps[index];
          setNewTransaction(swap);
          setTransactions((prev) => [swap, ...prev]);
          index--;
        }, 500);
      }
    }
  }, [data]);

  const pathname = usePathname();

  if (!supportedPages.includes(pathname)) return null;

  return (
    <CardList>
      <AnimatePresence initial={false} mode='popLayout'>
        {transactions?.map((transaction) => (
          <motion.div
            key={transaction.id}
            layout
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            transition={{
              layout: { type: 'spring', stiffness: 300, damping: 30 }
            }}
          >
            <LatestTransactionCard transaction={transaction} isNewTransaction={transaction.id === newTransaction?.id} />
          </motion.div>
        ))}
      </AnimatePresence>
    </CardList>
  );
};
