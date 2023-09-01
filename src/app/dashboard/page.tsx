import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return <div>Dashboard</div>;
};

export default Dashboard;
