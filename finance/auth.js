import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
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
      async authorize(Credentials) {
        await connectDB();

        const user = await User.findOne({
          email: Credentials?.email,
        }).select("+password");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          Credentials.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");

        return user;
      },
    }),
  ],
})