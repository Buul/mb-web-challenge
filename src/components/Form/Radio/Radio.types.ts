import {
  RadioGroupIndicatorProps,
  RadioGroupItemProps,
  RadioGroupProps,
} from '@radix-ui/react-radio-group';

export type Direction = 'row' | 'column';

export type RadioItem = { value: string; label: string };

export type RadioProps = RadioGroupIndicatorProps &
  RadioGroupItemProps &
  RadioGroupProps & {
    radioOptions: RadioItem[];
    errorMessage?: string;
  };
