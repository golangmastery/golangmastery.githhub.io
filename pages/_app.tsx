import '../styles/globals.css';
import '../src/styles/mdx.css'; // Additional styles for MDX content if needed
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Golang Mastery - Learn Golang with Interactive Labs</title>
        <meta name="description" content="Master Golang with our interactive labs and structured learning path. Perfect for beginners and experienced developers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 