import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./home.css";
import { Navigate } from "react-router-dom";
const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return;
  }
  if (!user) {
    return (
      <div className="heading">
        <div className="inner">
          <h1>Welcome to PassProtect</h1>
          <h3>
            A Super Secure Password Manager. Never forget your passwords again.
          </h3>
          <ul className="list">
            <li>256 bit AES Encryption</li>
            <li>Random Password Generator</li>
            <li>Cloud Storage for Passwords</li>
          </ul>
        </div>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }
};

export default Home;
