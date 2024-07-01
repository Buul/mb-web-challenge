/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { RadioProps } from './Radio.types';

const Radio: FC<RadioProps> = ({
  radioOptions,
  defaultValue,
  onValueChange,
  errorMessage,
}) => (
  <>
    <RadioGroup.Root
      className="flex flex-row gap-4"
      aria-label="View density"
      value={defaultValue}
      onValueChange={onValueChange}
    >
      {radioOptions.map(item => (
        <div className="flex items-center" key={item.value}>
          <RadioGroup.Item
            value={item.value}
            id={item.value}
            className="border border-yellow-500 rounded-full w-4 h-4"
          >
            <RadioGroup.Indicator
              data-testid={`indicator-${item.value}`}
              className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-yellow-500"
            />
          </RadioGroup.Item>
          <label
            data-testid={`label-${item.value}`}
            className="text-black text-sm leading-none pl-1"
            htmlFor={item.value}
          >
            {item.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
    {!!errorMessage && (
      <div data-testid="error-message" className="text-base mt-1 text-red-600">
        <span>{errorMessage}</span>
      </div>
    )}
  </>
);

export default Radio;
