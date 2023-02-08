import { Fragment, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import {
  onSnapshot,
  query,
  where,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./dashboard.css";
import AddPasswordBox from "../AddPasswordBox/AddPasswordBox";
import PasswordGenerator from "../PasswordGenerator/PasswordGenerator";
import PasswordDisplay from "../PasswordDisplay/PasswordDisplay";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [user, loading, error] = useAuthState(auth);
  const [thepass, setThePass] = useState(new Map());
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "vault"), where("user", "==", user.uid));
      // eslint-disable-next-line no-unused-vars
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const element = doc.data();
          setThePass((map) => new Map(map.set(doc.id, element)));
        });
      });
    }
  }, [user]);
  const handleModalClose = () => {
    setIsOpen(false);
  };
  if (loading) {
    return (
      <div className="loadingSpinner">
        <CircularProgress color="primary" size={60} thickness={5} />
      </div>
    );
  }
  if (user) {
    const newArray = Array.from(thepass.entries());
    return (
      <Fragment>
        <div>
          <AddPasswordBox />
        </div>
        <div className="generateContainer">
          <button
            className="generatePassbtn"
            onClick={() => {
              setIsOpen(true);
            }}>
            Password Generator
          </button>
        </div>
        <PasswordGenerator openModal={isOpen} onClose={handleModalClose} />
        <div className="passwordDisplayArea">
          {newArray.map((index) => {
            return (
              <PasswordDisplay
                key={index[0]}
                id={index[0]}
                name={index[1].name}
                url={index[1].url}
                username={index[1].username}
                password={index[1].password}
                handleDelete={async () => {
                  await deleteDoc(doc(db, "vault", index[0]));
                  window.location.reload(false);
                }}
              />
            );
          })}
        </div>
      </Fragment>
    );
  }
  if (!user) {
    return <Navigate to="/" />;
  }
};

export default Dashboard;
