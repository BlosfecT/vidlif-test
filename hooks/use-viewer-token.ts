import { toast } from "sonner";
import { useEffect, useState } from "react";
import {JwtPayload, jwtDecode} from "jwt-decode"
import { createViewerToken } from "@/actions/token";



export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try{
           const viewerToken = await createViewerToken(hostIdentity);
           setToken(viewerToken);
           console.log(viewerToken)
           const decodedToken = jwtDecode(viewerToken) as JwtPayload & {name?: string}
        const name = decodedToken?.name;
        //  const identity = decodedToken.jti;
        const identity = decodedToken.sub;

        if (identity) {
            setIdentity(identity);
        }
        if (name) {
            setName(name);
        }
        } catch {
                toast.error("Something went wrong");
            }
        }


    createToken();
    }, [hostIdentity]);
    return {
        token, 
        name,
        identity,
    };
};

// import { toast } from "sonner";
// import { useEffect, useState } from "react";
// import { JwtPayload, jwtDecode } from "jwt-decode";
// import { createViewerToken } from "@/actions/token";

// /**
//  * Custom hook to manage the viewer token for a LiveKit session.
//  *
//  * @param hostIdentity - The identity of the host.
//  * @returns An object containing the token, name, and identity.
//  */
// export const useViewerToken = (hostIdentity: string) => {
//     const [token, setToken] = useState<string>("");
//     const [name, setName] = useState<string>("");
//     const [identity, setIdentity] = useState<string>("");

//     useEffect(() => {
//         // Function to create and decode the viewer token
//         const createToken = async () => {
//             try {
//                 const viewerToken = await createViewerToken(hostIdentity);
//                 setToken(viewerToken);

//                 // Decode the token to extract name and identity
//                 const decodedToken = jwtDecode<JwtPayload & { name?: string }>(viewerToken);
//                 const name = decodedToken?.name || "";
//                 const identity = decodedToken?.jti || "";

//                 if (identity) {
//                     setIdentity(identity);
//                 }
//                 if (name) {
//                     setName(name);
//                 }
//             } catch (error) {
//                 console.error("Failed to create viewer token:", error);
//                 toast.error("Something went wrong while generating the token.");
//             }
//         };

//         createToken();
//     }, [hostIdentity]);

//     return {
//         token,
//         name,
//         identity,
//     };
// };

