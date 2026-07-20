'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export type LoginState = {
  error?: string;
};

export async function loginWithCredentials(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: '/lecture',
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid Credentials.' };
    }
    throw error;
  }
}

export async function loginWithGitHub() {
  try {
    await signIn('github', { redirectTo: '/lecture' });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect('/login?error=github');
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  try {
    await signIn('google', { redirectTo: '/lecture' });
  } catch (error) {
    if (error instanceof AuthError) {
      return redirect('/login?error=google');
    }
    throw error;
  }
}
