// "use Client";
import classes from "./MainNavBar.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { NextPage } from "next";

interface navbarScrollProps {
  hideOnScroll?: boolean;
}

const MainNavBar: NextPage<navbarScrollProps> = ({ hideOnScroll }) => {
  // const [isSidebarOpen, setIstSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [isSignin, setIsSignin] = useState(false);

  const { data: session } = useSession();

  // 창 크기에 따라 모바일 여부 판단
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 980);
    };
    // 윈도우 창 크기 변경 이벤트에 대한 리스너 추가
    window.addEventListener("resize", handleResize);
    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  //특정 페이지 네비바 숨기기
  useEffect(() => {
    if (hideOnScroll) {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        const visible = prevScrollPos > currentScrollPos;

        setIsVisible(visible);
        setPrevScrollPos(currentScrollPos);

        window.addEventListener("scroll", handleScroll);
      };
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [hideOnScroll, prevScrollPos]);

  // 로그인
  const SigninHandler = () => {
    signIn();
  };

  return (
    <nav
      className="fixed top-0 left-0 items-center w-full h-10 px-1 text-white uppercase bg-black shadow-md z-99"
      style={{ top: isVisible ? "0" : "-50px", transition: "top 0.3s" }}
    >
      {/* 데스크탑 버전 */}
      {!isMobile && (
        <div className="flex items-center justify-between h-full px-4 py-3">
          <Link href="/">
            <div className={classes.logo}>philoaberry</div>
          </Link>

          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/sale">sale</Link>
              </li>
              <li>
                {!session ? (
                  <button onClick={SigninHandler}>로그인</button>
                ) : (
                  <Link href="/admin">관리자 설정</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default MainNavBar;
