import Sidebar from "../../src/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Sidebar />
      <div className="w-full h-full p-1 bg-gray-100 tabletLandscape:pl-48">
        {children}
      </div>
    </div>
  );
}
