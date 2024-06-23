import '../styles/globals.css';
import { SDKProvider } from '@tma.js/sdk-react';
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { Roboto, Roboto_Mono } from 'next/font/google';
import Head from 'next/head';
import { IntlProvider } from 'next-intl';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

import { ModalProvider } from '../contexts/ModalContext';
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
  const [locale, setLocale] = useState('en'); // Default to 'en' if not set
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      setupMockTelegramEnv();
    }

    if (process.env.NODE_ENV === 'production') {
      // Telegram hook for production
      axios
        .post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
        .then((response) => setIsHashValid(response.status === 200))
        .catch(() => setIsHashValid(false));
    } else {
      // For development, set hash as valid to debug locally
      setIsHashValid(true);
    }

    // Extract language_code from Telegram WebApp and set locale
    try {
      const params = new URLSearchParams(window.Telegram.WebApp.initData);
      const userParam = params.get('user');
      if (userParam) {
        const userObj = JSON.parse(decodeURIComponent(userParam));
        setLocale(userObj.language_code || 'en');
      } else {
        setLocale('en');
        setErrorCode(`No userParam in params: "${params}"`);
      }
    } catch (error) {
      console.error('Error parsing initData:', error);
      setErrorCode(`${error}`);
      setLocale('en');
    }
  }, []);

  useEffect(() => {
    // Fetch the appropriate messages based on the determined locale
    import(`../locales/${locale}/common.json`)
      .then((msgs) => {
        setMessages(msgs.default);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading locale messages:', error);
        setLoading(false);
      });
  }, [locale]);

  if (!isHashValid) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner/component
  }

  const manifestUrl = process.env.NEXT_PUBLIC_MANIFEST_URL;

  return (
    <>
      <Head>
        <style>{`body { font-family: var(${ROBOTO_TTF.variable}), var(${ROBOTO_MONO_TTF.variable}); }`}</style>
      </Head>
      <IntlProvider messages={messages} locale={locale}>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <SDKProvider acceptCustomStyles>
            <UserProvider>
              <ModalProvider>
                <Toaster />
                <p>{`LC: ${locale}`}</p>
                <p>{`Error Code: ${errorCode}`}</p>
                <p>{`Data: ${window.Telegram.WebApp.initData}`}</p>
                <Component {...pageProps} />
              </ModalProvider>
            </UserProvider>
          </SDKProvider>
        </TonConnectUIProvider>
      </IntlProvider>
    </>
  );
}

export default MyApp;
