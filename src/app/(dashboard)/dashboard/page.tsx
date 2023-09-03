import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return <div>dashboard</div>;
};

export default Dashboard;
