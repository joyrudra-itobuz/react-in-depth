import { HTMLAttributes, useRef } from 'react';
import useCloseOnClickOutside from '../../../hooks/useCloseOnOutsideClick';

interface CloseOnClickOutsideProps extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element;
  onOutsideClick: () => void;
}

export default function CloseOutsideClick({
  children,
  onOutsideClick,
  ...divProps
}: CloseOnClickOutsideProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useCloseOnClickOutside(wrapperRef, onOutsideClick);

  return (
    <div ref={wrapperRef} {...divProps}>
      {children}
    </div>
  );
}
