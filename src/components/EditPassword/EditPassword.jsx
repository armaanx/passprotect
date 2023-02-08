import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./editPassword.css";

const EditPassword = ({
  openModal,
  onClose,
  name,
  url,
  username,
  password,
  id,
}) => {
  const [newName, setNewName] = useState(name);
  const [newUrl, setNewUrl] = useState(url);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState(password);
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
  const handleUpdate = async (e) => {
    if (
      newName === name &&
      newUrl === url &&
      newUsername === username &&
      newPassword === password
    ) {
      e.preventDefault();
      setShowType("password");
      setShowBtnTxt("Show");
      onClose();
    } else {
      e.preventDefault();
      await updateDoc(doc(db, "vault", id), {
        name: newName,
        url: newUrl,
        username: newUsername,
        password: newPassword,
      });
      setShowType("password");
      setShowBtnTxt("Show");
      onClose();
    }
  };
  if (!openModal) {
    return null;
  }

  return (
    <div className="editBG">
      <div className="editContainer">
        <h1 className="editTitle">Edit Password</h1>
        <form className="editForm" onSubmit={handleUpdate}>
          <span>Name</span>
          <input
            required
            className="editInput"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            type="text"></input>

          <span>Url</span>
          <input
            className="editInput"
            value={newUrl}
            onChange={(e) => {
              setNewUrl(e.target.value);
            }}
            type="text"></input>

          <span>Username</span>
          <input
            required
            className="editInput"
            value={newUsername}
            onChange={(e) => {
              setNewUsername(e.target.value);
            }}
            type="text"></input>

          <span>Password</span>
          <input
            required
            className="editInput"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type={showType}></input>

          <div className="showPassBtnContainer">
            <button
              type="button"
              onClick={handleShowPass}
              className="showPassBtn">
              {showBtnTxt} Password
            </button>
          </div>

          <button className="updateBtn" type="submit">
            Update
          </button>
        </form>
        <button
          className="editCloseBtn"
          title="Close"
          onClick={() => {
            setNewName(name);
            setNewUrl(url);
            setNewUsername(username);
            setNewPassword(password);
            setShowType("password");
            setShowBtnTxt("Show");
            onClose();
          }}>
          <CloseIcon fontSize="small" />
        </button>
      </div>
    </div>
  );
};
export default EditPassword;
