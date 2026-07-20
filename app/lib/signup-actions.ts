'use server';

import z from 'zod';
import { hash } from 'bcrypt';
import prisma from './prisma';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';
import { Role } from '../generated/prisma/enums';
import { redirect } from 'next/navigation';

const validInputSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type SignUpState = {
  error?: string;
};

export async function signUpWithCredentials(
  prevState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  const input = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const validatedInput = validInputSchema.safeParse(input);
  // Handled by UI required attributes
  if (!validatedInput.success) throw new Error('Missing required field.');

  //check for existing user
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedInput.data.email },
  });

  if (existingUser && existingUser.email) {
    if (existingUser.password) {
      return {
        error: 'The email address is already registered. Try signing in.',
      };
    } else {
      return {
        error:
          'The email address is already registered. If you previously signed up using a social provider (e.g., Google or GitHub), try signing in with that method.',
      };
    }
  }
  // hash password
  const hashedPW = await hash(validatedInput.data.password, 10);

  // save new user to database
  const newUser = await prisma.user.create({
    data: {
      email: validatedInput.data.email,
      password: hashedPW,
    },
  });

  if (!newUser) {
    console.log('❓SignUpWithCredentials: Failed to add user.');
    throw new Error('Failed to add user.');
  }

  // sign in user after successful sign up
  try {
    await signIn('credentials', {
      email: validatedInput.data.email,
      password: validatedInput.data.password,
      redirectTo: '/signin/role',
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid Credentials.' };
    }
    throw error;
  }
}

export type RoleSelectionState = {
  error?: string;
};

const validRoleSchema = z
  .enum(['Student', 'Instructor'], {
    message: 'Please select a role.',
  })
  .transform((role) => role.toUpperCase() as Role);

export async function selectUserRole(
  prevState: RoleSelectionState,
  formData: FormData,
): Promise<RoleSelectionState> {
  const roleInput = formData.get('role');

  // validate role selection
  const validatedRole = validRoleSchema.safeParse(roleInput);
  if (!validatedRole.success) return { error: 'Invalid role selected.' };

  // get session data
  const session = await auth();
  if (!session?.user?.email) return { error: 'Unauthorized user.' };

  try {
    // update user record with role
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        role: validatedRole.data,
      },
    });
  } catch (error) {
    console.log('❓SelectUserRole: Failed to update role:', error);
    return { error: 'Failed to select a role.' };
  }

  redirect('/lecture');
}
