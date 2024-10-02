import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  signOut,
  sendEmailVerification,
} from "firebase/auth";

const AuthContext = React.createContext();

//custom hook to access the current context value inside the wrapped child
export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true); //to track if the user is loggedIn or not, this is important as we dont want to render our application before the currentUser is set

  function signup(email, password) {
    // returns a promise that resolves when the user is successfully created or rejects if there is an error.
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  //needs emailConfirmation
  function sendVerificationEmail() {
    if (currentUser) {
      return sendEmailVerification(currentUser);
    } else {
      console.log("No current user to send verification mail");
    }
  }

  function updateUserEmail(email) {
    if (currentUser && currentUser.emailVerified) {
      return updateEmail(currentUser, email);
    }
  }

  function updateUserPassword(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    //sets up a listener for authentication state changes using auth.onAuthStateChanged. This listener will be triggered whenever the authentication state changes, such as when a user signs up, signs in, or signs out.
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
    sendVerificationEmail,
  };

  //wrap your child components with context
  return (
    //render the children only when the user is logged in
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

/*Sequence of Execution:
Component Initialization:

When the AuthProvider component is first rendered, the useEffect hook is executed.
The auth.onAuthStateChanged listener is set up, and the unSubscribe function is returned for cleanup.
Sign-Up Function:

When you call the signup function, it uses Firebase's createUserWithEmailAndPassword method to create a new user.
If the sign-up is successful, Firebase updates the authentication state.
Auth State Change Listener:

The auth.onAuthStateChanged listener, which was set up in the useEffect hook, is triggered by the authentication state change.
The listener's callback function (user) => { setCurrentUser(user); } is executed, updating the currentUser state with the new user object. */
