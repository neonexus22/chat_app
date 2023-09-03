import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

const Requests = async () => {
  const session = await getServerSession(authOptions);
  if (!session) return notFound();

  // find ids of people who sent a friend request
  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_request`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;
      const senderParsed = JSON.parse(sender);
      return {
        senderId,
        senderEmail: senderParsed.email,
      };
    })
  );

  return (
    <div className="pt-8">
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          sessionId={session.user.id}
          incomingFriendRequests={incomingFriendRequests}
        />
      </div>
    </div>
  );
};

export default Requests;
