'use client';
import Button from '@/components/shared/Button';
import { useEffect, useState } from 'react';
import { CardList } from './styles';
import { LatestTransactionCard } from './components/LatestTransactionCard';
import { AnimatePresence, useAnimate } from 'framer-motion';

const mockData = [1];

export const LatestTransactions = () => {
  const [transactions, setTransactions] = useState(mockData);
  console.log('🚀 ~ LatestTransactions ~ transactions:', transactions);
  const [isNewCard, setIsNewCard] = useState<boolean>(false);
  const [isFisrstRender, setIsFisrstRender] = useState<boolean>(true);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!isFisrstRender) {
        setIsNewCard(true);
        setTimeout(() => {
          setIsNewCard(false);
        }, 500);
      }
      setIsFisrstRender(false);
    }, 200);

    return () => clearTimeout(timeOut);
  }, [transactions]);

  return (
    <>
      <CardList>
        <AnimatePresence initial={false} mode='popLayout'>
          {transactions.map((item, index) => (
            <LatestTransactionCard key={item} isNewCard={index === 0 && isNewCard} id={item} />
          ))}
        </AnimatePresence>
      </CardList>

      <Button onClick={() => setTransactions((prev) => [Date.now(), ...prev])}>Add transaction</Button>
    </>
  );
};
