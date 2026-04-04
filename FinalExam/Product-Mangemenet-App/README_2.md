# 🛍️ ProductHub — Product Management App

A full-stack Product Management application built with **Vite + React**, **Firebase** (Auth & Firestore), **Cloudinary** (image uploads), **Redux + Redux-Thunk**, and **Bootstrap 5**.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 (Vite) |
| State Management | Redux + Redux-Thunk + React-Redux |
| Routing | React Router DOM v6 |
| Database | Firebase Firestore |
| Authentication | Firebase Auth (Email/Password + Google) |
| Image Storage | Cloudinary (unsigned upload preset) |
| UI / Styling | Bootstrap 5 + Bootstrap Icons |
| Notifications | React Toastify |

---

## 🗂️ Project Structure

```
product-management-app/
├── index.html
├── vite.config.js
├── package.json
├── .env                          ← your secrets (never commit this)
├── .env.example                  ← template showing required variables
└── src/
    ├── main.jsx                  ← app entry point
    ├── App.jsx                   ← routes + Firebase auth listener
    ├── index.css                 ← global styles & design tokens
    │
    ├── firebase/
    │   └── config.js             ← Firebase app, Auth, Firestore exports
    │
    ├── store/
    │   ├── index.js              ← createStore with combineReducers + thunk middleware
    │   ├── actions/
    │   │   ├── authActions.js    ← register / login / Google / logout thunks
    │   │   └── productActions.js ← fetch / add / update / delete thunks
    │   └── reducers/
    │       ├── rootReducer.js          ← combineReducers root
    │       ├── authReducer.js    ← handles auth action types
    │       └── productReducer.js ← handles product action types + UI filters
    │
    ├── utils/
    │   └── cloudinary.js         ← uploadImageToCloudinary(file) helper
    │
    ├── components/
    │   ├── Navbar.jsx            ← responsive nav with auth state
    │   ├── ProductList.jsx       ← grid of products + toolbar
    │   ├── ProductItem.jsx       ← single product card with edit/delete
    │   ├── ProductForm.jsx       ← add/edit form with Cloudinary image upload
    │   └── PrivateRoute.jsx      ← redirects unauthenticated users to /login
    │
    └── pages/
        ├── LoginPage.jsx         ← email/password + Google sign-in
        ├── RegisterPage.jsx      ← new account creation
        ├── ProductsPage.jsx      ← main dashboard (search, filter, sort)
        └── EditProductPage.jsx   ← pre-filled edit form
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

> All variables must start with `VITE_` so Vite exposes them to the browser.

---

## 🔥 Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/) → **Add project**
2. Copy the config object into your `.env` file

### 2. Enable Authentication
1. **Authentication → Sign-in method**
2. Enable **Email/Password**
3. Enable **Google**

### 3. Enable Firestore
1. **Firestore Database → Create database**
2. Start in **test mode** (update rules before production)
3. Products are stored in the `products` collection with these fields:

| Field | Type | Description |
|---|---|---|
| `title` | string | Product name |
| `price` | number | Price in USD |
| `category` | string | e.g. Electronics, Clothing |
| `description` | string | Optional product description |
| `imageUrl` | string | Cloudinary secure URL |
| `createdAt` | timestamp | Auto-set via serverTimestamp() |
| `updatedAt` | timestamp | Set on every update |

### 4. Firestore Security Rules (recommended)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## ☁️ Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload presets**
3. Click **Add upload preset**
4. Set **Signing mode** to `Unsigned`
5. Note the **Preset name** → paste into `VITE_CLOUDINARY_UPLOAD_PRESET`
6. Your **Cloud name** is shown on the Dashboard → paste into `VITE_CLOUDINARY_CLOUD_NAME`

Images are uploaded to the `product-management/` folder in your Cloudinary account and the returned `secure_url` is saved in Firestore.

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/product-management-app.git
cd product-management-app

# 2. Install dependencies
npm install

# 3. Add your environment variables
cp .env.example .env
# → fill in Firebase + Cloudinary values

# 4. Start the dev server
npm run dev
```

App runs at `http://localhost:5173`

---

## 📋 Features

### 🔐 Authentication (Firebase Auth)
- Register with **name, email & password**
- Login with **email/password**
- Login with **Google (OAuth popup)**
- Persistent session via `onAuthStateChanged`
- Protected routes via `<PrivateRoute>` — unauthenticated users are redirected to `/login`
- Sign out clears Redux state

### 📦 Product CRUD (Firestore)
- **Add** a product with title, price, category, description, and image
- **Edit** any product — form pre-filled with existing data
- **Delete** a product with confirmation prompt
- All changes sync to Firestore in real time

### 🖼️ Image Upload (Cloudinary)
- File picker in the product form
- Preview before submitting
- Uploaded via unsigned preset — no server needed
- Secure URL stored in Firestore

### 🔍 Search, Filter & Sort
- **Search** by product title (case-insensitive, live)
- **Filter** by category (dynamically built from existing products)
- **Sort** by price: Low → High or High → Low
- All three work together simultaneously

### 🎨 UI
- Responsive **Bootstrap 5** grid layout
- Custom design tokens (navy + amber color scheme)
- Product cards with image hover zoom
- Toast notifications for all actions (success / error)
- Loading spinners during async operations

---

## 📜 Available Scripts

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

---

## 🗺️ Routes

| Path | Component | Protected |
|---|---|---|
| `/login` | LoginPage | No |
| `/register` | RegisterPage | No |
| `/` | ProductsPage | ✅ Yes |
| `/add` | ProductForm | ✅ Yes |
| `/edit/:id` | EditProductPage | ✅ Yes |

---

## 🔄 Redux State Shape

```js
{
  auth: {
    user: { uid, email, displayName, photoURL } | null,
    loading: boolean,
    error: string | null,
    initialized: boolean
  },
  products: {
    items: Product[],
    loading: boolean,
    error: string | null,
    search: string,
    category: string,    // "All" by default
    sortBy: string       // "default" | "price-asc" | "price-desc"
  }
}
```

---

## 🚫 Removed from Original Spec

| Removed | Reason |
|---|---|
| `json-server` / `db.json` | Replaced entirely by **Firebase Firestore** |
| `Create React App` | Replaced by **Vite** (faster, modern) |
| `@reduxjs/toolkit` | Using **core Redux** (`redux` + `redux-thunk`) as required |

---

## ✅ Dependencies

```json
"dependencies": {
  "redux": "^5.x",
  "redux-thunk": "^3.x",
  "react-redux": "^9.x",
  "bootstrap": "^5.3.x",
  "bootstrap-icons": "^1.11.x",
  "firebase": "^10.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "react-toastify": "^10.x"
}
```

---

## 📄 License

MIT
