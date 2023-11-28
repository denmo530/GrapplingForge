import { Footer } from "@/app/(marketing)/_components/Footer";
import { Navbar } from "./_components/Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pt-20 pb-5 px-6 bg-slate-100">{children}</main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
