import { FC } from 'react';
import { tv } from 'tailwind-variants';

import { ButtonProps } from './Button.types';

export const buttonVariant = tv({
  base: 'font-light bg-yellow-500 text-white rounded-md active:opacity-80 min-w-32 hover:opacity-75 flex items-center justify-center',
  variants: {
    color: {
      primary: 'bg-yellow-500 text-white',
      secondary:
        'bg-white text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white',
    },
    size: {
      sm: 'text-sm h-7',
      md: 'text-lg h-10',
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none text-white',
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

const ButtonComponent: FC<ButtonProps> = ({ fullWidth, ...others }) => (
  <button {...others} className={buttonVariant({ ...others, fullWidth })}>
    {others.children}
  </button>
);

export default ButtonComponent;
