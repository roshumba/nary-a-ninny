'use server'

import z from "zod";
import { hash } from "bcrypt";
import prisma from "./prisma";

const validInputSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type SignUpState = {
    error?: string;
}

export async function SignUpWithCredentials(prevState: SignUpState, formData: FormData) {
    const input = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    const validatedInput = validInputSchema.safeParse(input);
    // Handled by UI required attributes
    if (!validatedInput.success) throw new Error('Missing required field.');

    //check for existing user
    const existingUser = await prisma.user.findUnique({
        where: {email: validatedInput.data.email}
    })
    
    if (existingUser && existingUser.email) {
        if (existingUser.password) {
            return {error: 'The email address is already registered. Try signing in.'}
        } else {
            return {error: 'The email address is already registered. If you previously signed up using a social provider (e.g., Google or GitHub), try signing in with that method.'}
        }
    }
    // hash password
    const hashedPW = await hash(validatedInput.data.password, 10);

    // save new user to database
    const newUser = await prisma.user.create({
        data: {
            email: validatedInput.data.email,
            password: hashedPW,
        }
    });

    if (!newUser) {
        console.log('❓SignUpWithCredentials: Failed to add user.');
        throw new Error('Failed to add user.');
    }

    return {}
}