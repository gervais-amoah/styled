import { Provider, createClient } from 'urql';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import '@/styles/globals.css';
import { StateContext } from 'lib/context';
import Nav from 'components/Nav';

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Nav />
        <Provider value={client}>
          <Component {...pageProps} />
          {/* FOOTER HERE */}
        </Provider>
      </StateContext>
    </UserProvider>
  );
}
