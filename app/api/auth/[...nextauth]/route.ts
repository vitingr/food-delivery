import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { GoogleAuth } from "@/types/types";

const handler = NextAuth({
  providers: [
    GoogleProvider(<GoogleAuth>{
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ]
})

export {handler as GET, handler as POST}