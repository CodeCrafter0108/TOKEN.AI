import { AnimatePresence } from 'framer-motion';
import { memo, ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';
import { RuleSet } from 'styled-components';
import { Wrapper, Overlay } from './styles';
import { useModal } from './hooks/useModal';
import ClickAwayListener from './components/ClickAwayListener';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  styles?: RuleSet<object>;
}

const Modal= ({ isOpen, children, handleClose, styles }: ModalProps): ReactPortal | null => {
  const { modalRef } = useModal(isOpen, handleClose);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <ClickAwayListener onClickAway={handleClose}>
            <Wrapper
              ref={modalRef}
              $styles={styles}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              tabIndex={-1}
            >
              {children}
            </Wrapper>
          </ClickAwayListener>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default memo(Modal);
