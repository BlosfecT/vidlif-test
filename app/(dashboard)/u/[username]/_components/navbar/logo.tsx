import Link from "next/link";
import Image  from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600","700", "800"],
});
export const Logo = () => {
    return(
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75 transition">
   <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
        <Image 
        src="/vidlif.svg"
         alt="vidlif"
         height="52"
         width="52"
         
         />      
         </div>

         <div className={cn(
            "hidden lg:block",
            font.className)}>
        <p className="font-semibold text-lg">
            Vidlif
        </p>
        <p className="text-xs font-semibold">
          Creator Dashboard
        </p>
       </div>

            </div>
       
        </Link>
    );
};