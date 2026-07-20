'use client'
import { Button } from "@/app/ui/button";
import { useActionState } from "react";
import { SelectUserRole, type RoleSelectionState } from "@/app/lib/signup-actions";

const initialState: RoleSelectionState = {}

export default function Lecture() {
  const [state, formAction, isPending] = useActionState(SelectUserRole, initialState);
  return (
    <>
      <form action={formAction}>
        <span>
          <p>Select your role:</p>
        </span>
        <div>
          <select name='role'>
            <option value= '' disabled>Select a role</option>
            <option>Student</option>
            <option>Instructor</option>
          </select>
        </div>
        {state.error && <p style={{color: 'red'}}>Error selecting role. Try again.</p>}
        <Button type='submit'>{isPending ? 'Submitting...' : 'Submit'}</Button>
      </form>
    </>
  );
}
