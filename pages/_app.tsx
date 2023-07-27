import Layout from "../src/components/layout/Layout";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import ProviderWrapper from "./api/Provider/ProviderWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Sidebar from "../src/components/layout/Sidebar";
import { useRouter } from "next/router";

//Next.js가 자동으로 페이지에 추가하는 CSS를 사용하지 않도록 설정하는 것
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin");

  if (isAdminPage) {
    console.log(Component.name);
    return (
      <ProviderWrapper>
        <div className="flex">
          <Sidebar />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </ProviderWrapper>
    );
  }
  console.log(Component.name);

  return (
    <ProviderWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProviderWrapper>
  );
}

export default MyApp;
