'use client';
import Button from '@/components/shared/Button';
import { useState } from 'react';
import { CardList } from './styles';
import { LatestTransactionCard } from './components/LatestTransactionCard';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { supportedPages } from './constants';

const mockData = [1];

export const LatestTransactions = () => {
  const [transactions, setTransactions] = useState(mockData);
  const [newCard, setNewCard] = useState<number | null>(null);

  const addNewCard = () => {
    const newId = Date.now();
    setNewCard(newId);
    setTransactions((prev) => [newId, ...prev]);

    setTimeout(() => {
      setNewCard(null);
    }, 500);
  };

  const pathname = usePathname();

  if (!supportedPages.includes(pathname)) return null;

  return (
    <>
      <CardList>
        <AnimatePresence initial={false} mode='popLayout'>
          {transactions.map((item) => (
            <LatestTransactionCard key={item} isNewCard={item === newCard} id={item} />
          ))}
        </AnimatePresence>
      </CardList>

      <Button onClick={() => addNewCard()}>
        Add transaction
      </Button>
    </>
  );
};
