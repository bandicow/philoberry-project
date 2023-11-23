"use client";
import classes from "./MainNavBar.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { usePathname } from "next/navigation";

interface navbarScrollProps {
  hideOnScroll?: boolean;
}

const MainNavBar: NextPage<navbarScrollProps> = ({ hideOnScroll = false }) => {
  const pathname = usePathname();
  const [currPath, setCurrPath] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const NAVBAR_HEIGHT = 200;

  const { data: session, status } = useSession();
  const loading = status === "loading";

  //페이지 네비바 숨기기
  useEffect(() => {
    const handleScroll = () => {
      setCurrPath(pathname ? pathname : "");

      const currentScrollPos = window.scrollY;
      const visible =
        prevScrollPos > currentScrollPos || currentScrollPos <= NAVBAR_HEIGHT;

      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    // hideOnScroll prop이 true일 때만 스크롤 이벤트 리스너 등록
    if (hideOnScroll && !pathname?.startsWith("/admin")) {
      window.addEventListener("scroll", handleScroll);
    }

    // '/admin' 경로일 경우 항상 네비게이션 바가 보이도록 함
    if (pathname?.startsWith("/admin")) {
      setIsVisible(true);
    }

    return () => {
      // 컴포넌트 언마운트 시에는 항상 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideOnScroll, prevScrollPos, pathname]);

  return (
    <nav
      className={`sticky top-0 left-0 items-center w-full h-10 px-1 text-white uppercase bg-black shadow-md z-[999] transition-all duration-[300ms] ${
        isVisible
          ? "transform-none opacity-100"
          : "transform -translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center justify-between h-full px-4 py-3">
        <Link href="/">
          <div className={classes.logo}>philoberry</div>
        </Link>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/sale">제품</Link>
            </li>
            <li>
              <Link href="/notices">공지</Link>
            </li>
            <li>
              {!loading &&
                (!session ? (
                  <Link href="/login">로그인</Link>
                ) : (
                  <Link href="/admin">관리자 설정</Link>
                ))}
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  );
};

export default MainNavBar;
