import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { Fragment, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import "./passwordGenerator.css";
const numbers = "0123456789";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const symbols = "!@#$%^&*()+=-_`<>{}[]:;";
const PasswordGenerator = ({ openModal, onClose }) => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(9);
  const [includeUpperCase, setUpperCase] = useState(false);
  const [includeLowerCase, setLowerCase] = useState(true);
  const [includeSymbols, setSymbols] = useState(false);
  const [includeNumbers, setNumbers] = useState(false);

  const [alert, setAlert] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = alert;
  const alertClick = (newState) => {
    setAlert({ open: true, ...newState });
  };
  const alertClose = () => {
    setAlert({ ...alert, open: false });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    let charList = "";
    if (includeUpperCase) charList = charList + upperCaseLetters;
    if (includeLowerCase) charList = charList + lowerCaseLetters;
    if (includeNumbers) charList = charList + numbers;
    if (includeSymbols) charList = charList + symbols;
    setPassword(createPass(charList));
  };
  const createPass = (charList) => {
    let password = "";
    const charListLength = charList.length;
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * charListLength);
      password = password + charList.charAt(charIndex);
    }
    return password;
  };

  const handleCopy = () => {
    if (password === "") return;
    alertClick({
      vertical: "top",
      horizontal: "center",
    });
    navigator.clipboard.writeText(password);
  };

  if (!openModal) {
    return null;
  }

  return (
    <Fragment>
      <div className="modalBG">
        <div className="modalContainer">
          <h1 className="gentitle">Password Generator</h1>
          <div className="generatedDisplayArea">
            <p>{password}</p>

            <button onClick={handleCopy} className="copybtn" title="Copy">
              <ContentCopyOutlinedIcon fontSize="medium" />
            </button>
          </div>
          <form className="generatorForm">
            <label htmlFor="characterNumber">Password Length</label>
            <input
              defaultValue={passwordLength}
              className="number-input"
              type="number"
              min="5"
              max="20"
              id="characterNumber"
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
            />

            <label htmlFor="includeUppercase">Include Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => {
                setUpperCase(e.target.checked);
              }}
              className="checkbox-input"
              type="checkbox"
              id="includeUppercase"
            />

            <label htmlFor="includeLowercase">Include Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => {
                setLowerCase(e.target.checked);
              }}
              className="checkbox-input"
              type="checkbox"
              id="includeLowercase"
            />

            <label htmlFor="includeNumbers">Include Numbers</label>
            <input
              checked={includeNumbers}
              onChange={(e) => {
                setNumbers(e.target.checked);
              }}
              className="checkbox-input"
              type="checkbox"
              id="includeNumbers"
            />

            <label htmlFor="includeSymbols">Include Symbols</label>
            <input
              checked={includeSymbols}
              onChange={(e) => {
                setSymbols(e.target.checked);
              }}
              className="checkbox-input"
              type="checkbox"
              id="includeSymbols"
            />

            <button onClick={handleGenerate} className="genbtn" type="submit">
              Generate
            </button>
          </form>

          <button
            title="Close"
            className="closemodalbtn"
            onClick={() => {
              setPassword("");
              onClose();
            }}>
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={alertClose}
        message="Password Copied"
        key={vertical + horizontal}
      />
    </Fragment>
  );
};
export default PasswordGenerator;
