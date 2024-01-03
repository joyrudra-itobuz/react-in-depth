import { ButtonHTMLAttributes } from 'react';
import './_SubmitButton.scoped.scss';

export default function SubmitButton({
  ...buttonProps
}: Readonly<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...buttonProps}
      className={'submit-popup-button ' + buttonProps.className}
    ></button>
  );
}
