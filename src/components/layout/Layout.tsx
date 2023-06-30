import MainNavBar from "./MainNavBar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div>
      <MainNavBar />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
