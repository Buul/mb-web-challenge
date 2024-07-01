import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@/routes/Router';

const App: FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
