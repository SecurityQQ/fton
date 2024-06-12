import '../styles/globals.css';
import { SDKProvider } from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { Roboto, Roboto_Mono } from 'next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { UserProvider } from '../contexts/UserContext';
import { setupMockTelegramEnv } from '../lib/mockEnv'; // Ensure the path is correct

const ROBOTO_TTF = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  subsets: ['latin'], // Specify the subset(s) you need
});

const ROBOTO_MONO_TTF = Roboto_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
  subsets: ['latin'], // Specify the subset(s) you need
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isHashValid, setIsHashValid] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      setupMockTelegramEnv();
    }

    if (process.env.NODE_ENV === 'production') {
      // telegram hook for production
      axios
        .post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
        .then((response) => setIsHashValid(response.status === 200))
        .catch(() => setIsHashValid(false));
    } else {
      // For development, set hash as valid to debug locally
      setIsHashValid(true);
    }
  }, []);

  if (!isHashValid) {
    return null;
  }

  const manifestUrl = 'https://fton.vercel.app/tonconnect-manifest.json';

  return (
    <>
      <Head>
        <style>{`body { font-family: var(${ROBOTO_TTF.variable}), var(${ROBOTO_MONO_TTF.variable}); }`}</style>
      </Head>
      <body className={`${ROBOTO_TTF.variable} ${ROBOTO_MONO_TTF.variable}`}>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <SDKProvider acceptCustomStyles>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </SDKProvider>
        </TonConnectUIProvider>
      </body>
    </>
  );
}

export default MyApp;
