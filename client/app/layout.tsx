import Layout from "../src/components/layout/Layout";
import "../styles/globals.css";
import ProviderWrapper from "./ProviderWrapper";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/tailwind.css";
import { Metadata } from "next";

//Next.js가 자동으로 페이지에 추가하는 CSS를 사용하지 않도록 설정하는 것
// config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.philoberry.com"),

  title: "Philoberry - 자체 제작 브랜드의 제품 판매 & 아티스트와의 협업",
  description:
    "Philoberry는 자체 제작 브랜드의 제품 판매와 아티스트와의 협업을 통해 새로운 문화를 만들어가는 브랜드입니다.",
  keywords:
    "Philoberry, 휠로베리, 휠로베리코리아, 휠로베리코리아주식회사 , 브랜드 , 제품 판매, 아티스트 협업, 갤러리, 전시, 무명 아티스트, 인스타 문의 , 작가 , 작품, 작품 판매, 작품 전시, 작품 갤러리",
  themeColor: "black",
  robots: "index, follow",

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://philoberry.com",
    title: "Philoberry - 자체 제작 브랜드의 제품 판매 & 아티스트와의 협업",
    description:
      "Philoberry는 자체 제작 브랜드의 제품 판매와 아티스트와의 협업을 통해 새로운 문화를 만들어가는 브랜드입니다.",
    siteName: "Philoberry",
    images: [
      {
        url: "https://philoberry.com/images/35mm_logo.png",
        width: 800,
        height: 600,
        alt: "Philoberry",
      },
    ],
  },
  twitter: {
    site: "@philoberry",
    siteId: "@philoberry",
    creator: "@philoberry",
    creatorId: "@philoberry",
    title: "Philoberry - 자체 제작 브랜드의 제품 판매 & 아티스트와의 협업",
    description:
      "Philoberry는 자체 제작 브랜드의 제품 판매와 아티스트와의 협업을 통해 새로운 문화를 만들어가는 브랜드입니다.",
    images: "https://philoberry.com/images/35mm_logo.png",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ProviderWrapper>
          <Layout>{children}</Layout>
        </ProviderWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
