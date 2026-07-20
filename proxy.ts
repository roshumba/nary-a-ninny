import { auth } from '@/auth';

export const proxy = auth((req) => {
  const session = req.auth;
  const needsRole = session != null && !session.user.role;
  if (needsRole && req.nextUrl.pathname !== '/signup/role') {
    return Response.redirect(new URL('/signup/role', req.url));
  }
});
