import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Footer from "../src/components/layout/Footer";
import { Mainpage } from "../src/components/Welcome/Mainpage";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <title>PhiloBerry</title>
      <meta name="description" content="PhilaBerry 브랜드 사이트" />
      <link rel="icon" href="/favicon.ico" />
      <Mainpage />
      <Footer />
    </div>
  );
};

export default Home;
