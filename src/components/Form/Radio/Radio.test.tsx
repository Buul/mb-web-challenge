import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect } from 'vitest';

import { Radio, RadioProps } from '.';

const initialProps = {
  value: '',
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

const builder = (props: RadioProps = { ...initialProps }): RadioProps => ({
  ...props,
});

const setup = (props = { radioProps: builder() }) => {
  const { radioProps } = props;

  const renderResult = render(<Radio {...radioProps} />);

  return {
    radioProps,
    ...renderResult,
  };
};

describe('Radio', () => {
  test('should render radio group with initial props', async () => {
    const { getByRole, getByLabelText } = setup({
      radioProps: { ...initialProps },
    });

    const RadioDefault = getByRole('radio', { name: 'Default' });
    const RadioComfortable = getByRole('radio', { name: 'Comfortable' });
    const RadioCompact = getByRole('radio', { name: 'Compact' });
    const labelElement = screen.getByTestId('label-default');

    expect(RadioDefault).toBeInTheDocument();
    expect(RadioComfortable).toBeInTheDocument();
    expect(RadioCompact).toBeInTheDocument();
    expect(RadioDefault).not.toBeChecked();
    expect(RadioComfortable).not.toBeChecked();
    expect(RadioCompact).not.toBeChecked();
    expect(getByLabelText('Default')).toBeInTheDocument();
    expect(getByLabelText('Comfortable')).toBeInTheDocument();
    expect(getByLabelText('Compact')).toBeInTheDocument();
    expect(getByLabelText('Compact')).toBeInTheDocument();
    expect(RadioDefault).toHaveClass(
      'border',
      'border-yellow-500',
      'rounded-full',
      'w-4',
      'h-4'
    );
    expect(labelElement).toHaveClass(
      'text-black',
      'text-sm',
      'leading-none',
      'pl-1'
    );
  });

  test('should render radio with item selected', async () => {
    const user = userEvent.setup();
    const { getByRole } = setup({
      radioProps: { ...initialProps },
    });

    const RadioDefault = getByRole('radio', { name: 'Default' });
    const RadioComfortable = getByRole('radio', { name: 'Comfortable' });
    const RadioCompact = getByRole('radio', { name: 'Compact' });
    await user.click(RadioDefault);
    const indicatorDefault = screen.getByTestId('indicator-default');

    expect(RadioDefault).toBeChecked();
    expect(RadioComfortable).not.toBeChecked();
    expect(RadioCompact).not.toBeChecked();

    await user.click(RadioComfortable);
    expect(RadioDefault).not.toBeChecked();
    expect(RadioComfortable).toBeChecked();
    expect(RadioCompact).not.toBeChecked();
    expect(indicatorDefault).toHaveClass(
      'justify-center',
      'justify-center',
      'w-full',
      'h-full',
      'relative',
      'after:block',
      'after:w-2',
      'after:h-2',
      'after:bg-yellow-500'
    );
  });
});
