import { ReactElement } from 'react';
import {
  cleanup,
  render,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options: RenderOptions): RenderResult =>
  render(ui, {
    wrapper: ({ children }) => <> {children}</>,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render, userEvent };
