import Head from "next/head";
import { Provider as AuthProvider } from "next-auth/client";
import { Provider } from "urql";
import { create } from "../lib/urql";

const App = (props) => {
  const { Component, pageProps } = props;
  return (
    <AuthProvider session={pageProps.session}>
      <Provider value={create()}>
        <Head>
          <title>App</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
};
export default App;
