import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="lg:max-w-screen-xl container mx-auto mt-10">
        <Outlet />
      </div>
    </>
  );
}
