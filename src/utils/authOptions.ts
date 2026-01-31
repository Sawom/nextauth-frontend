import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // documentation: https://next-auth.js.org/providers/github
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // documentation: https://next-auth.js.org/providers/google
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: user.name,
            email: user.email,
            provider: account?.provider,
          }),
        });
        if (response.ok) {
          console.error(
            "Backend failed to save user, status:",
            response.status,
          );
          return true;
        } else {
          console.error("Backend registration failed");
          return false;
        }
      } catch (error) {
        console.error("Backend Error:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  // to get user info i need to added NEXTAUTH_SECRET from .env file and this secret can be any string
};
