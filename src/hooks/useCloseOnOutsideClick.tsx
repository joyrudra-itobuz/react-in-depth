import { useEffect } from 'react';

export default function useCloseOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    const handleOutsideComponentClick = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        try {
          onOutsideClick();
        } catch (error) {
          console.log(error);
        }
      }
    };

    document.addEventListener('click', handleOutsideComponentClick);
    return () => {
      document.removeEventListener('click', handleOutsideComponentClick);
    };
  }, [ref, onOutsideClick]);
}
