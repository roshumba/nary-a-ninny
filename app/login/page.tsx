import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <>
      <form
        action={async (formData: FormData) => {
          'use server';
        //! add error handling
          await signIn(
            'credentials',
            {
              email: formData.get('email'),
              password: formData.get('password'),
            },
            { redirectTo: '/lecture' },
          );
        }}
      >
        <div>
          <label>Email</label>
          <input type='email' name='email' placeholder='sage@gmail.com' required />
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' placeholder='•••••' required />
        </div>
        <button type='submit'>Signin with Email</button>
      </form>

      <form
        action={async () => {
          'use server';
          await signIn('github', { redirectTo: '/lecture' });
        }}
      >
        <button type='submit'>Signin with GitHub</button>
      </form>

      <form
        action={async () => {
          'use server';
          await signIn('google', { redirectTo: '/lecture' });
        }}
      >
        <button type='submit'>Signin with Google</button>
      </form>
    </>
  );
}
