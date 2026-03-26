# 🔐 Firebase Authentication & Role-Based Access Guide

> **Goal:** Add Firebase Authentication (Email/Password), implement **Instructor** vs **Student** roles, protect routes, show/hide the "Add Course" button based on role, and link courses to the instructor who created them.

---

## Table of Contents

1. [Understanding the Roles](#understanding-the-roles)
2. [Step 1 — Enable Firebase Authentication](#step-1--enable-firebase-authentication)
3. [Step 2 — Install Firebase (if not already done)](#step-2--install-firebase-if-not-already-done)
4. [Step 3 — Update `firebase.js` to Export Auth](#step-3--update-firebasejs-to-export-auth)
5. [Step 4 — Create a `users` Collection in Firestore](#step-4--create-a-users-collection-in-firestore)
6. [Step 5 — Create Auth Reducer & Actions](#step-5--create-auth-reducer--actions)
7. [Step 6 — Add Auth Reducer to `rootReducer.js`](#step-6--add-auth-reducer-to-rootreducerjs)
8. [Step 7 — Create Login & Signup Pages](#step-7--create-login--signup-pages)
9. [Step 8 — Create `ProtectedRoute` Component](#step-8--create-protectedroute-component)
10. [Step 9 — Update Header Based on Role](#step-9--update-header-based-on-role)
11. [Step 10 — Update Routes (AppRoutes.jsx)](#step-10--update-routes-approutesjsx)
12. [Step 11 — Link Courses to Instructor](#step-11--link-courses-to-instructor)
13. [Step 12 — Show Instructor Name on Course Cards](#step-12--show-instructor-name-on-course-cards)
14. [Step 13 — Instructors Can Only Edit/Delete Their Own Courses](#step-13--instructors-can-only-editdelete-their-own-courses)
15. [Complete File Structure](#complete-file-structure)

---

## Understanding the Roles

| Feature | Student (Normal User) | Instructor |
|---|---|---|
| Sign Up / Login | ✅ Yes | ✅ Yes |
| View all courses | ✅ Yes | ✅ Yes |
| Add to Cart / Purchase | ✅ Yes | ❌ No (they create courses) |
| Add Course | ❌ No | ✅ Yes |
| Edit / Delete Course | ❌ No | ✅ Only their own courses |
| See "Add Course" in header | ❌ Hidden | ✅ Visible |
| See instructor name on courses | ✅ Yes | ✅ Yes |

---

## Step 1 — Enable Firebase Authentication

### 1.1 Go to Firebase Console

1. Open **https://console.firebase.google.com**
2. Select your project (`udemy-cloned`)

### 1.2 Enable Email/Password Auth

1. In the sidebar, click **"Build"** → **"Authentication"**
2. Click **"Get started"**
3. Click the **"Email/Password"** provider
4. Toggle **"Enable"** to ON
5. ❌ Leave "Email link (passwordless sign-in)" OFF
6. Click **"Save"**

✅ Firebase Authentication is now enabled!

---

## Step 2 — Install Firebase (If Not Already Done)

If you already followed the Firestore Migration Guide, skip this step. Otherwise:

```bash
npm install firebase
```

---

## Step 3 — Update `firebase.js` to Export Auth

Update `src/Services/firebase.js` to also export the `auth` object:

```javascript
// src/Services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";          // ← ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyB2E61f9MwaWRzbRLjgrwhN-puA-ApO5rY",
  authDomain: "udemy-cloned.firebaseapp.com",
  projectId: "udemy-cloned",
  storageBucket: "udemy-cloned.firebasestorage.app",
  messagingSenderId: "609953392950",
  appId: "1:609953392950:web:05b72ec65a776b9c6beb97"
};

const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Firebase Authentication
export const auth = getAuth(app);                  // ← ADD THIS

export default db;
```

### What we added:

| Export | What it does |
|---|---|
| `db` (default) | Firestore database — used to read/write data |
| `auth` (named) | Firebase Auth — used to sign up, login, logout |

---

## Step 4 — Create a `users` Collection in Firestore

When a user signs up, we'll save their info in Firestore with a **role** field.

### Firestore Structure:

```
Firestore
  └── users (collection)
        └── userId_abc123 (document)
              ├── name: "Zaheer Shaik"
              ├── email: "zaheer@gmail.com"
              ├── role: "instructor"        ← or "student"
              └── createdAt: "2026-03-26"
        └── userId_def456 (document)
              ├── name: "Rahul Patel"
              ├── email: "rahul@gmail.com"
              ├── role: "student"
              └── createdAt: "2026-03-26"
```

You don't need to create this collection manually — it will be created automatically when the first user signs up.

---

## Step 5 — Create Auth Reducer & Actions

### 5.1 Create `src/Services/Reducer/authReducer.js`

```javascript
// src/Services/Reducer/authReducer.js

const initialState = {
  user: null,           // { uid, name, email, role }
  isLoggedIn: false,
  isLoading: true,      // true until we check if user is already logged in
  authError: null,      // login/signup error messages
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case "AUTH_LOADING":
      return {
        ...state,
        isLoading: true,
        authError: null,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,       // { uid, name, email, role }
        isLoggedIn: true,
        isLoading: false,
        authError: null,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        isLoading: false,
        authError: null,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        authError: action.payload,   // error message string
      };

    case "AUTH_LOADED":
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
```

### 5.2 Create `src/Services/Action/auth.action.js`

```javascript
// src/Services/Action/auth.action.js
import { auth } from "../firebase";
import db from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

/* ============================================= */
/*           SYNC ACTION CREATORS                */
/* ============================================= */

export const loginSuccess = (userData) => ({
  type: "LOGIN_SUCCESS",
  payload: userData,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const authError = (message) => ({
  type: "AUTH_ERROR",
  payload: message,
});

export const authLoading = () => ({
  type: "AUTH_LOADING",
});

export const authLoaded = () => ({
  type: "AUTH_LOADED",
});

/* ============================================= */
/*       ASYNC ACTION CREATORS (Firebase Auth)   */
/* ============================================= */

// =============================================
// SIGN UP (Create new account)
// =============================================
export const signupAsync = (name, email, password, role) => {
  return async (dispatch) => {
    try {
      dispatch(authLoading());

      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save user info + role in Firestore "users" collection
      const userData = {
        uid: user.uid,
        name: name,
        email: email,
        role: role,               // "instructor" or "student"
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // 3. Dispatch success
      dispatch(loginSuccess(userData));

      console.log("✅ User signed up:", userData);
    } catch (error) {
      console.log("❌ Signup error:", error.message);
      dispatch(authError(error.message));
    }
  };
};

// =============================================
// LOGIN (Existing user)
// =============================================
export const loginAsync = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authLoading());

      // 1. Login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Get user data from Firestore (to get the role)
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch(loginSuccess(userData));
        console.log("✅ User logged in:", userData);
      } else {
        dispatch(authError("User data not found in database"));
      }
    } catch (error) {
      console.log("❌ Login error:", error.message);
      dispatch(authError(error.message));
    }
  };
};

// =============================================
// LOGOUT
// =============================================
export const logoutAsync = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(logout());
      console.log("✅ User logged out");
    } catch (error) {
      console.log("❌ Logout error:", error.message);
    }
  };
};

// =============================================
// CHECK AUTH STATE (Auto-login on page refresh)
// =============================================
// Call this ONCE when the app starts (in App.jsx or main.jsx)
// Firebase remembers if a user was logged in even after page refresh
export const checkAuthStateAsync = () => {
  return (dispatch) => {
    dispatch(authLoading());

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in — get their data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          dispatch(loginSuccess(userDoc.data()));
        } else {
          dispatch(authLoaded());
        }
      } else {
        // No user logged in
        dispatch(authLoaded());
      }
    });
  };
};
```

### How Each Function Works:

```
╔══════════════════════════════════════════════════════════════╗
║                    SIGNUP FLOW                               ║
║                                                              ║
║  User fills form (name, email, password, role)               ║
║       │                                                      ║
║       ▼                                                      ║
║  createUserWithEmailAndPassword(auth, email, password)       ║
║  → Creates account in Firebase Auth                          ║
║       │                                                      ║
║       ▼                                                      ║
║  setDoc(doc(db, "users", uid), userData)                     ║
║  → Saves name, email, role in Firestore "users" collection   ║
║       │                                                      ║
║       ▼                                                      ║
║  dispatch(loginSuccess(userData))                            ║
║  → Updates Redux state: user is now logged in                ║
╚══════════════════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════════════════╗
║                    LOGIN FLOW                                ║
║                                                              ║
║  User fills form (email, password)                           ║
║       │                                                      ║
║       ▼                                                      ║
║  signInWithEmailAndPassword(auth, email, password)           ║
║  → Verifies credentials with Firebase Auth                   ║
║       │                                                      ║
║       ▼                                                      ║
║  getDoc(doc(db, "users", uid))                               ║
║  → Fetches the user's role from Firestore                    ║
║       │                                                      ║
║       ▼                                                      ║
║  dispatch(loginSuccess(userData))                            ║
║  → Updates Redux state with user + role                      ║
╚══════════════════════════════════════════════════════════════╝
```

---

## Step 6 — Add Auth Reducer to `rootReducer.js`

Update `src/Services/Reducer/rootReducer.js`:

```javascript
// src/Services/Reducer/rootReducer.js
import { combineReducers } from "redux";
import courseReducer from "./CourseReducer";
import teacherReducer from "./teacherReducer";
import authReducer from "./authReducer";          // ← ADD THIS

const rootReducer = combineReducers({
  courseState: courseReducer,
  teacherState: teacherReducer,
  authState: authReducer,                          // ← ADD THIS
});

export default rootReducer;
```

### Updated State Shape:

```javascript
state = {
  courseState: { courses, cart, myLearning, course, isCreated, isUpdated },
  teacherState: { teachers, teacher },
  authState: { user, isLoggedIn, isLoading, authError },   // ← NEW
}
```

Access in components:
```javascript
const user = useSelector((state) => state.authState.user);
const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
const userRole = useSelector((state) => state.authState.user?.role);  // "instructor" or "student"
```

---

## Step 7 — Create Login & Signup Pages

### 7.1 Create `src/components/Auth/Signup.jsx`

```jsx
// src/components/Auth/Signup.jsx
import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupAsync } from "../../Services/Action/auth.action";
import "./Auth.css";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, isLoading } = useSelector((state) => state.authState);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",         // Default role is "student"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch signup action
    await dispatch(signupAsync(formData.name, formData.email, formData.password, formData.role));
    navigate("/");
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <h2 className="auth-title">Sign Up</h2>

        {authError && <Alert variant="danger">{authError}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </Form.Group>

          {/* Role Selection */}
          <Form.Group className="mb-4">
            <Form.Label>I want to join as:</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="🎓 Student"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                type="radio"
                label="👨‍🏫 Instructor"
                name="role"
                value="instructor"
                checked={formData.role === "instructor"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <Button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </Form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Signup;
```

### 7.2 Create `src/components/Auth/Login.jsx`

```jsx
// src/components/Auth/Login.jsx
import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginAsync } from "../../Services/Action/auth.action";
import "./Auth.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authError, isLoading } = useSelector((state) => state.authState);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginAsync(formData.email, formData.password));
    navigate("/");
  };

  return (
    <Container className="auth-container">
      <Card className="auth-card">
        <h2 className="auth-title">Log In</h2>

        {authError && <Alert variant="danger">{authError}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </Form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </Card>
    </Container>
  );
};

export default Login;
```

### 7.3 Create `src/components/Auth/Auth.css`

```css
/* src/components/Auth/Auth.css */

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 450px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.auth-title {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  color: #1c1d1f;
}

.auth-btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  background-color: #a435f0;
  border: none;
}

.auth-btn:hover {
  background-color: #8710d8;
}

.auth-switch {
  text-align: center;
  margin-top: 20px;
  color: #6a6f73;
}

.auth-switch a {
  color: #a435f0;
  text-decoration: underline;
  font-weight: 600;
}
```

---

## Step 8 — Create `ProtectedRoute` Component

This component checks if a user is logged in AND has the correct role before allowing access to a page.

### Create `src/components/Auth/ProtectedRoute.jsx`

```jsx
// src/components/Auth/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.authState);

  // Still checking if user is logged in (on page refresh)
  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  // Not logged in → send to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Logged in but wrong role → send to home page
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  // All checks passed → render the page
  return children;
};

export default ProtectedRoute;
```

### How `ProtectedRoute` Works:

```
User visits /add-course
       │
       ▼
  ProtectedRoute checks:
       │
       ├── isLoading? → Show "Loading..."
       │
       ├── Not logged in? → Redirect to /login
       │
       ├── Logged in but role ≠ "instructor"? → Redirect to /
       │
       └── Logged in AND role = "instructor" → ✅ Show AddCourse page
```

### Usage Examples:

```jsx
{/* Only logged-in users can access */}
<Route path="/cart" element={
  <ProtectedRoute>
    <Cart />
  </ProtectedRoute>
} />

{/* Only instructors can access */}
<Route path="/add-course" element={
  <ProtectedRoute allowedRoles={["instructor"]}>
    <AddCourse />
  </ProtectedRoute>
} />

{/* Anyone can access (no ProtectedRoute wrapper) */}
<Route path="/login" element={<Login />} />
```

---

## Step 9 — Update Header Based on Role

Update `src/components/header/jsx/HeaderAfterLogin.jsx` to:
- Show/hide links based on login state and role
- Replace hardcoded user with Redux state
- Add Login/Signup buttons when not logged in
- Add Logout button when logged in

```jsx
// src/components/header/jsx/HeaderAfterLogin.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAsync } from "../../../Services/Action/auth.action";
import {
  FiShoppingCart,
  FiSearch,
  FiHeart,
  FiBell,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "../css/headerAfterLogin.css";
import "../css/headerAfterLogin-responsive.css";

const HeaderAfterLogin = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user from Redux (auth state)
  const { user, isLoggedIn } = useSelector((state) => state.authState);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate("/");
    closeMenu();
  };

  // Get user initials from name (e.g., "Zaheer Shaik" → "ZS")
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <header className="al-header">
        <div className="al-header-inner">
          {/* Hamburger - mobile only */}
          <button
            className="al-mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="al-logo" onClick={closeMenu}>
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              alt="Udemy"
              width="91"
              height="34"
            />
          </Link>

          {/* Explore & Subscribe (desktop) */}
          <div className="al-left-links al-desktop-only">
            <Link to="/explore" className="al-nav-link">Explore</Link>
            <Link to="/subscribe" className="al-nav-link al-subscribe-link">
              Subscribe
              <span className="al-new-badge">New</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="al-search">
            <div className="al-search-wrapper">
              <FiSearch className="al-search-icon" />
              <input
                type="search"
                placeholder="Search for anything"
                className="al-search-input"
              />
            </div>
          </div>

          {/* Right side nav (desktop) */}
          <nav className="al-nav-right al-desktop-only">
            <Link to="/udemy-business" className="al-nav-link">Udemy Business</Link>
            <Link to="/teach" className="al-nav-link">Teach on Udemy</Link>

            {/* ========== ROLE-BASED LINKS ========== */}

            {isLoggedIn && user?.role === "instructor" && (
              <Link
                to="/add-course"
                className="al-nav-link"
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#393774",
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                Add Course
              </Link>
            )}

            {/* Cart & Wishlist — show for students (or all logged-in users) */}
            {isLoggedIn && (
              <>
                <Link to="/my-learning" className="al-nav-link">My Learning</Link>
                <Link to="/wishlist" className="al-icon-link" title="Wishlist">
                  <FiHeart size={20} />
                </Link>
                <Link to="/cart" className="al-icon-link" title="Cart">
                  <FiShoppingCart size={20} />
                </Link>
                <button className="al-icon-link" title="Notifications">
                  <FiBell size={20} />
                  <span className="al-notif-dot"></span>
                </button>
              </>
            )}

            {/* ========== LOGIN/LOGOUT ========== */}

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="al-user-avatar" title={user?.name}>
                  {getInitials(user?.name)}
                </Link>
                <button
                  className="al-nav-link"
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "1px solid #6a6f73",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="al-nav-link"
                  style={{
                    border: "1px solid #1c1d1f",
                    padding: "5px 12px",
                    borderRadius: "5px",
                  }}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="al-nav-link"
                  style={{
                    backgroundColor: "#1c1d1f",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "5px",
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile right icons */}
          <div className="al-mobile-right-icons">
            {isLoggedIn ? (
              <>
                <Link to="/cart" className="al-icon-link">
                  <FiShoppingCart size={20} />
                </Link>
                <Link to="/profile" className="al-user-avatar-sm">
                  {getInitials(user?.name)}
                </Link>
              </>
            ) : (
              <Link to="/login" className="al-icon-link">
                Log In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`al-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={closeMenu}
      />

      {/* Mobile slide-out menu */}
      <nav className={`al-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="al-mobile-menu-header">
          <Link to="/" className="al-logo" onClick={closeMenu}>
            <img
              src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
              alt="Udemy"
              width="91"
              height="34"
            />
          </Link>
          <button className="al-mobile-close-btn" onClick={closeMenu} aria-label="Close menu">
            <FiX size={22} />
          </button>
        </div>

        {isLoggedIn ? (
          <>
            <div className="al-mobile-user-info">
              <div className="al-mobile-avatar">{getInitials(user?.name)}</div>
              <div className="al-mobile-user-details">
                <span className="al-mobile-user-name">{user?.name}</span>
                <span style={{ fontSize: "12px", color: "#6a6f73" }}>
                  ({user?.role})
                </span>
              </div>
            </div>

            <div className="al-mobile-section">
              <h4 className="al-mobile-section-title">Learn</h4>
              <Link to="/my-learning" className="al-mobile-link" onClick={closeMenu}>
                My learning
              </Link>
              <Link to="/explore" className="al-mobile-link" onClick={closeMenu}>
                Explore
              </Link>
            </div>

            {/* Instructor-only mobile links */}
            {user?.role === "instructor" && (
              <div className="al-mobile-section">
                <h4 className="al-mobile-section-title">Instructor</h4>
                <Link to="/add-course" className="al-mobile-link" onClick={closeMenu}>
                  Add Course
                </Link>
              </div>
            )}

            <div className="al-mobile-section">
              <h4 className="al-mobile-section-title">Account</h4>
              <Link to="/cart" className="al-mobile-link" onClick={closeMenu}>Cart</Link>
              <Link to="/wishlist" className="al-mobile-link" onClick={closeMenu}>Wishlist</Link>
              <Link to="/profile" className="al-mobile-link" onClick={closeMenu}>Profile</Link>
              <button
                className="al-mobile-link"
                onClick={handleLogout}
                style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", width: "100%", color: "#d32f2f" }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="al-mobile-section">
            <Link to="/login" className="al-mobile-link" onClick={closeMenu}>Log In</Link>
            <Link to="/signup" className="al-mobile-link" onClick={closeMenu}>Sign Up</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default HeaderAfterLogin;
```

### What Changed in the Header:

| Before | After |
|---|---|
| Hardcoded `user = { name: "Zaheer Shaik" }` | Gets user from `state.authState.user` |
| "Add Course" visible to everyone | Only visible when `user.role === "instructor"` |
| No login/logout buttons | Shows Login/Signup when not logged in, Logout when logged in |
| No role shown | Shows role label `(instructor)` or `(student)` on mobile |

---

## Step 10 — Update Routes (AppRoutes.jsx)

Update `src/AppRoutes.jsx` to add auth routes and protect instructor-only routes:

```jsx
// src/AppRoutes.jsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

// ---- Existing Components ----
import Hero from "./components/HeroSec/jsx/Hero";
import Categories from "./components/Categories/Categories";
import ViewCourses from "./components/ViewCourses/ViewCourses";
import AddCourse from "./components/AddCourse/Addcourse";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import EditCourse from "./components/EditCourse/EditCourse";
import Cart from "./components/Cart/Cart";
import MyLearning from "./components/MyLearning/MyLearning";

import Thero from "./components/Teach/HeroTeach/Thero";
import AddForm from "./components/Teach/AddForm/Addform";
import BecomeInstructor from "./components/Teach/BecomeInstructor/BecomeInstructor";
import ViewInstructor from "./components/Teach/Instructors/viewInstructor";
import InstructorDetails from "./components/Teach/Instructors/InstructorDetails";
import EditInstructor from "./components/Teach/Instructors/EditInstructor";
import ReasonsSection from "./components/Teach/TeachSec/ReasonSec/ReasonsSection";
import HowToBegin from "./components/Teach/TeachSec/HowToBegin/HowToBegin";
import TestimonialSlider from "./components/Teach/TeachSec/TestimonialSlider/TestimonialSlider";
import SupportSection from "./components/Teach/TeachSec/SupportSection/SupportSection";

// ---- NEW: Auth Components ----
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const AppRoutes = () => {
  const [filter, setFilter] = useState("All");

  return (
    <Routes>
      {/* ===== PUBLIC ROUTES (anyone can access) ===== */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Categories setFilter={setFilter} />
            <ViewCourses filter={filter} />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/course/:id" element={<CourseDetails />} />
      <Route
        path="/teach"
        element={
          <>
            <Thero />
            <ReasonsSection />
            <HowToBegin />
            <TestimonialSlider />
            <SupportSection />
            <BecomeInstructor />
          </>
        }
      />
      <Route path="/view-instructors" element={<ViewInstructor />} />
      <Route path="/instructor/:id" element={<InstructorDetails />} />

      {/* ===== PROTECTED ROUTES (logged-in users only) ===== */}
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/my-learning" element={
        <ProtectedRoute>
          <MyLearning />
        </ProtectedRoute>
      } />

      {/* ===== INSTRUCTOR-ONLY ROUTES ===== */}
      <Route path="/add-course" element={
        <ProtectedRoute allowedRoles={["instructor"]}>
          <AddCourse />
        </ProtectedRoute>
      } />
      <Route path="/edit/:id" element={
        <ProtectedRoute allowedRoles={["instructor"]}>
          <EditCourse />
        </ProtectedRoute>
      } />
      <Route path="/get-started" element={
        <ProtectedRoute allowedRoles={["instructor"]}>
          <AddForm />
        </ProtectedRoute>
      } />
      <Route path="/edit-instructor/:id" element={
        <ProtectedRoute allowedRoles={["instructor"]}>
          <EditInstructor />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
```

### Route Summary:

| Route | Who Can Access | Protection |
|---|---|---|
| `/` | Everyone | None (public) |
| `/login` | Everyone | None |
| `/signup` | Everyone | None |
| `/course/:id` | Everyone | None |
| `/teach` | Everyone | None |
| `/cart` | Logged-in users | `ProtectedRoute` |
| `/my-learning` | Logged-in users | `ProtectedRoute` |
| `/add-course` | Instructors only | `ProtectedRoute allowedRoles={["instructor"]}` |
| `/edit/:id` | Instructors only | `ProtectedRoute allowedRoles={["instructor"]}` |

---

## Step 11 — Link Courses to Instructor

When an instructor adds a course, we should save their UID and name with the course data.

### Update `AddCourse.jsx` (Addcourse.jsx):

Add the instructor's info when creating a course:

```jsx
// In src/components/AddCourse/Addcourse.jsx
// Add this import:
import { useSelector } from "react-redux";

// Inside the component, add:
const user = useSelector((state) => state.authState.user);

// Update handleSubmit to include instructor info:
const handleSubmit = (e) => {
  e.preventDefault();

  const newCourse = {
    ...formData,
    instructorId: user.uid,          // ← Store who created this course
    instructorName: user.name,       // ← Store instructor's name
  };

  dispatch(addCourseAsync(newCourse));
  console.log("Course Added:", newCourse);
  navigate("/");

  // reset form...
};
```

### What Gets Saved in Firestore:

```
courses (collection)
  └── auto-generated-id (document)
        ├── title: "React Course"
        ├── description: "Learn React..."
        ├── price: "2999"
        ├── instructorId: "abc123xyz"          ← NEW
        ├── instructorName: "Zaheer Shaik"     ← NEW
        └── ... other fields
```

---

## Step 12 — Show Instructor Name on Course Cards

### Update `ViewCourses.jsx`:

Add the instructor name below the course title:

```jsx
// In the course card, after <Card.Title>:
<Card.Title className="course-title">
  {course.title}
</Card.Title>

{/* ← ADD THIS: Show instructor name */}
{course.instructorName && (
  <p className="mb-1" style={{ fontSize: "13px", color: "#6a6f73" }}>
    👨‍🏫 By <strong>{course.instructorName}</strong>
  </p>
)}

<p className="mb-1">{course.description.slice(0, 40)}...</p>
```

### What the User Sees:

```
┌────────────────────────────┐
│  🖼️  Course Image           │
│                              │
│  React Developer Course      │
│  👨‍🏫 By Zaheer Shaik          │  ← Instructor name!
│  Learn React from basics...  │
│  Duration: 40 hrs            │
│  Rating: ⭐ 4                │
│  Price: ₹2999                │
│                              │
│  [View More]  [Add to Cart]  │
└────────────────────────────┘
```

---

## Step 13 — Instructors Can Only Edit/Delete Their Own Courses

In `CourseDetails.jsx` (or wherever the Edit/Delete buttons are), show those buttons only if:
- The user is logged in
- The user is an instructor
- The course's `instructorId` matches the logged-in user's `uid`

```jsx
// In your CourseDetails or ViewCourses component:
import { useSelector } from "react-redux";

const user = useSelector((state) => state.authState.user);

// Inside the JSX, conditionally show Edit/Delete buttons:
{user && user.role === "instructor" && user.uid === course.instructorId && (
  <div>
    <Button as={Link} to={`/edit/${course.id}`} variant="warning" size="sm">
      Edit
    </Button>
    <Button variant="danger" size="sm" onClick={() => dispatch(deleteCourseAsync(course.id))}>
      Delete
    </Button>
  </div>
)}
```

### Logic Flow:

```
Is user logged in?
  ├── No → Don't show Edit/Delete buttons
  └── Yes → Is user an instructor?
        ├── No (student) → Don't show Edit/Delete buttons
        └── Yes → Does course.instructorId === user.uid?
              ├── No → This is someone else's course → Don't show
              └── Yes → ✅ Show Edit/Delete buttons
```

---

## Step 14 — Initialize Auth on App Start

Update `src/App.jsx` to check if user is already logged in when the app loads:

```jsx
// src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStateAsync } from "./Services/Action/auth.action";
import HeaderAfterLogin from "./components/header/jsx/HeaderAfterLogin";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  // Check if user is already logged in (on page refresh)
  useEffect(() => {
    dispatch(checkAuthStateAsync());
  }, [dispatch]);

  return (
    <>
      <HeaderAfterLogin />
      <AppRoutes />
    </>
  );
}

export default App;
```

### Why `checkAuthStateAsync`?

When user refreshes the page, Redux state is lost. But Firebase Auth **remembers** the logged-in user in the browser. `onAuthStateChanged` detects this and re-logs the user in automatically — so they don't have to login again after every refresh.

---

## Complete File Structure

```
src/
├── Services/
│   ├── firebase.js                  ← MODIFIED: Added auth export
│   ├── Store.js                     ← NO CHANGE (uses rootReducer)
│   ├── Action/
│   │   ├── auth.action.js           ← NEW: signup, login, logout, checkAuthState
│   │   ├── cource.action.js         ← NO CHANGE
│   │   └── teacher.action.js        ← NO CHANGE
│   └── Reducer/
│       ├── rootReducer.js           ← MODIFIED: Added authReducer
│       ├── authReducer.js           ← NEW: Handles auth state
│       ├── CourseReducer.js         ← NO CHANGE
│       └── teacherReducer.js        ← NO CHANGE
├── components/
│   ├── Auth/                        ← NEW FOLDER
│   │   ├── Login.jsx                ← NEW: Login page
│   │   ├── Signup.jsx               ← NEW: Signup page with role selection
│   │   ├── ProtectedRoute.jsx       ← NEW: Route guard component
│   │   └── Auth.css                 ← NEW: Auth page styles
│   ├── header/
│   │   └── jsx/
│   │       └── HeaderAfterLogin.jsx ← MODIFIED: Role-based nav links
│   ├── AddCourse/
│   │   └── Addcourse.jsx            ← MODIFIED: Adds instructorId & instructorName
│   ├── ViewCourses/
│   │   └── ViewCourses.jsx          ← MODIFIED: Shows instructor name on cards
│   └── CourseDetails/
│       └── CourseDetails.jsx        ← MODIFIED: Edit/Delete only for own courses
├── App.jsx                          ← MODIFIED: Calls checkAuthStateAsync on load
└── AppRoutes.jsx                    ← MODIFIED: Added auth routes + ProtectedRoute
```

---

## Quick Summary of All Changes

| File | Action | What Changed |
|---|---|---|
| `src/Services/firebase.js` | MODIFY | Added `getAuth` and exported `auth` |
| `src/Services/Reducer/authReducer.js` | NEW | Auth state (user, isLoggedIn, isLoading, authError) |
| `src/Services/Action/auth.action.js` | NEW | Signup, login, logout, checkAuthState async actions |
| `src/Services/Reducer/rootReducer.js` | MODIFY | Added `authState: authReducer` |
| `src/components/Auth/Login.jsx` | NEW | Login page |
| `src/components/Auth/Signup.jsx` | NEW | Signup page with role selection |
| `src/components/Auth/ProtectedRoute.jsx` | NEW | Route guard (checks login + role) |
| `src/components/Auth/Auth.css` | NEW | Auth page styling |
| `src/components/header/jsx/HeaderAfterLogin.jsx` | MODIFY | Role-based nav, login/logout buttons |
| `src/AppRoutes.jsx` | MODIFY | Auth routes + ProtectedRoute wrappers |
| `src/App.jsx` | MODIFY | checkAuthStateAsync on mount |
| `src/components/AddCourse/Addcourse.jsx` | MODIFY | Adds instructorId & instructorName |
| `src/components/ViewCourses/ViewCourses.jsx` | MODIFY | Shows instructor name below title |

---

> **🎉 After implementing this guide:**
> - Students can browse, add to cart, and purchase courses
> - Instructors can add/edit/delete their own courses
> - The "Add Course" button only appears for instructors
> - Every course shows which instructor created it
> - Pages are protected based on login status and role
