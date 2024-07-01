import { Meta, StoryFn } from '@storybook/react';

import { Input as InputComponent, InputProps } from '.';

const meta: Meta = {
  title: '🧩 Components/Form/Input',
  component: InputComponent,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    size: {
      options: ['md', 'sm'],
      control: { type: 'radio' },
    },
    error: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

const argsProps: InputProps = {
  fullWidth: false,
  disabled: false,
  size: 'sm' as string & undefined,
  errorMessage: '',
  placeholder: 'Digite seu Nome',
  label: 'Nome',
};

export default meta;

const Template: StoryFn<InputProps> = args => <InputComponent {...args} />;

export const Default = Template.bind({});

Default.parameters = { options: { showPanel: true } };

Default.args = { ...argsProps };

export const WithMask = Template.bind({});

WithMask.parameters = { options: { showPanel: true } };

WithMask.args = {
  ...argsProps,
  label: 'CPF',
  mask: 'cpf',
  placeholder: 'Digite seu CPF',
};

export const WithError = Template.bind({});

WithError.parameters = { options: { showPanel: true } };

WithError.args = {
  ...argsProps,
  label: 'Telefone',
  mask: 'cel',
  placeholder: 'Digite seu Telefone',
  errorMessage: 'Campo obrigatório',
};
