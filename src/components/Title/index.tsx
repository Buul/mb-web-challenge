import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Title: FC<Props> = ({ children }) => (
  <h1 className="text-3xl font-semibold mb-6">{children}</h1>
);
