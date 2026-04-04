// Auth Action Types
export const authLoginStart = "authLoginStart";
export const authLoginSuccess = "authLoginSuccess";
export const authLoginFail = "authLoginFail";

export const authRegisterStart = "authRegisterStart";
export const authRegisterSuccess = "authRegisterSuccess";
export const authRegisterFail = "authRegisterFail";

export const authLogout = "authLogout";
export const authSetUser = "authSetUser";
export const authSetInitialized = "authSetInitialized";
export const authClearError = "authClearError";

// ── Auth Thunks ──

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";

// Login with email & password
export function loginUser(email, password) {
  return async function (dispatch) {
    dispatch({ type: authLoginStart });
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      dispatch({
        type: authLoginSuccess,
        payload: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
    } catch (error) {
      dispatch({ type: authLoginFail, payload: error.message });
    }
  };
}

// Register with name, email & password
export function registerUser(name, email, password) {
  return async function (dispatch) {
    dispatch({ type: authRegisterStart });
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      const user = result.user;
      dispatch({
        type: authRegisterSuccess,
        payload: {
          uid: user.uid,
          email: user.email,
          displayName: name,
          photoURL: user.photoURL,
        },
      });
    } catch (error) {
      dispatch({ type: authRegisterFail, payload: error.message });
    }
  };
}

// Google Sign-In
export function googleSignIn() {
  return async function (dispatch) {
    dispatch({ type: authLoginStart });
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch({
        type: authLoginSuccess,
        payload: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
    } catch (error) {
      dispatch({ type: authLoginFail, payload: error.message });
    }
  };
}

// Logout
export function logoutUser() {
  return async function (dispatch) {
    await signOut(auth);
    dispatch({ type: authLogout });
  };
}

// Set user from onAuthStateChanged
export function setUser(user) {
  return {
    type: authSetUser,
    payload: user,
  };
}

// Mark auth as initialized
export function setAuthInitialized() {
  return {
    type: authSetInitialized,
  };
}

export function clearAuthError() {
  return {
    type: authClearError,
  };
}
