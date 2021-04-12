import Head from 'next/head';
import { Container } from 'semantic-ui-react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          async
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
        />
        <script
          async
          src="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.js"
        ></script>
      </Head>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  );
};

export default Layout;
