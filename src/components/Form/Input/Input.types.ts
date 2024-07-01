import { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { MaskItens } from '@/types/Mask';

import { inputVariant } from './Input';

type InputVariants = VariantProps<typeof inputVariant>;

interface InputVariantProps extends InputVariants {
  errorMessage?: string;
  label?: string;
  mask?: MaskItens;
  fullWidth?: boolean;
  onChange?: (
    e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: FocusEvent<HTMLInputElement> & FocusEvent<HTMLTextAreaElement>
  ) => void;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  InputVariantProps;
