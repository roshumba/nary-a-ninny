'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  loginWithGitHub,
  loginWithGoogle,
  loginWithCredentials,
  type LoginState,
} from '../lib/auth-actions';

const initialState: LoginState = {};

export default function SignIn() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(
    loginWithCredentials,
    initialState,
  );
  const error = searchParams.get('error');

  return (
    <>
      <form action={formAction}>
        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            placeholder='sage@gmail.com'
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input type='password' name='password' placeholder='•••••' required />
        </div>
        {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
        <button type='submit' disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign in with Email'}
        </button>
      </form>

      <form action={loginWithGitHub}>
        {error === 'github' && (
          <p style={{ color: 'red' }}>Unable to sign in with GitHub.</p>
        )}
        <button type='submit'>Sign in with GitHub</button>
      </form>

      <form action={loginWithGoogle}>
        {error === 'google' && (
          <p style={{ color: 'red' }}>Unable to sign in with Google.</p>
        )}
        <button type='submit'>Sign in with Google</button>
      </form>
    </>
  );
}
