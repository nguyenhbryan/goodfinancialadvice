import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./lib/mongodb";
import User from "./models/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password");

        if (!user) { throw new Error("Wrong Email") };

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) { throw new Error("Wrong Password") };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Ensure the session contains all relevant user info from the token
      session.user.id = token.id;
      session.user.coins = token.coins; // Ensure coins is correctly assigned
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user }) {
      // Add user data to token when user signs in
      if (user) {
        console.log("User data in JWT callback:", user);
        token.id = user.id;
        token.name = user.name;
        token.coins = user.coins; // Ensure coins is included in token
      }
      return token;
    },
  },
});
