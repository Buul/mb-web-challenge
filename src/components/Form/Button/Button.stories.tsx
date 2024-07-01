import { Meta, StoryFn } from '@storybook/react';

import { Button as ButtonComponent, ButtonProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Form/Button',
  component: ButtonComponent,
  argTypes: {
    fullWidth: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    size: {
      options: ['md', 'sm'],
      control: { type: 'radio' },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: ButtonProps = {
  size: 'sm',
  fullWidth: false,
  disabled: false,
};

export default meta;

const Template: StoryFn<ButtonProps> = args => (
  <ButtonComponent {...args}>{args.children}</ButtonComponent>
);

export const Primary = Template.bind({});

Primary.parameters = { options: { showPanel: true } };

Primary.args = { ...argsProps, color: 'primary', children: 'Primary' };

export const Secondary = Template.bind({});

Secondary.parameters = { options: { showPanel: true } };

Secondary.args = { ...argsProps, color: 'secondary', children: 'Secondary' };
