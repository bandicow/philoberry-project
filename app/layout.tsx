import Layout from "../src/components/layout/Layout";
import "../styles/globals.css";
import ProviderWrapper from "./api/Provider/ProviderWrapper";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

//Next.js가 자동으로 페이지에 추가하는 CSS를 사용하지 않도록 설정하는 것
// config.autoAddCss = false;

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ProviderWrapper>
          <Layout className={"h-full w-full"}>{children}</Layout>
        </ProviderWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
