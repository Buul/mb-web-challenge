import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { TemplateMain } from '@/components/Template';
import { Register } from '@/presentation';

const Router: FC = () => (
  <Routes>
    <Route
      path="/"
      element={
        <TemplateMain>
          <Register />
        </TemplateMain>
      }
    />
  </Routes>
);

export default Router;
