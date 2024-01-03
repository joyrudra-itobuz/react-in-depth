import { InputHTMLAttributes } from 'react';
import './_AnimatedInputLabel.scoped.scss';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export default function AnimatedInputLabel({
  label,
  ...inputProps
}: FormInputProps) {
  return (
    <div className='input-container'>
      <input
        {...inputProps}
        name={inputProps.name}
        type='text'
        className=''
        placeholder=''
      />
      <label htmlFor=''>{label ?? 'Type Here'}</label>
    </div>
  );
}
