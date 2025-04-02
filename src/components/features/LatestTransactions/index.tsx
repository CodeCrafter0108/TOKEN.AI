'use client';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetTransactions } from '@/graphql/queries/GetTransactions';
import { ILastTransactionData, ISwap, IToken, ITransactionsData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { LatestTransactionCard } from './components/LatestTransactionCard';
import { COUNT_LAST_TRANSACTIONS, supportedPages } from './constants';
import { CardList } from './styles';
import { GetLastTransactions } from '@/graphql/queries/GetLastTransactions';
import { formatterPath } from './utils';

export const LatestTransactions = () => {
  const [transactions, setTransactions] = useState<(ISwap | IToken)[]>([]);
  const lastTransaction = useRef<ISwap | null>(null);
  const lastLaunchedTransaction = useRef<IToken | null>(null);
  const [newTransaction, setNewTransaction] = useState<ISwap | IToken | null>(null);

  const [isDelayed, setIsDelayed] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const timeout = setTimeout(() => setIsDelayed(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const {
    // loading: agentLoading,
  } = useQuery<ITransactionsData>(GetTransactions, {
    client,
    variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: COUNT_LAST_TRANSACTIONS },
    // skip: !supportedPages.includes(pathname),
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
    // loading: lastTransactionsLoading,
    data: lastTransactions
  } = useQuery<ILastTransactionData>(GetLastTransactions, {
    client,
    variables: {
      timestampSwap: lastTransaction?.current?.blockTimestamp,
      timestampLaunch: lastLaunchedTransaction?.current?.blockTimestamp
    },
    pollInterval: RefetchInterval.FIVE_SECONDS,
    onError: (error) => console.error(error),
    skip:
      isDelayed ||
      !lastTransaction?.current?.blockTimestamp ||
      !lastLaunchedTransaction?.current?.blockTimestamp ||
      !supportedPages.includes(pathname)
  });

  useEffect(() => {
    if (lastTransactions) {
      const processTransactions = (
        transactions: ISwap[] | IToken[],
        lastTransactionRef: React.RefObject<ISwap | IToken | null>
      ) => {
        if (transactions.length === 0) return;
        if (transactions.length === 1) {
          setNewTransaction(transactions[0]);
          lastTransactionRef.current = transactions[0];
          setTransactions((prev) => [transactions[0], ...prev]);
          setTimeout(() => {
            setNewTransaction(null);
          }, 300);
        }
        if (transactions?.length > 1) {
          let index = transactions.length - 1;

          const interval = setInterval(() => {
            if (index === -1) {
              clearInterval(interval);
              setTimeout(() => setNewTransaction(null), 500);
              return;
            }

            if (index === 0) {
              lastTransactionRef.current = transactions[index];
            }

            const swap = transactions[index];
            setNewTransaction(swap);
            setTransactions((prev) => [swap, ...prev]);
            index--;
          }, 500);
        }
      };

      const { lastLaunchs = [], lastSwaps = [] } = lastTransactions;
      processTransactions(lastSwaps, lastTransaction);
      processTransactions(lastLaunchs, lastLaunchedTransaction);
    }
  }, [lastTransactions]);

  if (!supportedPages.includes(formatterPath(pathname))) return null;

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
