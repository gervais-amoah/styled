import { Provider, createClient } from 'urql';

import '@/styles/globals.css';
import { StateContext } from 'lib/context';
import Nav from 'components/Nav';

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
        {/* FOOTER HERE */}
      </Provider>
    </StateContext>
  );
}
