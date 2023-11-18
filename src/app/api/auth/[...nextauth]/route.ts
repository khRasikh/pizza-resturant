// import NextAuth from "next-auth/next";
// import { config } from "auth";

// const handler = NextAuth(config);
// export { handler as GET, handler as POST };
 
import { authOptions } from "@/components/auth/auth";
import NextAuth from "next-auth/next"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
