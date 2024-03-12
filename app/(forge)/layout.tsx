import { Footer } from "@/app/(marketing)/_components/Footer";
import { Header } from "./dashboard/_components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="py-12 min-h-screen flex flex-col items-center relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
