import userModel from "../../../lib/models/User.model";
import { ConnectDB } from "../../../lib/config/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page
      credentials: {
        email: { label: "Email", type: "Email", placeholder: "Your Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        await ConnectDB();
        const finding = await userModel.findOne({ email: email });
        if (!finding) {
          return NextResponse.json({ msg: "User not exist!" });
        }

        console.log("creditaials", credentials);
        if (email == finding.email && password == finding.password) {
          return {
            name: finding.name,
            email: finding.email,
            role: finding.role,
          };
        }

        return null;
      },
    }),
  ],
  secret: "test-secret-key",
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
