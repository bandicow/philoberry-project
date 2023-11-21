import Sidebar from "../../src/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] w-full">
      <Sidebar />
      <div className="w-full min-h-full p-1tabletLandscape:pl-72">
        {children}
      </div>
    </div>
  );
}
