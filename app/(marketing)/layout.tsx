import readUserSession from "@/actions/session";
import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";
import { redirect } from "next/navigation";

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data, error } = await readUserSession();
  if (data?.session) redirect("/dashboard");

  return (
    <div className="w-screen">
      <Navbar />
      <main className="pt-40 bg-slate-100 min-h-screen flex flex-col items-center relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
