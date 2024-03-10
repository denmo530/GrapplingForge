import { Footer } from "@/app/(marketing)/_components/Footer";
import { Navbar } from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen bg-slate-100 overflow-hidden">
      <Navbar />
      <main className="pt-12 pb-5 ">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
