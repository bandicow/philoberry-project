// "use Client";
import classes from "./MainNavBar.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MainNavBar() {
  // const [isSidebarOpen, setIstSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [isSignin, setIsSignin] = useState(false);

  const { data: session, status } = useSession();

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

  // 사이드바 토글
  // const toggleSidebar = () => {
  //   setIstSidebarOpen(!isSidebarOpen);
  // };

  // 로그인
  const SigninHandler = () => {
    signIn();
  };

  // status가 loading이면 true (구조분해 할당)
  const loading = status === "loading";
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 left-0 items-center w-full h-10 px-1 text-white uppercase bg-black border-b-2 border-gray-300 shadow-md z-99">
      {/* 데스크탑 버전 */}
      {!isMobile && (
        <div className="flex items-center justify-between h-full px-4 py-3">
          <Link href="/">
            <div className={classes.logo}>philaberry</div>
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

      {/* 모바일 버전 768 아래 */}
      {/* {isMobile && (
        <Sidebar onToggle={toggleSidebar} sidebarState={isSidebarOpen} />
      )} */}
    </nav>
  );
}

export default MainNavBar;

//////////////////////////////
