import { NavLink } from "react-router-dom";
function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" activeClassName="active">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" activeClassName="active">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" activeClassName="active">
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" activeClassName="active">
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;