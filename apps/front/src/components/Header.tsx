import { Outlet } from "react-router-dom";
import Example from "./Dashboard";

export default function Header() {
  return (
    <>
      <Example/>
      <Outlet />
    </>
  );
}
