import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import KeyIcon from "@mui/icons-material/Key";
import { signOutUser } from "../../firebase";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Navbar.css";
const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);

  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo" to="/">
          <KeyIcon sx={{ fontSize: 60 }} />
        </Link>
        <div className="site-name">
          <Link to="/">PassProtect</Link>
        </div>

        <div className="links-container">
          {!user && !loading ? (
            <Link className="nav-link" to="/signin">
              Sign In
            </Link>
          ) : (
            <Link className="nav-link" to="/" onClick={signOutUser}>
              Sign Out
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
