import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Wrapper, Header, Indicator, ContentWrapper, Content } from './styles';
import { ButtonVariants } from '../Button/types';
import { RuleSet } from 'styled-components';

interface AccordionProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  initialState?: boolean;
  styles?: RuleSet<object>;
}

export const Accordion = ({ title, children, initialState = true, styles }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const toggleAccordion = (): void => setIsOpen((prev) => !prev);

  return (
    <Wrapper $styles={styles}>
      <Header onClick={toggleAccordion} variants={ButtonVariants.CLEAR}>
        {title}
        <Indicator $isOpen={isOpen} />
      </Header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <ContentWrapper
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Content>{children}</Content>
          </ContentWrapper>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};
