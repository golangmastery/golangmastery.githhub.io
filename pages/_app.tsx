import '../styles/globals.css';
import '../src/styles/mdx.css'; // Additional styles for MDX content if needed
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/golangmastery.github.io' : '';

  return (
    <>
      <Head>
        <title>Golang Mastery - Learn Golang with Interactive Labs</title>
        <meta name="description" content="Master Golang with our interactive labs and structured learning path. Perfect for beginners and experienced developers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        {isProd && <base href="/golangmastery.github.io/" />}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 