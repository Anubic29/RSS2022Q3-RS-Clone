import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './routing/Routing';
import { AuthProvider } from './contexts';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AuthProvider>
    <Routing />
  </AuthProvider>
);
