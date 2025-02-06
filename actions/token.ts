"use server";

import {v4} from "uuid";

import { AccessToken } from "livekit-server-sdk"
import { isBlockedByUser } from "@/lib/block-service"
import { getSelf } from "@/lib/auth-service"
import { getUserById } from "@/lib/user-service"

export const createViewerToken = async (hostIdentity: string) => {
    let self;

    try {
        self = await getSelf();
    } catch {
        const id = v4();
const username = `guest#${Math.floor(Math.random() * 1000)}`;
   self = {id, username};
    }
const host = await getUserById(hostIdentity);
 
if (!host) {
    throw new Error("User not found"); 
}
 const isBlocked = await isBlockedByUser(host.id);

 if (isBlocked) {
    throw new Error("User is blocked");
 }

 const isHost = self.id === host.id;

 const token = new AccessToken(
 process.env.LIVEKIT_API_KEY!,
 process.env.LIVEKIT_API_SECRET!,
{
identity: isHost ? `host-${self.id}` : self.id,
name: self.username,
}
 );
 
 token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
 });
  
return await Promise.resolve(token.toJwt());

};




// "use server";

// import { v4 } from "uuid";
// import { AccessToken } from "livekit-server-sdk";
// import { isBlockedByUser } from "@/lib/block-service";
// import { getSelf } from "@/lib/auth-service";
// import { getUserById } from "@/lib/user-service";

// /**
//  * Creates a viewer token for accessing a LiveKit room.
//  *
//  * @param hostIdentity - The identity of the host.
//  * @returns A promise that resolves to the JWT token.
//  * @throws An error if the host is not found or the user is blocked.
//  */
// export const createViewerToken = async (hostIdentity: string): Promise<string> => {
//     // Retrieve the authenticated user or assign guest credentials
//     let self;
//     try {
//         self = await getSelf();
//     } catch {
//         const id = v4();
//         const username = `guest#${Math.floor(Math.random() * 1000)}`;
//         self = { id, username };
//     }

//     // Fetch the host user details
//     const host = await getUserById(hostIdentity);
//     if (!host) {
//         throw new Error("Host user not found");
//     }

//     // Check if the current user is blocked by the host
//     const isBlocked = await isBlockedByUser(host.id);
//     if (isBlocked) {
//         throw new Error("Access denied: You are blocked by the host");
//     }

//     // Determine if the user is the host
//     const isHost = self.id === host.id;

//     // Create the LiveKit AccessToken
//     const token = new AccessToken(
//         process.env.LIVEKIT_API_KEY!,
//         process.env.LIVEKIT_API_SECRET!,
//         {
//             identity: isHost ? `host-${self.id}` : self.id,
//             name: self.username,
//         }
//     );

//     // Add room-specific grants
//     token.addGrant({
//         room: host.id,
//         roomJoin: true,
//         canPublish: false,
//         canPublishData: true,
//     });

//     // Return the generated JWT token
//     return token.toJwt();
// };
