import Sidebar from "../../src/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="">{children}</div>
    </div>
  );
}
