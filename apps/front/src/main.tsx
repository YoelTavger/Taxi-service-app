import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import RouterApp from './router';
import apolloClient from './users/apolloClient';
import { ApolloProvider } from '@apollo/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
    <RouterApp />
    </ApolloProvider>
  </StrictMode>
);
