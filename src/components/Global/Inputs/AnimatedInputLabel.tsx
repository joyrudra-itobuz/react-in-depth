import { InputHTMLAttributes, useId } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import './_AnimatedInputLabel.scoped.scss';

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

export default function AnimatedInputLabel({
  label,
  ...inputProps
}: FormInputProps) {
  const id = useId();
  const { register, control } = useFormContext();
  const { fieldState } = useController({
    control,
    name: inputProps.name,
  });

  return (
    <div>
      <div className='input-container'>
        <input
          {...inputProps}
          {...register(inputProps.name)}
          name={inputProps.name}
          placeholder=''
          autoComplete='on'
          id={id}
        />
        <label
          htmlFor={id}
          className='bg-slate-300 text-black dark:bg-[rgb(29,29,29)]  dark:text-white'
        >
          {label ?? 'Type Here'}
        </label>
      </div>
      {fieldState.error?.message && (
        <p className='text-red-500 '>{fieldState.error?.message}</p>
      )}
    </div>
  );
}
