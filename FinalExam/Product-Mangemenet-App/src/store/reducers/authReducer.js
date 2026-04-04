import {
  authLoginStart,
  authLoginSuccess,
  authLoginFail,
  authRegisterStart,
  authRegisterSuccess,
  authRegisterFail,
  authLogout,
  authSetUser,
  authSetInitialized,
  authClearError,
} from "../actions/authActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  initialized: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case authLoginStart:
    case authRegisterStart:
      return { ...state, loading: true, error: null };

    case authLoginSuccess:
    case authRegisterSuccess:
      return { ...state, loading: false, user: action.payload, error: null };

    case authLoginFail:
    case authRegisterFail:
      return { ...state, loading: false, error: action.payload };

    case authLogout:
      return { ...state, user: null, loading: false, error: null };

    case authSetUser:
      return { ...state, user: action.payload, loading: false };

    case authSetInitialized:
      return { ...state, initialized: true };

    case authClearError:
      return { ...state, error: null };

    default:
      return state;
  }
}

export default authReducer;
