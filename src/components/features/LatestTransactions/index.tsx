'use client';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetLastLaunch } from '@/graphql/queries/GetLastLaunch';
import { GetLastSwap } from '@/graphql/queries/GetLastSwap';
import { GetTransactions } from '@/graphql/queries/GetTransactions';
import { ISwap, IToken, ITransactionsData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LatestTransactionCard } from './components/LatestTransactionCard';
import { COUNT_LAST_TRANSACTIONS, supportedPages } from './constants';
import { CardList } from './styles';

export const LatestTransactions = () => {
  const [transactions, setTransactions] = useState<(ISwap | IToken)[]>([]);
  const lastTransaction = useRef<ISwap | null>(null);
  const lastLaunchedTransaction = useRef<IToken | null>(null);
  const [newTransaction, setNewTransaction] = useState<ISwap | IToken | null>(null);

  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsDelayed(false), RefetchInterval.THREE_SECONDS);

    return () => clearTimeout(timeout);
  }, []);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const {
    // loading: agentLoading,
  } = useQuery<ITransactionsData>(GetTransactions, {
    client,
    variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: COUNT_LAST_TRANSACTIONS },
    onError: (error) => console.error(error),
    onCompleted: (data) => {
      if (data) {
        const formatedTransactions: (ISwap | IToken)[] = [...data.swaps, ...data.tokens]
          .sort((a, b) => +(b?.blockTimestamp ?? '0') - +(a?.blockTimestamp ?? '0'))
          .slice(0, COUNT_LAST_TRANSACTIONS);

        setTransactions(formatedTransactions);
        if (data.swaps?.[0]) lastTransaction.current = data.swaps[0];
        if (data.tokens?.[0]) lastLaunchedTransaction.current = data.tokens[0];
      }
    }
  });

  const {
    // loading: agentLoading,
    data: lastSwaps
  } = useQuery<ITransactionsData>(GetLastSwap, {
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

  const {
    // loading: agentLoading,
    data: lastLaunch
  } = useQuery<ITransactionsData>(GetLastLaunch, {
    client,
    variables: {
      orderBy: 'blockTimestamp',
      orderDirection: 'desc',
      first: 5,
      timestamp: lastLaunchedTransaction?.current?.blockTimestamp
    },
    pollInterval: RefetchInterval.FAST,
    onError: (error) => console.error(error),
    skip: isDelayed || !lastLaunchedTransaction?.current?.blockTimestamp
  });

  //TODO : Refactor
  useEffect(() => {
    if (lastLaunch) {
      if (lastLaunch.tokens?.length === 0) return;
      if (lastLaunch.tokens?.length === 1) {
        setNewTransaction(lastLaunch.tokens[0]);
        lastLaunchedTransaction.current = lastLaunch.tokens[0];
        setTransactions((prev) => [lastLaunch.tokens[0], ...prev]);
        setTimeout(() => {
          setNewTransaction(null);
        }, 300);
      }

      if (lastLaunch.tokens?.length > 1) {
        let index = lastLaunch.tokens.length - 1;

        const interval = setInterval(() => {
          if (index === -1) {
            clearInterval(interval);
            setTimeout(() => setNewTransaction(null), 500);
            return;
          }

          if (index === 0) {
            lastLaunchedTransaction.current = lastLaunch.tokens[index];
          }

          const swap = lastLaunch.tokens[index];
          setNewTransaction(swap);
          setTransactions((prev) => [swap, ...prev]);
          index--;
        }, 500);
      }
    }
  }, [lastLaunch]);

  useEffect(() => {
    if (lastSwaps) {
      if (lastSwaps.swaps?.length === 0) return;
      if (lastSwaps.swaps?.length === 1) {
        setNewTransaction(lastSwaps.swaps[0]);
        lastTransaction.current = lastSwaps.swaps[0];
        setTransactions((prev) => [lastSwaps.swaps[0], ...prev]);
        setTimeout(() => {
          setNewTransaction(null);
        }, 300);
      }

      if (lastSwaps.swaps?.length > 1) {
        let index = lastSwaps.swaps.length - 1;

        const interval = setInterval(() => {
          if (index === -1) {
            clearInterval(interval);
            setTimeout(() => setNewTransaction(null), 500);
            return;
          }

          if (index === 0) {
            lastTransaction.current = lastSwaps.swaps[index];
          }

          const swap = lastSwaps.swaps[index];
          setNewTransaction(swap);
          setTransactions((prev) => [swap, ...prev]);
          index--;
        }, 500);
      }
    }
  }, [lastSwaps]);

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
