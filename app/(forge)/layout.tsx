import { Footer } from "@/app/(marketing)/_components/Footer";
import { Header } from "@/components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen flex flex-col items-center relative">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
