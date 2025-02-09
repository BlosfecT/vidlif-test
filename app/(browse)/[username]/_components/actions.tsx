"use client";
import  {onFollow, onUnfollow} from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock  } from "@/actions/block";





interface ActionsProps {
    isFollowing: boolean;
    userId: string;
};


export const Actions = ({
isFollowing,
userId,
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
   
    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
     .then((data) =>   toast.success(`You are now following ${data.following.username}`))
       .catch(() => toast.error ("something went wrong"));
        });
       
    }; 


    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)

            .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
       .catch(() => toast.error("something went wrong"));
        });
       
    }; 
   const onClick = () => {
    if (isFollowing) {
        handleUnFollow();
    } else {
        handleFollow();
    }
   }
   const handleBlock = () => {
    startTransition(() => {
        onUnblock(userId)
        .then((data) => toast.success(`You have blocked the user ${data.blocked.username}`))
       .catch(() => toast.error("Something went wrong"));
    });
};

  
    return(
        <>
        <Button 
        disabled={isPending} 
        onClick={onClick} 
        variant="primary">
  {isFollowing ? "Unfollow" : "Follow"}
        </Button>
        <Button onClick={handleBlock} disabled={isPending}>
           Block
        </Button>

        </>
    );
};