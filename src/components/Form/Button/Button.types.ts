import { ButtonHTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { buttonVariant } from './Button';

type ButtonVariants = VariantProps<typeof buttonVariant>;

interface ButtonVariantProps extends ButtonVariants {
  fullWidth?: boolean;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps;
