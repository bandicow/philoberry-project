import Loading from "@/app/loading";
import MainNavBar from "./MainNavBar";
import { ReactNode, Suspense } from "react";

interface LayoutProps {
  children: ReactNode;
  hideOnScroll?: boolean;
}

function Layout({ children }: LayoutProps) {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <MainNavBar hideOnScroll={true} />
        <main>{children}</main>
      </div>
    </Suspense>
  );
}

export default Layout;
