// modify user, session, and JWT types to allow user role verification
import { DefaultSession } from 'next-auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    role: string | null;
  }

  interface Session {
    user: {
      role: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string | null;
  }
}