import { FC, ReactNode } from 'react';

import { Header } from '@/components/Header';

type Props = {
  children: ReactNode;
};

export const TemplateMain: FC<Props> = ({ children }) => (
  <div>
    <Header />
    <main className="px-5 py-12 md:flex md:justify-center">{children}</main>
  </div>
);
