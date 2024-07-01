import { FC, FocusEvent, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { tv } from 'tailwind-variants';

import { MaskItens } from '@/types/Mask';
import { masks } from '@/utils/masks';

import { InputProps } from './Input.types';

export const inputVariant = tv({
  base: 'bg-white border border-black rounded-md focus:outline-none focus:border-2',
  variants: {
    color: {
      primary: 'bg-white',
    },
    size: {
      sm: 'text-base h-10',
      md: 'text-lg h-12',
    },
    error: {
      true: 'border-red-600 focus:border-back-500',
    },
    disabled: {
      true: 'bg-gray-300 pointer-events-none text-gray-500 border-gray-500',
    },
    fullWidth: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1',
    },
  ],
  defaultVariants: {
    size: 'sm',
    color: 'primary',
  },
});

const Input: FC<InputProps> = ({
  errorMessage,
  disabled,
  label,
  name,
  value,
  onChange,
  onBlur,
  id,
  size,
  mask,
  type,
  inputMode,
  autoFocus,
  fullWidth,
  placeholder,
}) => {
  const [maskFormat, setMask] = useState<string>('');

  useEffect(() => {
    if (mask) {
      setMask(masks[mask].mask);
    }
  }, [mask]);

  return (
    <div>
      {!!label && (
        <div>
          <label
            data-testid="label"
            htmlFor={id}
            className="text-lg mb-1 inline-block"
          >
            {label}
          </label>
        </div>
      )}
      <InputMask
        name={name}
        type={type}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={(e: FocusEvent<HTMLInputElement>) => {
          if (onBlur) {
            onBlur(e);
          }
        }}
        autoComplete={value ? 'no' : ''}
        maskPlaceholder=""
        mask={maskFormat as MaskItens}
        aria-label={name}
        inputMode={inputMode}
        autoFocus={autoFocus}
      >
        <input
          className={inputVariant({
            error: !!errorMessage,
            fullWidth,
            size,
            disabled,
          })}
        />
      </InputMask>
      {!!errorMessage && (
        <div
          data-testid="error-message"
          className="text-base mt-1 text-red-600"
        >
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
export default Input;
