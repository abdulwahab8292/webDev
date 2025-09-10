import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 shadow-md">
        <ul className="flex items-center justify-center gap-10">
          {/* Sign Up Link */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-gray-200 hover:text-white transition duration-300"
              }
            >
              Sign Up
            </NavLink>
          </li>
          {/* Login Link */}
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-gray-200 hover:text-white transition duration-300"
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
