import Sidebar from "../../src/components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Sidebar />
      <div className="w-full p-1 bg-gray-100 sm:pl-48">{children}</div>
    </div>
  );
}
