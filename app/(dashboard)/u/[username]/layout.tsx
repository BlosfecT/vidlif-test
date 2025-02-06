import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreatorLayoutProps {
    params: {username: string};
    children: React.ReactNode;
};


const CreatorLayout = async ({
    params,
    children,
}: CreatorLayoutProps) => {
const self = await getSelfByUsername(params.username);
// const self = await getSelfByUsername(await params.username)

if (!self) {
    redirect("/");
}

    return (
        <> 
        <Navbar />
        <div className="flex h-full pt-20">
            <Sidebar /> 
            <Container>
            {children}
            </Container>
       
        </div>
           
        </>
    );
}

// const CreatorLayout = async ({
//     params,
//     children,
// }: CreatorLayoutProps) => {
//     // Ensure params is directly accessed without treating it as asynchronous
//     const { username } = params;

//     const self = await getSelfByUsername(username);

//     if (!self) {
//         redirect("/");
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="flex h-full pt-20">
//                 <Sidebar />
//                 <Container>
//                     {children}
//                 </Container>
//             </div>
//         </>
//     );
// };


export default CreatorLayout;