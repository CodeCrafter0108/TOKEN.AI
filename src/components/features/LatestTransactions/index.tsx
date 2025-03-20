'use client';
import Button from '@/components/shared/Button';
import { useState } from 'react';
import { CardList } from './styles';
import { LatestTransactionCard } from './components/LatestTransactionCard';
import { AnimatePresence, motion } from 'framer-motion';
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
            <motion.div
              key={item}
              layout
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              transition={{
                layout: { type: 'spring', stiffness: 300, damping: 30 }
              }}
            >
              <LatestTransactionCard id={item} isNewCard={item === newCard} />
            </motion.div>
          ))}
        </AnimatePresence>
      </CardList>
      {/*TODO remove button */}
      <Button onClick={() => addNewCard()} style={{width: '20px', padding: '0', position: 'absolute', top: '70px', zIndex: '5'}}>+</Button>
    </>
  );
};
