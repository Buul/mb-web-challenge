import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Radio as RadioComponent, RadioProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Form/Radio',
  component: RadioComponent,
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: RadioProps = {
  value: '',
  defaultValue: 'default',
  radioOptions: [
    {
      value: 'default',
      label: 'Default',
    },
    {
      value: 'comfortable',
      label: 'Comfortable',
    },
    {
      value: 'compact',
      label: 'Compact',
    },
  ],
};

export default meta;

const Template: StoryFn<RadioProps> = args => {
  const [value, setValue] = useState('');

  const handleChange = (param: string) => {
    setValue(param);
  };

  return (
    <RadioComponent {...args} value={value} onValueChange={handleChange} />
  );
};
export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };
