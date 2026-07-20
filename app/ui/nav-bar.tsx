import { Button } from "./button";
import { logout } from "../lib/logout";

export default function NavBar() {
  return (
    <div>
      <h1> Nary a Ninny</h1>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
