'use client';

import { Suspense, useActionState } from 'react';
import {
  loginWithGitHub,
  loginWithGoogle,
  loginWithCredentials,
  type LoginState,
} from '../lib/auth-actions';
import { Button } from '../ui/button';
import { OAuthError } from '../ui/signup/oauth-error';

const initialState: LoginState = {};

export default function SignIn() {
  const [state, formAction, isPending] = useActionState(
    loginWithCredentials,
    initialState,
  );

  return (
    <>
      <div>
        <span>Sign in</span>
      </div>
      {/* Sign in with email */}
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
        <Button type='submit' disabled={isPending}>
          {isPending ? 'Signing in…' : 'Sign in with Email'}
        </Button>
      </form>
      {/* Sign in with GitHub */}
      <form action={loginWithGitHub}>
        <Suspense>
            {/* uses search params - not available to pre-render / needs suspense */}
          <OAuthError provider='github' />
        </Suspense>
        <Button type='submit'>Sign in with GitHub</Button>
      </form>
      {/* Sign in with Google */}
      <form action={loginWithGoogle}>
        <Suspense>
          <OAuthError provider='google' />
        </Suspense>
        <Button type='submit'>Sign in with Google</Button>
      </form>
    </>
  );
}
