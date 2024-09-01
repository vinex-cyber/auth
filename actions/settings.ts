"use server";

import * as z from "zod";

import { unstable_update } from "@/auth";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { settingsSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // update email
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification Email Sent!" };
  }
  // update password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatches = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatches) {
      return { error: "Incorrect password!" };
    }

    const hashPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashPassword;
    values.newPassword = undefined;
  }

  // await db.user.update({
  //   where: {
  //     id: dbUser.id,
  //   },
  //   data: {
  //     ...values,
  //   },
  // });

  const updateUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updateUser.name,
      email: updateUser.email,
      role: updateUser.role,
      isTwoFactorEnabled: updateUser.isTwoFactorEnabled,
    },
  });
  return { success: "Settings updated!" };
};
