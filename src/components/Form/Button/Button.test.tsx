import { fireEvent, render } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import { Button, ButtonProps } from '.';

const builder = (props: ButtonProps = {}): ButtonProps => ({
  ...props,
});

const setup = (props = { buttonProps: builder() }) => {
  const { buttonProps } = props;
  const onClick = vi.fn();

  const renderResult = render(<Button {...buttonProps} onClick={onClick} />);
  const buttonElement = renderResult.getByRole('button');

  return {
    buttonElement,
    buttonProps,
    onClick,
    ...renderResult,
  };
};

describe('Button', () => {
  test('should render button base props', async () => {
    const label = 'Base';
    const { getByText, container } = setup({
      buttonProps: { children: label },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveProperty('type', 'submit');
    expect(container.firstChild).toHaveClass('h-7', 'text-sm');
    expect(container.firstChild).toHaveClass('bg-yellow-500', 'text-white');
    expect(container.firstChild).toHaveClass(
      'font-light',
      'rounded-md',
      'min-w-32',
      'px-3',
      'active:opacity-80'
    );
  });

  test('should render with primary props', async () => {
    const label = 'Primary';
    const { getByText, container } = setup({
      buttonProps: { children: label },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-yellow-500', 'text-white');
  });

  test('should render with secondary props', async () => {
    const label = 'Secondary';
    const { getByText, container } = setup({
      buttonProps: { children: label, color: 'secondary' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      'bg-white',
      'text-yellow-500',
      'border',
      'border-yellow-500'
    );
  });

  test('should render with size props SM', async () => {
    const label = 'SM Button';
    const { getByText, container } = setup({
      buttonProps: { children: label, size: 'sm' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('h-7', 'text-sm');
  });

  test('should render with size props MD', async () => {
    const label = 'MD Button';
    const { getByText, container } = setup({
      buttonProps: { children: label, size: 'md' },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('h-10', 'text-lg');
  });

  test('should render with primary props and hover', async () => {
    const label = 'Testing button primary hover';
    const { getByText, buttonElement, container } = setup({
      buttonProps: { children: label, color: 'primary' },
    });

    fireEvent.mouseEnter(buttonElement);

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('hover:opacity-75');
  });

  test('should render with secondary props and hover', async () => {
    const label = 'Testing button secondary hover';
    const { getByText, buttonElement, container } = setup({
      buttonProps: { children: label, color: 'secondary' },
    });

    fireEvent.mouseEnter(buttonElement);

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass(
      'hover:bg-yellow-500',
      'hover:text-white'
    );
  });

  test('should render with disabled props', async () => {
    const label = 'Disabled button';
    const { getByText, container } = setup({
      buttonProps: { children: label, disabled: true },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toBeDisabled();
    expect(container.firstChild).toHaveClass(
      'opacity-50',
      'text-white',
      'pointer-events-none',
      'bg-gray-500'
    );
  });

  test('should render with fullWidth props', async () => {
    const label = 'FullWidth button';
    const { getByText, container } = setup({
      buttonProps: { children: label, fullWidth: true },
    });

    expect(getByText(label)).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('w-full');
  });

  test('does not trigger onClick handler when disabled', () => {
    const label = 'Testing button disabled';
    const { buttonElement, onClick } = setup({
      buttonProps: { children: label, disabled: true },
    });
    fireEvent.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('triggers onBlur handler', () => {
    const label = 'Testing button onBlur';
    const blur = vi.fn();
    const { buttonElement } = setup({
      buttonProps: { children: label, onBlur: blur },
    });

    fireEvent.blur(buttonElement);
    expect(blur).toHaveBeenCalled();
  });

  it('should call onClick when the button is clicked', () => {
    const label = 'Testing button onClick';
    const { buttonElement, onClick } = setup({
      buttonProps: { children: label },
    });

    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
