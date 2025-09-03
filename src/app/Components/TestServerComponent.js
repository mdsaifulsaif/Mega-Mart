import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function TestServerComponent() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1>TestServerComponent</h1>
      {JSON.stringify(session)}
    </div>
  );
}

export default TestServerComponent;
