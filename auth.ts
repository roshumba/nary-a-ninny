import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import prisma from './app/lib/prisma';
import { z } from 'zod';
import { compare } from 'bcrypt';

const credentialSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {
        //   type: 'email',
        //   label: 'Email',
        //   placeholder: 'sage@gmail.com',
        },
        password: {
        //   type: 'password',
        //   label: 'Password',
        //   placeholder: '*****',
        },
      },
      authorize: async (credentials) => {

        // validate user input
        const validatedCredentials = credentialSchema.safeParse(credentials);
        if (!validatedCredentials.success) return null;

        const { email, password } = validatedCredentials.data;

        // check for existing user
        const dbUser = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!dbUser || !dbUser.password) return null;

        // compare current password with db password
        const dbHash = dbUser.password;

        const isValid = await compare(password, dbHash);

        if (!isValid) {
          throw new Error('Invalid credentials.');
        }

        // _ destructures password into a new variable
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...user } = dbUser;

        // user credentials successfully verified
        // return user object with their profile data
        return user;
      },
    }),
  ],
  pages: { signIn: '/login' },
});
