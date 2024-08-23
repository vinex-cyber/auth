import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-center justify-center">
      <div className={cn("text-3xl font-semibold", font.className)}>
        <Image
          height={100}
          width={100}
          src="/logo.png"
          alt={"logo"}
          className="rounded-full"
        />
      </div>
      <span className="text-3xl font-semibold drop-shadow-lg">ASA</span>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
