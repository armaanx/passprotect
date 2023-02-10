import EditPassword from "../EditPassword/EditPassword";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import LanguageIcon from "@mui/icons-material/Language";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Snackbar from "@mui/material/Snackbar";
import "./passwordDisplay.css";
import { Fragment, useState } from "react";
import { decryptPassword } from "../../encryption";
const PasswordDisplay = ({
  name,
  url,
  username,
  password,
  handleDelete,
  id,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const urlExists = () => {
    if (url === "" || url === " ") {
      return false;
    } else {
      return true;
    }
  };
  const handleUrlOpen = () => {
    return window.open("https://www." + url);
  };
  const [alert, setAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alert;
  const [passState, setPassState] = useState("Show");
  const handlePassClick = () => {
    if (passState === "Show") {
      setPassState(decryptPassword(password));
    } else {
      setPassState("Show");
    }
  };

  const alertClick = (newState) => {
    setAlert({ open: true, ...newState });
  };
  const alertClose = () => {
    setAlert({ ...alert, open: false });
  };
  const handleCopyPassword = () => {
    alertClick({
      vertical: "top",
      horizontal: "center",
    });
    return navigator.clipboard.writeText(decryptPassword(password));
  };

  return (
    <Fragment>
      <div className="passwordDisplayBox">
        <p className="data nameField">{name}</p>

        <p
          title="Open Url"
          onClick={handleUrlOpen}
          className="data urlField"
          hidden={!urlExists()}>
          <LanguageIcon fontSize="small" /> {url}
        </p>
        <p title="Username" className="data usernameField">
          <PersonIcon fontSize="small" /> {username}
        </p>
        <p
          title="Password"
          onClick={handlePassClick}
          className="data passField">
          <LockIcon fontSize="small" /> {passState}
        </p>
        <button
          title="Edit"
          onClick={() => setIsEdit(true)}
          className="passDisplayBtn">
          <EditOutlinedIcon fontSize="small" />
        </button>
        <button
          title="Delete"
          onClick={() => {
            handleDelete();
          }}
          className="passDisplayBtn">
          <DeleteOutlineIcon fontSize="small" />
        </button>
        <button
          title="Copy Password"
          onClick={handleCopyPassword}
          className="passDisplayBtn">
          <ContentCopyOutlinedIcon fontSize="small" />
        </button>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={alertClose}
        message="Password Copied"
        key={vertical + horizontal}
      />
      <EditPassword
        openModal={isEdit}
        onClose={() => {
          setPassState("Show");
          setIsEdit(false);
        }}
        name={name}
        url={url}
        username={username}
        password={password}
        id={id}
      />
    </Fragment>
  );
};

export default PasswordDisplay;
