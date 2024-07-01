import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import { describe, expect } from 'vitest';

import { Input, InputProps } from '.';

const builder = (props: InputProps = {}): InputProps => ({
  ...props,
});

const setup = (props = { inputProps: builder() }) => {
  const { inputProps } = props;

  const renderResult = render(<Input {...inputProps} />);
  const inputElement = renderResult.getByRole('textbox');

  return {
    inputElement,
    inputProps,
    ...renderResult,
  };
};

describe('Input', () => {
  test('should render input base props', async () => {
    const { inputElement } = setup({
      inputProps: {},
    });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass(
      'bg-white',
      'border',
      'border-black',
      'rounded-md',
      'focus:outline-none',
      'focus:border-2'
    );
  });

  test('should render input disabled', async () => {
    const { inputElement } = setup({
      inputProps: { disabled: true },
    });

    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveClass(
      'bg-gray-300',
      'pointer-events-none',
      'text-gray-500',
      'border-gray-500'
    );
  });

  test('should render input fullWidth', async () => {
    const { inputElement } = setup({
      inputProps: { fullWidth: true },
    });

    expect(inputElement).toHaveClass('w-full');
  });

  test('should render input with label', async () => {
    setup({
      inputProps: { label: 'Nome' },
    });

    const labelElement = screen.getByTestId('label');

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveClass('text-lg', 'mb-1', 'inline-block');
  });

  test('should render input with error message', async () => {
    setup({
      inputProps: { errorMessage: 'Error' },
    });

    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-base', 'mt-1', 'text-red-600');
  });

  test('should render input with mask', async () => {
    const { inputElement } = setup({
      inputProps: { mask: 'cpf' },
    });

    fireEvent.input(inputElement, {
      target: {
        value: '36788116806',
      },
    });

    expect(inputElement).toHaveValue('367.881.168-06');
  });
});
