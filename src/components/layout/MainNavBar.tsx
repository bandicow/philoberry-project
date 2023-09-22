"use client";
import classes from "./MainNavBar.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { NextPage } from "next";

interface navbarScrollProps {
  hideOnScroll?: boolean;
}

const MainNavBar: NextPage<navbarScrollProps> = ({ hideOnScroll = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  const { data: session } = useSession();

  // // 창 크기에 따라 모바일 여부 판단
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
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible =
        prevScrollPos > currentScrollPos || currentScrollPos === 0;

      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    // hideOnScroll prop이 true일 때만 스크롤 이벤트 리스너 등록
    if (hideOnScroll) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // 컴포넌트 언마운트 시에는 항상 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideOnScroll, prevScrollPos, isVisible]);

  // 로그인
  const SigninHandler = () => {
    signIn();
  };

  return (
    <nav
      className={`fixed top-0 left-0 items-center w-full h-10 px-1 text-white uppercase bg-black shadow-md z-[999] transition-all duration-[300ms] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 py-3">
        <Link href="/">
          <div className={classes.logo}>philoberry</div>
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/sale">sale</Link>
            </li>
            <li>
              <Link href="/prismatest">DB테스트</Link>
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
    </nav>
  );
};

export default MainNavBar;
