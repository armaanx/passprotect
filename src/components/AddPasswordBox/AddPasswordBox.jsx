import { useState } from "react";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import "./AddPasswordBox.css";
import { encryptPassword } from "../../encryption";
const defaultFormFields = {
  name: "",
  url: "",
  username: "",
  password: "",
};

const AddPasswordBox = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { name, url, username, password } = formFields;
  const [showType, setShowType] = useState("password");
  const [showBtnTxt, setShowBtnTxt] = useState("Show");
  const handleShowPass = () => {
    if (showBtnTxt === "Show") {
      setShowType("text");
      setShowBtnTxt("Hide");
    }
    if (showBtnTxt === "Hide") {
      setShowType("password");
      setShowBtnTxt("Show");
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const addPass = async (user, name, url, username, password) => {
    await addDoc(collection(db, "vault"), {
      user: user.uid,
      name: name,
      url: url,
      username: username,
      password: password,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addPass(user, name, url, username, encryptPassword(password));
    setShowType("password");
    setShowBtnTxt("Show");
    resetFormFields();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="addpasscontainer">
      <form className="addpassform" onSubmit={handleSubmit}>
        <input
          className="addpassinput"
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required></input>
        <br></br>
        <input
          className="addpassinput"
          placeholder="Url (Optional)"
          type="text"
          name="url"
          value={url}
          onChange={handleChange}></input>
        <br></br>
        <input
          className="addpassinput"
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          required></input>
        <br></br>
        <input
          className="addpassinput"
          placeholder="Password"
          type={showType}
          name="password"
          value={password}
          onChange={handleChange}
          required></input>
        <br></br>
        <button
          onClick={handleShowPass}
          className="show-pass-btn"
          type="button">
          {showBtnTxt} Password
        </button>
        <br></br>
        <button className="addpassbtn" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPasswordBox;
