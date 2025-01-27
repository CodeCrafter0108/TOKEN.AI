import { useBodyLock } from '@/hooks/useBodyLock';
import { useEscModalClose } from '@/hooks/useEscModalClose';
import { RefObject, useEffect, useRef } from 'react';

export const useModal = (isOpen: boolean, handleClose: () => void): { modalRef: RefObject<HTMLDivElement | null> } => {
  useBodyLock(isOpen);
  useEscModalClose(handleClose);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      const modalElement = modalRef.current;
      const getFocusableElements = () => {
        if (!modalElement) return [];
        return Array.from(
          modalElement.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
      };

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 2];

      if (modalElement) {
        modalElement.focus();
      }
      const handleTabKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKeyPress);

      return () => {
        document.removeEventListener('keydown', handleTabKeyPress);
      };
    }
  }, [isOpen]);

  return { modalRef };
};
