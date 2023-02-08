import { useContext, useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../firebase";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./signin.css";
import { UserContext } from "../../contexts/usercontext";
const defaultFormFields = {
  email: "",
  password: "",
};
const SignIn = () => {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { currentUser } = useContext(UserContext);
  const [user, loading, error] = useAuthState(auth);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      navigate("/dashboard");
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password.");
          break;
        case "auth/user-not-found":
          alert("User with the given email doesn't exist. Sign Up instead.");
          break;
        default:
          console.log(error);
      }
      resetFormFields();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  if (loading) {
    return;
  }
  if (!user) {
    return (
      <div className="maincontainer">
        <h1>Welcome</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Email"
            type="email"
            required
            name="email"
            value={email}
            onChange={handleChange}></input>
          <br></br>
          <input
            className="input"
            placeholder="Password"
            type="password"
            required
            name="password"
            value={password}
            onChange={handleChange}></input>
          <br></br>
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>
        <br></br>
        <Link className="nav-link" to="/signup">
          Not a member? Sign Up.
        </Link>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }
};

export default SignIn;
