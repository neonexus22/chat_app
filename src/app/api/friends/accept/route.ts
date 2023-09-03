import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToAdd } = z
      .object({
        id: z.string(),
      })
      .parse(body);

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // verify both users are not already friends;
    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriends) {
      return new NextResponse("Already friends", { status: 400 });
    }

    // verify if the user actually had an incoming request
    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_request`,
      idToAdd
    );

    if (!hasFriendRequest) {
      return new NextResponse("No friend request", { status: 400 });
    }

    // add the user as my friend
    await db.sadd(`user:${session.user.id}:friends`, idToAdd);
    // add myself to the request as a friend
    await db.sadd(`user:${idToAdd}:friends`, session.user.id);
    // remove the pending friend request
    await db.srem(`user:${session.user.id}:incoming_friend_request`, idToAdd);

    return new NextResponse("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request payload", { status: 422 });
    }

    return new NextResponse("Invalid request", { status: 400 });
  }
}
