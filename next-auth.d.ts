// next-auth.d.ts
import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

// declare type ExtendedUser = DefaultSession["user"] & {
//   role: UserRole;
// };

// declare module "next-auth" {
//   interface Session {
//     role: ExtendedUser;
//   }
// }
