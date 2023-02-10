var CryptoJS = require("crypto-js");
export function encryptPassword(password) {
  var encrypted = CryptoJS.AES.encrypt(
    password,
    process.env.REACT_APP_SECRET_KEY
  ).toString();
  return encrypted;
}

export function decryptPassword(encryptedPassword) {
  var bytes = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.REACT_APP_SECRET_KEY
  );
  var decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
