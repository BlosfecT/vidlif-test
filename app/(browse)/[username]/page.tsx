import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    };
};

const UserPage = async ({
     params
     }: UserPageProps) => {


    const user = await getUserByUsername(params.username);
    if (!user || !user.stream) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);
    
    if (isBlocked) {
        notFound();
    }



    return (
        // <div className="flex flex-col gap-y-4">
        //     <p>Username: {user.username}</p>
        //     <p>User ID: {user.id}</p>
        //     <p>Is following: {`${isFollowing}`}</p>
        //     <p>
        //        is blocked by this user: {`${isBlocked}`} 
        //     </p>
        //     {/* Pass data to the Client Component */}
        //     <Actions userId={user.id} isFollowing={isFollowing} />
        // </div>

      <StreamPlayer 
      user={user}
      stream={user.stream}
      isFollowing={isFollowing}
      />
    );
}

export default UserPage;
