// import NextAuth from "next-auth/next";
// import { config } from "auth";

// const handler = NextAuth(config);
// export { handler as GET, handler as POST };
 
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions  = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string,
      }),
    ],
  };
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
