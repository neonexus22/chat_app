import AddFriendButton from "@/components/AddFriendButton";
import { FC } from "react";

const AddFriend: FC = () => {
  return (
    <main>
      <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
      <AddFriendButton />
    </main>
  );
};

export default AddFriend;
