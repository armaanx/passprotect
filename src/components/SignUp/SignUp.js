import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  auth,
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./signup.css";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
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
        <h1>Hello</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            placeholder="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}></input>
          <br></br>
          <input
            className="input"
            placeholder="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}></input>
          <br></br>
          <input
            className="input"
            placeholder="Master Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}></input>
          <br></br>
          <input
            className="input"
            placeholder="Confirm Master Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}></input>
          <br></br>
          <button className="btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
  if (user) {
    return <Navigate to="/dashboard" />;
  }
};

export default SignUp;
