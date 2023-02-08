import { AppProps } from 'next/app';
import React from 'react';

import "../src/styles/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
