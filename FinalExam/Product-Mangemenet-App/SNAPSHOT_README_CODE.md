# Full Project Snapshot (With Code)

Follow this guide sequentially to completely build the project from scratch. Create the files exactly as named and paste the corresponding code.

## Prerequisites

Run these commands in your terminal to initialize the project and install all dependencies:
```bash
npm create vite@latest product-management-app -- --template react
cd product-management-app
npm install firebase react-redux redux redux-thunk react-router-dom react-bootstrap bootstrap @cloudinary/react @cloudinary/url-gen toastify
```

---

## Step 1: package.json

**Description:** Project configuration and dependencies.

**Code:**
```json
{
  "name": "product-mangemenet-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@cloudinary/react": "^1.14.4",
    "@cloudinary/url-gen": "^1.22.0",
    "bootstrap": "^5.3.8",
    "firebase": "^12.11.0",
    "react": "^19.2.4",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.2.4",
    "react-redux": "^9.2.0",
    "react-router": "^7.14.0",
    "react-router-dom": "^7.14.0",
    "redux": "^5.0.1",
    "redux-thunk": "^3.1.0",
    "toastify": "^2.0.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "vite": "^8.0.1"
  }
}

```

---

## Step 2: .env

**Description:** Environment variables for Firebase and Cloudinary.

**Code:**
```text
# Firebase
VITE_FIREBASE_API_KEY=AIzaSyCX5yLaLbAGqH-ttZySPxn5FwzhfTk2hFY
VITE_FIREBASE_AUTH_DOMAIN=product-b6a6e.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=product-b6a6e
VITE_FIREBASE_STORAGE_BUCKET=product-b6a6e.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=429112132954
VITE_FIREBASE_APP_ID=1:429112132954:web:a1da494c89ebf50b081f63

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=dcvhabxzz
VITE_CLOUDINARY_UPLOAD_PRESET=VITE_CLOUDINARY_UPLOAD_PRESET

```

---

## Step 3: index.html

**Description:** Main HTML entry point.

**Code:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="ProductHub - Product Management App with Firebase and Cloudinary" />
    <title>ProductHub — Product Management</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

---

## Step 4: vite.config.js

**Description:** Vite configuration.

**Code:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---

## Step 5: src/main.jsx

**Description:** React application entry point.

**Code:**
```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/thunk";
import App from "./app.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

```

---

## Step 6: src/index.css

**Description:** Global CSS styles.

**Code:**
```css
body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

```

---

## Step 7: src/app.jsx

**Description:** Main App component with routing.

**Code:**
```jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { setUser, setAuthInitialized } from "./store/actions/authActionTypes";
import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import ViewProductsPage from "./pages/ViewProductsPage";
import SingleProductPage from "./pages/SingleProductPage";

function App() {
  const dispatch = useDispatch();

  useEffect(function () {
    const unsubscribe = onAuthStateChanged(auth, function (user) {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
      dispatch(setAuthInitialized());
    });

    return function () {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditProductPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ViewProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute>
              <SingleProductPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

```

---

## Step 8: src/firebase/config.js

**Description:** Firebase initialization configuration.

**Code:**
```javascript
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };

```

---

## Step 9: src/utils/cloudinary.js

**Description:** Cloudinary image upload utility.

**Code:**
```javascript
async function uploadImageToCloudinary(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "product-management");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Image upload failed");
  }

  return data.secure_url;
}

export default uploadImageToCloudinary;

```

---

## Step 10: src/store/thunk.js

**Description:** Redux store configuration.

**Code:**
```javascript
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rooterReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

```

---

## Step 11: src/store/actions/authActionTypes.js

**Description:** Redux actions for authentication.

**Code:**
```javascript
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

```

---

## Step 12: src/store/actions/productActionTypes.js

**Description:** Redux actions for products.

**Code:**
```javascript
// Product Action Types
export const productsFetchStart = "productsFetchStart";
export const productsFetchSuccess = "productsFetchSuccess";
export const productsFetchFail = "productsFetchFail";

export const productAddStart = "productAddStart";
export const productAddSuccess = "productAddSuccess";
export const productAddFail = "productAddFail";

export const productUpdateStart = "productUpdateStart";
export const productUpdateSuccess = "productUpdateSuccess";
export const productUpdateFail = "productUpdateFail";

export const productDeleteStart = "productDeleteStart";
export const productDeleteSuccess = "productDeleteSuccess";
export const productDeleteFail = "productDeleteFail";

export const setSearchAction = "setSearchAction";
export const setCategoryAction = "setCategoryAction";
export const setSortByAction = "setSortByAction";

// ── Product Thunks ──

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

// Fetch all products
export function fetchProducts() {
  return async function (dispatch) {
    dispatch({ type: productsFetchStart });
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const products = [];
      snapshot.forEach(function (docSnap) {
        products.push({ id: docSnap.id, ...docSnap.data() });
      });
      dispatch({ type: productsFetchSuccess, payload: products });
    } catch (error) {
      dispatch({ type: productsFetchFail, payload: error.message });
    }
  };
}

// Add a product
export function addProduct(productData) {
  return async function (dispatch) {
    dispatch({ type: productAddStart });
    try {
      const docRef = await addDoc(collection(db, "products"), {
        title: productData.title,
        price: Number(productData.price),
        category: productData.category,
        description: productData.description,
        imageUrl: productData.imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      dispatch({
        type: productAddSuccess,
        payload: {
          id: docRef.id,
          ...productData,
          price: Number(productData.price),
        },
      });
    } catch (error) {
      dispatch({ type: productAddFail, payload: error.message });
    }
  };
}

// Update a product
export function updateProduct(id, productData) {
  return async function (dispatch) {
    dispatch({ type: productUpdateStart });
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        title: productData.title,
        price: Number(productData.price),
        category: productData.category,
        description: productData.description,
        imageUrl: productData.imageUrl,
        updatedAt: serverTimestamp(),
      });
      dispatch({
        type: productUpdateSuccess,
        payload: {
          id: id,
          ...productData,
          price: Number(productData.price),
        },
      });
    } catch (error) {
      dispatch({ type: productUpdateFail, payload: error.message });
    }
  };
}

// Delete a product
export function deleteProduct(id) {
  return async function (dispatch) {
    dispatch({ type: productDeleteStart });
    try {
      await deleteDoc(doc(db, "products", id));
      dispatch({ type: productDeleteSuccess, payload: id });
    } catch (error) {
      dispatch({ type: productDeleteFail, payload: error.message });
    }
  };
}

// Filter / Sort actions
export function setSearch(value) {
  return { type: setSearchAction, payload: value };
}

export function setCategory(value) {
  return { type: setCategoryAction, payload: value };
}

export function setSortBy(value) {
  return { type: setSortByAction, payload: value };
}

```

---

## Step 13: src/store/reducers/rooterReducer.js

**Description:** Redux root reducer setup.

**Code:**
```javascript
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;

```

---

## Step 14: src/store/reducers/authReducer.js

**Description:** Redux reducer for auth state.

**Code:**
```javascript
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

```

---

## Step 15: src/store/reducers/productReducer.js

**Description:** Redux reducer for product state.

**Code:**
```javascript
import {
  productsFetchStart,
  productsFetchSuccess,
  productsFetchFail,
  productAddStart,
  productAddSuccess,
  productAddFail,
  productUpdateStart,
  productUpdateSuccess,
  productUpdateFail,
  productDeleteStart,
  productDeleteSuccess,
  productDeleteFail,
  setSearchAction,
  setCategoryAction,
  setSortByAction,
} from "../actions/productActionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: "",
  category: "All",
  sortBy: "default",
};

function productReducer(state = initialState, action) {
  switch (action.type) {
    case productsFetchStart:
    case productAddStart:
    case productUpdateStart:
    case productDeleteStart:
      return { ...state, loading: true, error: null };

    case productsFetchSuccess:
      return { ...state, loading: false, items: action.payload };

    case productAddSuccess:
      return { ...state, loading: false, items: [...state.items, action.payload] };

    case productUpdateSuccess:
      return {
        ...state,
        loading: false,
        items: state.items.map(function (item) {
          if (item.id === action.payload.id) return action.payload;
          return item;
        }),
      };

    case productDeleteSuccess:
      return {
        ...state,
        loading: false,
        items: state.items.filter(function (item) {
          return item.id !== action.payload;
        }),
      };

    case productsFetchFail:
    case productAddFail:
    case productUpdateFail:
    case productDeleteFail:
      return { ...state, loading: false, error: action.payload };

    case setSearchAction:
      return { ...state, search: action.payload };

    case setCategoryAction:
      return { ...state, category: action.payload };

    case setSortByAction:
      return { ...state, sortBy: action.payload };

    default:
      return state;
  }
}

export default productReducer;

```

---

## Step 16: src/components/PrivateRoute.jsx

**Description:** Route guard component.

**Code:**
```jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner, Container } from "react-bootstrap";

function PrivateRoute({ children }) {
  const auth = useSelector(function (state) {
    return state.auth;
  });

  // Still checking auth state
  if (!auth.initialized) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  // Not logged in
  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute;

```

---

## Step 17: src/components/Navbar.jsx

**Description:** Navigation bar component.

**Code:**
```jsx
import React from "react";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authActionTypes";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(function (state) {
    return state.auth.user;
  });

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="md" className="shadow-sm">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bold">
          🛍️ ProductHub
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-navbar" />
        <BsNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              View Products
            </Nav.Link>

          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                <span className="text-light me-3 small">
                  Hi, {user.displayName || user.email}
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-light">
                Login
              </Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;

```

---

## Step 18: src/components/ProductForm.jsx

**Description:** Form component for adding/editing products.

**Code:**
```jsx
import React, { useState } from "react";
import { Form, Button, Card, Spinner, Alert, Image } from "react-bootstrap";
import uploadImageToCloudinary from "../utils/cloudinary";

function ProductForm({ initialData, onSubmit, loading }) {
  const defaults = initialData || {};

  const [state, setState] = useState({
    title: defaults.title || "",
    price: defaults.price || "",
    category: defaults.category || "",
    description: defaults.description || "",
    imageUrl: defaults.imageUrl || "",
    imageFile: null,
    uploading: false,
    error: "",
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setState({
        ...state,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ ...state, error: "" });

    if (!state.title || !state.price || !state.category) {
      setState({ ...state, error: "Title, Price and Category are required." });
      return;
    }

    let finalImageUrl = state.imageUrl;

    // Upload new image if selected
    if (state.imageFile) {
      try {
        setState({ ...state, uploading: true });
        finalImageUrl = await uploadImageToCloudinary(state.imageFile);
        setState({ ...state, uploading: false });
      } catch (err) {
        setState({ ...state, uploading: false, error: "Image upload failed: " + err.message });
        return;
      }
    }

    onSubmit({
      title: state.title,
      price: state.price,
      category: state.category,
      description: state.description,
      imageUrl: finalImageUrl,
    });
  }

  const isLoading = loading || state.uploading;

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        {state.error && (
          <Alert variant="danger" dismissible onClose={function () { setState({ ...state, error: "" }); }}>
            {state.error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="productTitle">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Product name"
              value={state.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productPrice">
            <Form.Label className="fw-semibold">Price (₹)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="0.00"
              value={state.price}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              name="category"
              value={state.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productDescription">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              placeholder="Optional description"
              value={state.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label className="fw-semibold">Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>

          {/* Image preview */}
          {state.imageUrl && (
            <div className="mb-3">
              <Image
                src={state.imageUrl}
                alt="Preview"
                thumbnail
                style={{ maxHeight: "200px" }}
              />
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-100 fw-semibold py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {state.uploading ? "Uploading image..." : "Saving..."}
              </>
            ) : (
              initialData ? "Update Product" : "Add Product"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProductForm;

```

---

## Step 19: src/components/ProductItem.jsx

**Description:** Card component for displaying a product.

**Code:**
```jsx
import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../store/actions/productActionTypes";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete \"" + product.title + "\"?"
    );
    if (confirmed) {
      dispatch(deleteProduct(product.id));
    }
  }

  function handleEdit() {
    navigate("/edit/" + product.id);
  }

  function handleView() {
    navigate("/product/" + product.id);
  }

  return (
    <Card className="h-100 shadow-sm border-0">
      {product.imageUrl && (
        <Card.Img
          variant="top"
          src={product.imageUrl}
          alt={product.title}
          style={{ width: "100%", height: "220px", objectFit: "cover" }}
        />
      )}
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{product.title}</Card.Title>
        <Card.Text className="text-primary fw-bold fs-5">
          ₹{Number(product.price).toFixed(2)}
        </Card.Text>
        <span className="badge bg-secondary mb-2 align-self-start">
          {product.category}
        </span>
        {product.description && (
          <Card.Text className="text-muted small flex-grow-1">
            {product.description.length > 80
              ? product.description.substring(0, 80) + "..."
              : product.description}
          </Card.Text>
        )}
        <div className="d-flex gap-2 mt-auto">
          <Button variant="primary" size="sm" className="flex-grow-1" onClick={handleView}>
            View
          </Button>
          <Button variant="outline-primary" size="sm" className="flex-grow-1" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline-danger" size="sm" className="flex-grow-1" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductItem;

```

---

## Step 20: src/components/ProductList.jsx

**Description:** Component for listing products with filters.

**Code:**
```jsx
import React, { useEffect } from "react";
import { Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setSortBy,
} from "../store/actions/productActionTypes";
import ProductItem from "./ProductItem";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(function (state) {
    return state.products;
  });

  const items = products.items;
  const loading = products.loading;
  const error = products.error;
  const search = products.search;
  const category = products.category;
  const sortBy = products.sortBy;

  useEffect(function () {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories from products
  const categories = ["All"];
  items.forEach(function (item) {
    if (item.category && categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  // Filter by search
  let filtered = items.filter(function (item) {
    if (!search) return true;
    return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter(function (item) {
      return item.category === category;
    });
  }

  // Sort
  if (sortBy === "price-asc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(a.price) - Number(b.price);
    });
  } else if (sortBy === "price-desc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(b.price) - Number(a.price);
    });
  }

  return (
    <div>
      {/* Toolbar */}
      <Row className="mb-4 g-2">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={function (e) {
              dispatch(setSearch(e.target.value));
            }}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={category}
            onChange={function (e) {
              dispatch(setCategory(e.target.value));
            }}
          >
            {categories.map(function (cat) {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={sortBy}
            onChange={function (e) {
              dispatch(setSortBy(e.target.value));
            }}
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Error */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Products Grid */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted fs-5">No products found.</p>
        </div>
      )}

      <Row className="g-4">
        {filtered.map(function (product) {
          return (
            <Col key={product.id} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default ProductList;

```

---

## Step 21: src/pages/LoginPage.jsx

**Description:** Login page.

**Code:**
```jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleSignIn, clearAuthError } from "../store/actions/authActionTypes";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(function (state) {
    return state.auth;
  });

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    dispatch(loginUser(email, password)).then(function () {
      navigate("/");
    });
  }

  function handleGoogleLogin() {
    dispatch(googleSignIn()).then(function () {
      navigate("/");
    });
  }

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>

          {/* Brand */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">🛍️ ProductHub</h2>
            <p className="text-muted small mb-0">Sign in to manage your products</p>
          </div>

          {/* Card */}
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">

              {auth.error && (
                <Alert variant="danger" className="py-2 small" dismissible onClose={function () { dispatch(clearAuthError()); }}>
                  {auth.error}
                </Alert>
              )}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={function (e) { setEmail(e.target.value); }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label className="small fw-semibold">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={function (e) { setPassword(e.target.value); }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={function () { setShowPassword(!showPassword); }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 fw-semibold py-2 mb-3"
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <><Spinner animation="border" size="sm" className="me-2" />Signing in…</>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </Form>

              {/* Divider */}
              <div className="d-flex align-items-center my-3">
                <hr className="flex-grow-1 m-0" />
                <span className="text-muted small px-3">OR</span>
                <hr className="flex-grow-1 m-0" />
              </div>

              {/* Google Sign In */}
              <Button
                variant="outline-dark"
                className="w-100 fw-medium py-2"
                onClick={handleGoogleLogin}
                disabled={auth.loading}
              >
                Continue with Google
              </Button>

            </Card.Body>
          </Card>

          <p className="text-center mt-4 text-muted small">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary fw-semibold text-decoration-none">
              Register
            </Link>
          </p>

        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;

```

---

## Step 22: src/pages/RegisterPage.jsx

**Description:** Registration page.

**Code:**
```jsx
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../store/actions/authActionTypes";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(function (state) {
    return state.auth;
  });

  function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    dispatch(registerUser(name, email, password)).then(function () {
      navigate("/");
    });
  }

  return (
    <Container fluid className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={4}>

          <div className="text-center mb-4">
            <h2 className="fw-bold text-dark mb-1">🛍️ ProductHub</h2>
            <p className="text-muted small mb-0">Create your account</p>
          </div>

          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">

              {auth.error && (
                <Alert variant="danger" className="py-2 small" dismissible onClose={function () { dispatch(clearAuthError()); }}>
                  {auth.error}
                </Alert>
              )}

              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="registerName">
                  <Form.Label className="small fw-semibold">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={function (e) { setName(e.target.value); }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerEmail">
                  <Form.Label className="small fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={function (e) { setEmail(e.target.value); }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="registerPassword">
                  <Form.Label className="small fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={function (e) { setPassword(e.target.value); }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 fw-semibold py-2"
                  disabled={auth.loading}
                >
                  {auth.loading ? (
                    <><Spinner animation="border" size="sm" className="me-2" />Creating account…</>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Form>

            </Card.Body>
          </Card>

          <p className="text-center mt-4 text-muted small">
            Already have an account?{" "}
            <Link to="/login" className="text-primary fw-semibold text-decoration-none">
              Sign In
            </Link>
          </p>

        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;

```

---

## Step 23: src/pages/ProductPage.jsx

**Description:** Dashboard page for managing products.

**Code:**
```jsx
import React, { useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Alert,
  Badge,
  Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  setSearch,
  setCategory,
  setSortBy,
} from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(function (state) {
    return state.products;
  });

  const items = products.items;
  const loading = products.loading;
  const error = products.error;
  const search = products.search;
  const category = products.category;
  const sortBy = products.sortBy;

  useEffect(function () {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories
  const categories = ["All"];
  items.forEach(function (item) {
    if (item.category && categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  // Filter by search
  let filtered = items.filter(function (item) {
    if (!search) return true;
    return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter(function (item) {
      return item.category === category;
    });
  }

  // Sort
  if (sortBy === "price-asc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(a.price) - Number(b.price);
    });
  } else if (sortBy === "price-desc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(b.price) - Number(a.price);
    });
  }

  function handleDelete(product) {
    const confirmed = window.confirm(
      'Are you sure you want to delete "' + product.title + '"?'
    );
    if (confirmed) {
      dispatch(deleteProduct(product.id));
    }
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <p className="text-muted mb-0">
              Manage your products ({filtered.length} total)
            </p>
          </div>
          <Button
            as={Link}
            to="/add"
            variant="primary"
            className="fw-semibold px-4"
          >
            + Add Product
          </Button>
        </div>

        {/* Search & Filter Toolbar */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={5}>
                <Form.Control
                  type="text"
                  placeholder="🔍 Search products by name..."
                  value={search}
                  onChange={function (e) {
                    dispatch(setSearch(e.target.value));
                  }}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={category}
                  onChange={function (e) {
                    dispatch(setCategory(e.target.value));
                  }}
                >
                  {categories.map(function (cat) {
                    return (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={sortBy}
                  onChange={function (e) {
                    dispatch(setSortBy(e.target.value));
                  }}
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3">Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Products Table */}
        {!loading && filtered.length > 0 && (
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0 align-middle">
                <thead className="bg-dark text-white">
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th style={{ width: "80px" }}>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th style={{ width: "260px" }} className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(function (product, index) {
                    return (
                      <tr key={product.id}>
                        <td className="fw-semibold text-muted">{index + 1}</td>
                        <td>
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "8px",
                                backgroundColor: "#e9ecef",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              📷
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="fw-semibold">{product.title}</span>
                          {product.description && (
                            <small className="d-block text-muted">
                              {product.description.length > 50
                                ? product.description.substring(0, 50) + "..."
                                : product.description}
                            </small>
                          )}
                        </td>
                        <td>
                          <Badge bg="secondary">{product.category}</Badge>
                        </td>
                        <td className="fw-bold text-primary">
                          ₹{Number(product.price).toFixed(2)}
                        </td>
                        <td className="text-center">
                          <div className="d-flex gap-2 justify-content-center">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={function () {
                                navigate("/product/" + product.id);
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={function () {
                                navigate("/edit/" + product.id);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={function () {
                                handleDelete(product);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default ProductPage;

```

---

## Step 24: src/pages/SingleProductPage.jsx

**Description:** Detailed view of a single product.

**Code:**
```jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, deleteProduct } from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";

function SingleProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector(function (state) {
    return state.products;
  });

  const items = products.items;
  const loading = products.loading;
  const error = products.error;

  // If products haven't been loaded yet, fetch them
  useEffect(function () {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Find the current product
  let product = null;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      product = items[i];
      break;
    }
  }

  function handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete "' + product.title + '"?'
    );
    if (confirmed) {
      dispatch(deleteProduct(product.id));
      navigate("/");
    }
  }

  function handleEdit() {
    navigate("/edit/" + product.id);
  }

  // Loading state
  if (loading) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3">Loading product details...</p>
          </div>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
          <Button as={Link} to="/products" variant="outline-primary">
            ← Back to Products
          </Button>
        </Container>
      </div>
    );
  }

  // Product not found
  if (!loading && items.length > 0 && !product) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <div className="text-center py-5">
            <h3 className="text-muted mb-3">Product Not Found</h3>
            <p className="text-muted mb-4">
              The product you are looking for does not exist or has been removed.
            </p>
            <Button as={Link} to="/products" variant="primary" className="fw-semibold">
              ← Browse Products
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Still loading products list
  if (!product) {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />
        <Container className="py-5">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-decoration-none text-muted">
            Home
          </Link>
          <span className="text-muted mx-2">/</span>
          <Link to="/products" className="text-decoration-none text-muted">
            Products
          </Link>
          <span className="text-muted mx-2">/</span>
          <span className="fw-semibold">{product.title}</span>
        </nav>

        <Card className="border-0 shadow-sm overflow-hidden">
          <Row className="g-0">
            {/* Product Image */}
            <Col md={6}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "400px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="d-flex align-items-center justify-content-center bg-secondary bg-opacity-10"
                  style={{ minHeight: "400px" }}
                >
                  <span className="text-muted fs-1">📷</span>
                </div>
              )}
            </Col>

            {/* Product Details */}
            <Col md={6}>
              <Card.Body className="p-4 p-lg-5 d-flex flex-column h-100">
                {/* Category Badge */}
                {product.category && (
                  <Badge
                    bg="primary"
                    className="mb-3 align-self-start px-3 py-2"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {product.category}
                  </Badge>
                )}

                {/* Title */}
                <h2 className="fw-bold mb-3">{product.title}</h2>

                {/* Price */}
                <h3 className="text-primary fw-bold mb-4">
                  ₹{Number(product.price).toFixed(2)}
                </h3>

                {/* Divider */}
                <hr />

                {/* Description */}
                <div className="flex-grow-1">
                  <h5 className="fw-semibold mb-2">Description</h5>
                  <p className="text-muted" style={{ lineHeight: "1.8" }}>
                    {product.description || "No description available."}
                  </p>
                </div>

                {/* Product Info */}
                <div className="mb-4">
                  <Row className="g-3">
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded-3 text-center">
                        <small className="text-muted d-block">Product ID</small>
                        <strong className="small">{product.id.substring(0, 8)}...</strong>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="p-3 bg-light rounded-3 text-center">
                        <small className="text-muted d-block">Category</small>
                        <strong>{product.category || "N/A"}</strong>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-grow-1 fw-semibold py-2"
                    onClick={handleEdit}
                  >
                    ✏️ Edit Product
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="flex-grow-1 fw-semibold py-2"
                    onClick={handleDelete}
                  >
                    🗑️ Delete
                  </Button>
                </div>

                {/* Back Link */}
                <div className="text-center mt-3">
                  <Link
                    to="/products"
                    className="text-decoration-none text-muted small"
                  >
                    ← Back to all products
                  </Link>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default SingleProductPage;

```

---

## Step 25: src/pages/AddProductPage.jsx

**Description:** Page to add a new product.

**Code:**
```jsx
import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function AddProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(function (state) {
    return state.products;
  });

  function handleAdd(data) {
    dispatch(addProduct(data)).then(function () {
      navigate("/");
    });
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4" style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-4">Add New Product</h2>
        <ProductForm
          onSubmit={handleAdd}
          loading={products.loading}
        />
      </Container>
    </div>
  );
}

export default AddProductPage;

```

---

## Step 26: src/pages/EditProductPage.jsx

**Description:** Page to edit an existing product.

**Code:**
```jsx
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, updateProduct } from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

function EditProductPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(function (state) {
    return state.products;
  });

  const [product, setProduct] = useState(null);

  useEffect(function () {
    // If products not loaded yet, fetch them
    if (products.items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.items.length]);

  useEffect(function () {
    // Find the product by id
    const found = products.items.find(function (item) {
      return item.id === params.id;
    });
    if (found) {
      setProduct(found);
    }
  }, [products.items, params.id]);

  function handleUpdate(data) {
    dispatch(updateProduct(params.id, data)).then(function () {
      navigate("/");
    });
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4" style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-4">Edit Product</h2>

        {!product ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <ProductForm
            initialData={product}
            onSubmit={handleUpdate}
            loading={products.loading}
          />
        )}
      </Container>
    </div>
  );
}

export default EditProductPage;

```

---

## Step 27: src/pages/ViewProductsPage.jsx

**Description:** Page to browse all products.

**Code:**
```jsx
import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Spinner,
  Alert,
  Badge,
  Button,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchProducts,
  setSearch,
  setCategory,
  setSortBy,
} from "../store/actions/productActionTypes";
import Navbar from "../components/Navbar";

function ViewProductsPage() {
  const dispatch = useDispatch();
  const products = useSelector(function (state) {
    return state.products;
  });

  const items = products.items;
  const loading = products.loading;
  const error = products.error;
  const search = products.search;
  const category = products.category;
  const sortBy = products.sortBy;

  useEffect(function () {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get unique categories
  const categories = ["All"];
  items.forEach(function (item) {
    if (item.category && categories.indexOf(item.category) === -1) {
      categories.push(item.category);
    }
  });

  // Filter by search
  let filtered = items.filter(function (item) {
    if (!search) return true;
    return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  });

  // Filter by category
  if (category !== "All") {
    filtered = filtered.filter(function (item) {
      return item.category === category;
    });
  }

  // Sort
  if (sortBy === "price-asc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(a.price) - Number(b.price);
    });
  } else if (sortBy === "price-desc") {
    filtered = filtered.slice().sort(function (a, b) {
      return Number(b.price) - Number(a.price);
    });
  }

  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <Container className="py-4">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Browse Products</h2>
            <p className="text-muted mb-0">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>
          <Button as={Link} to="/" variant="outline-secondary" className="fw-semibold">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Search & Filter Toolbar */}
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={5}>
                <Form.Control
                  type="text"
                  placeholder="🔍 Search products by name..."
                  value={search}
                  onChange={function (e) {
                    dispatch(setSearch(e.target.value));
                  }}
                  size="lg"
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  value={category}
                  onChange={function (e) {
                    dispatch(setCategory(e.target.value));
                  }}
                  size="lg"
                >
                  {categories.map(function (cat) {
                    return (
                      <option key={cat} value={cat}>
                        {cat === "All" ? "All Categories" : cat}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={sortBy}
                  onChange={function (e) {
                    dispatch(setSortBy(e.target.value));
                  }}
                  size="lg"
                >
                  <option value="default">Sort By</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-3">Loading products...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-5">
            <h4 className="text-muted">No products found</h4>
            <p className="text-muted">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Products Grid */}
        <Row className="g-4">
          {filtered.map(function (product) {
            return (
              <Col key={product.id} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm border-0 product-view-card">
                  {product.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={product.imageUrl}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{product.title}</Card.Title>
                    <Card.Text className="text-primary fw-bold fs-5">
                      ₹{Number(product.price).toFixed(2)}
                    </Card.Text>
                    <Badge bg="secondary" className="mb-2 align-self-start">
                      {product.category}
                    </Badge>
                    {product.description && (
                      <Card.Text className="text-muted small flex-grow-1">
                        {product.description.length > 80
                          ? product.description.substring(0, 80) + "..."
                          : product.description}
                      </Card.Text>
                    )}
                    <Button
                      as={Link}
                      to={"/product/" + product.id}
                      variant="primary"
                      className="w-100 mt-auto fw-semibold"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Inline styles for hover effect */}
      <style>{"\
        .product-view-card { transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }\
        .product-view-card:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important; }\
      "}</style>
    </div>
  );
}

export default ViewProductsPage;

```

---
