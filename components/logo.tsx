import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const headingFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.png" alt="Logo" height={30} width={30} />
        <p
          className={cn(
            "text-lg text-neutral-700 pb-1 font-semibold",
            headingFont.className
          )}
        >
          GrapplingForge
        </p>
      </div>
    </Link>
  );
};
