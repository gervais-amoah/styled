import { Provider, createClient } from 'urql';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import { StateContext } from 'lib/context';
import Nav from 'components/Nav';

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Toaster />
        <Nav />
        <Provider value={client}>
          <Component {...pageProps} />
          {/* FOOTER HERE */}
        </Provider>

        <footer>
          <p>
            Built by Gervais Amoah
            <br /> Inspired by{' '}
            <a
              href="https://developedbyed.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DevelopedByEd
            </a>
          </p>
        </footer>
      </StateContext>
    </UserProvider>
  );
}
