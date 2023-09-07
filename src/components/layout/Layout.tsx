import MainNavBar from "./MainNavBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideOnScroll?: boolean;
}

function Layout({ children, hideOnScroll }: LayoutProps) {
  return (
    <div>
      <MainNavBar hideOnScroll={hideOnScroll} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
