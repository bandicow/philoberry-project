import type { NextPage } from "next";
import Footer from "../src/components/layout/Footer";
import Mainpage from "../src/components/Welcome/MainPage";

const Home: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_BUILDING_IMAGE);

  return (
    <div className={"p-0 m-0"}>
      <title>PhiloBerry</title>
      <meta name="description" content="PhilaBerry 브랜드 사이트" />
      <link rel="icon" href="/favicon.ico" />
      <Mainpage />
      <Footer />
    </div>
  );
};

export default Home;
