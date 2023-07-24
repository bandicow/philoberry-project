import Layout from "../src/components/layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ProviderWrapper from "./api/Provider/ProviderWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

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
