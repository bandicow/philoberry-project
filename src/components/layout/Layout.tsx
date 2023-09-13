import MainNavBar from "./MainNavBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  hideOnScroll?: boolean;
  className: string;
}

function Layout({ className, children, hideOnScroll }: LayoutProps) {
  return (
    <div className={className}>
      <MainNavBar hideOnScroll={true} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
