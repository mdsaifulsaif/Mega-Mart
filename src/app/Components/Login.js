"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
function Login() {
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}

export default Login;
