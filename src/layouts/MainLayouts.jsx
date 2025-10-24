import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayouts() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayouts;
