import MainNavBar from "./MainNavBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideOnScroll?: boolean;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <MainNavBar hideOnScroll={true} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
