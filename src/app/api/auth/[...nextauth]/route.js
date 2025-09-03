import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page
      credentials: {
        username: { label: "Email", type: "Email", placeholder: "Your Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your Password",
        },
      },
      async authorize(credentials, req) {
        // শুধু test করার জন্য static check
        console.log("creditaials", credentials);
        if (
          credentials.username === "testuser" &&
          credentials.password === "1234"
        ) {
          // valid হলে একটা user object return করতে হবে
          return { id: 1, name: "Test User", email: "test@example.com" };
        }

        // invalid হলে অবশ্যই null return করতে হবে
        return null;
      },
    }),
  ],
  secret: "test-secret-key", // env ছাড়া test করার জন্য সরাসরি লিখে দিলাম
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
