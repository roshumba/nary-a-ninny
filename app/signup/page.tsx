'use client';

import { Button } from '../ui/button';
import { useActionState } from 'react';
import { signUpWithCredentials, type SignUpState } from '../lib/signup-actions';

const initialState: SignUpState = {};

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(signUpWithCredentials, initialState)
  return (
    <>
      <div className='mx-auto flex flex-col max-w-m shrink-0 bg-white p-10 rounded-lg shadow-lg items-center outline'>
        <span className='text-xl mb-2'>Sign Up</span>
        <p className='text-gray-500 mb-4'>Register to use Nary a Ninny</p>
      {/* Sign up with email */}
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
        <Button>{isPending ? 'Signing up...' : 'Sign up with Email'}</Button>
      </form>
      {/* Sign in with GitHub */}
      <form>
        <Button type='submit'>Sign up with GitHub</Button>
      </form>
      {/* Sign in with Google */}
      <form>
        <Button type='submit'>Sign up with Google</Button>
      </form>
      </div>
    </>
  );
}
