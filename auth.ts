import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { prisma } from "@/app/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt",
    },

    providers: [
        Credentials({
            name: "credentials",

            credentials: {
                login: {
                    label: "Login",
                    type: "text",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (!credentials?.login || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        login: credentials.login as string,
                    },
                });

                if (!user) {
                    return null;
                }

                const validPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!validPassword) {
                    return null;
                }

                return {
                    id: String(user.id),
                    name: user.login,
                    role: user.role,
                };
            },
        }),
    ],

    pages: {
        signIn: "/admin/login",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as "ADMIN" | "USER";
            }

            return session;
        },
    },
});