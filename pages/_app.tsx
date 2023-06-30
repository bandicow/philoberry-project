import Layout from "../src/components/layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ProviderWrapper from "./api/Provider/ProviderWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProviderWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProviderWrapper>
  );
}

export default MyApp;
