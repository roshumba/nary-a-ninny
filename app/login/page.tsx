import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <>
      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: "/lecture" });
        }}
      >
        <button type='submit'>Signin with GitHub</button>
      </form>
      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: "/lecture" });
        }}
      >
        <button type='submit'>Signin with Google</button>
      </form>
    </>
  );
}
