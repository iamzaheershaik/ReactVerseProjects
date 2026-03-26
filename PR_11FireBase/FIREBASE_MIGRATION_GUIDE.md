# 🔥 Firebase Cloud Firestore Migration Guide — Remove JSON Server & Implement Firestore

> **Goal:** Replace `json-server` with **Firebase Cloud Firestore** in our Udemy-clone React-Redux project, set up `combineReducers`, and keep all existing features (Courses, Teachers, Cart, My Learning) working.

---

## Table of Contents

1. [Step 1 — Create a Firebase Account & Project](#step-1--create-a-firebase-account--project)
2. [Step 2 — Create the Cloud Firestore Database](#step-2--create-the-cloud-firestore-database)
3. [Step 3 — Add Existing Data to Firestore](#step-3--add-existing-data-to-firestore)
4. [Step 4 — Remove JSON Server from Your Project](#step-4--remove-json-server-from-your-project)
5. [Step 5 — Install Firebase SDK in Your Project](#step-5--install-firebase-sdk-in-your-project)
6. [Step 6 — Create the Firebase Config File](#step-6--create-the-firebase-config-file)
7. [Step 7 — Delete `api.js` (No Longer Needed)](#step-7--delete-apijs-no-longer-needed)
8. [Step 8 — Create `combineReducers` (Root Reducer)](#step-8--create-combinereducers-root-reducer)
9. [Step 9 — Split & Update Reducers](#step-9--split--update-reducers)
10. [Step 10 — Update the Redux Store](#step-10--update-the-redux-store)
11. [Step 11 — Rewrite Action Files for Firestore](#step-11--rewrite-action-files-for-firestore)
12. [Step 12 — Update `useSelector` in ALL Components](#step-12--update-useselector-in-all-components)
13. [Step 13 — Verify Everything Works](#step-13--verify-everything-works)
14. [Complete File Structure After Migration](#complete-file-structure-after-migration)

---

## Step 1 — Create a Firebase Account & Project

### 1.1 Go to Firebase Console

Open your browser and go to: **https://console.firebase.google.com**

### 1.2 Sign in with Google

- Click **"Sign in"** (top-right corner)
- Use your **Gmail account** to sign in
- If you don't have a Gmail account → create one at https://accounts.google.com

### 1.3 Create a New Project

1. Click **"Create a project"** (or **"Add project"**)
2. **Project name:** Type `udemy-cloned` (or any name you want)
3. Click **Continue**
4. **Google Analytics:** You can **disable** it (toggle OFF) — it's not needed for this project
5. Click **"Create Project"**
6. Wait for the project to be created → Click **"Continue"**

### 1.4 Register a Web App

1. On the Project Overview page, click the **Web icon** `</>` (looks like `</>`)
2. **App nickname:** Type `udemy-clone-web`
3. ❌ Do NOT check "Also set up Firebase Hosting" (not needed)
4. Click **"Register app"**
5. 🔑 **COPY the Firebase config object** — you will need it later. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...........",
  authDomain: "udemy-cloned.firebaseapp.com",
  projectId: "udemy-cloned",
  storageBucket: "udemy-cloned.firebasestorage.app",
  messagingSenderId: "609953392950",
  appId: "1:609953392950:web:05b72ec65a776b9c6beb97"
};
```

6. Click **"Continue to console"**

> [!IMPORTANT]
> Save this config somewhere safe. You'll paste it into your project in Step 6.

---

## Step 2 — Create the Cloud Firestore Database

### 2.1 Open Cloud Firestore

1. In the Firebase Console sidebar (left side), click **"Build"** → **"Firestore Database"**
2. Click **"Create database"**

### 2.2 Choose Location

- Select the closest location to you (e.g., `asia-south1 (Mumbai)` for India)
- Click **"Next"**

### 2.3 Set Security Rules

- For **development**, select **"Start in test mode"**
  - This allows full read/write access for 30 days
  - ⚠️ Remember to update rules before going to production!
- Click **"Create"**

> [!WARNING]
> **Test mode** allows anyone to read/write your database. This is fine for learning, but you MUST update the rules before deploying a real application.

### Understanding Firestore Structure

Firestore is a **NoSQL document database**. It organizes data as:

```
Firestore
  └── Collection (like a table): "courses"
        └── Document (like a row): "TEhH1UdLTxQ"
              └── Fields (like columns): title, price, rating, ...
        └── Document: "cgVGGZWg7Ys"
              └── Fields: title, price, rating, ...
  └── Collection: "teachers"
        └── Document: "J4hnYo_W2Xs"
              └── Fields: firstName, lastName, email, ...
  └── Collection: "cart"
  └── Collection: "myLearning"
```

**Key difference from JSON Server:**
- JSON Server uses **arrays** `[ {}, {}, {} ]`
- Firestore uses **Collections** containing **Documents** (each document has a unique ID)

---

## Step 3 — Data Will Be Added From the App UI

No need to manually add data to Firestore. When you use the **Add Course** or **Add Teacher** forms in the app, Firestore will **automatically create the collections** (`courses`, `teachers`, `cart`, `myLearning`) the first time you add data.

> [!NOTE]
> Firestore creates collections and documents on-the-fly — you don't need to pre-create them.

---

## Step 4 — Remove JSON Server from Your Project

### 4.1 Uninstall Packages

Open your terminal in the project root and run:

```bash
npm uninstall json-server concurrently axios
```

### 4.2 Update the `dev` Script in `package.json`

**Before** (`package.json` line 7):
```json
"dev": "concurrently \"vite\" \"json-server --watch db.json --port 3000\"",
```

**After:**
```json
"dev": "vite",
```

### 4.3 Delete `db.json`

You can now delete the `db.json` file from the project root — all data is in Firestore now.

```bash
rm db.json
```

> [!TIP]
> After these changes, your `package.json` scripts should look like:
> ```json
> "scripts": {
>   "dev": "vite",
>   "build": "vite build",
>   "lint": "eslint .",
>   "preview": "vite preview"
> }
> ```

---

## Step 5 — Install Firebase SDK in Your Project

Run in your terminal:

```bash
npm install firebase
```

This installs the official Firebase JavaScript SDK.

---

## Step 6 — Create the Firebase Config File

Create a new file: **`src/Services/firebase.js`**

```javascript
// src/Services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2E61f9MwaWRzbRLjgrwhN-puA-ApO5rY",
  authDomain: "udemy-cloned.firebaseapp.com",
  projectId: "udemy-cloned",
  storageBucket: "udemy-cloned.firebasestorage.app",
  messagingSenderId: "609953392950",
  appId: "1:609953392950:web:05b72ec65a776b9c6beb97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export
const db = getFirestore(app);

export default db;
```

### What Each Line Does:

| Line | Explanation |
|---|---|
| `initializeApp(firebaseConfig)` | Connects your app to your Firebase project |
| `getFirestore(app)` | Creates a Firestore database instance |
| `export default db` | Makes `db` available for import in action files |

> [!NOTE]
> We import `getFirestore` (NOT `getDatabase`). `getFirestore` = Cloud Firestore. `getDatabase` = Realtime Database. These are two **different products**.

---

## Step 7 — Delete `api.js` (No Longer Needed)

Since we're using Firebase directly, the old `api.js` (which pointed to `localhost:3000`) is no longer needed.

**Delete:** `src/Services/api.js`

```bash
rm src/Services/api.js
```

---

## Step 8 — Create `combineReducers` (Root Reducer)

### Why do we need `combineReducers`?

Right now, your `Store.js` uses **only one reducer** (`CourseReducer`), and that single reducer handles **everything** — courses, teachers, cart, my learning. This makes the reducer big and messy.

`combineReducers` lets you **split** your state into multiple smaller reducers, each managing its own piece of state.

### Create: `src/Services/Reducer/rootReducer.js`

```javascript
// src/Services/Reducer/rootReducer.js
import { combineReducers } from "redux";
import courseReducer from "./CourseReducer";
import teacherReducer from "./teacherReducer";

// combineReducers merges multiple reducers into one
// Each reducer manages its own slice of the state
const rootReducer = combineReducers({
  courseState: courseReducer,     // state.courseState.courses, state.courseState.cart, etc.
  teacherState: teacherReducer,  // state.teacherState.teachers, state.teacherState.teacher
});

export default rootReducer;
```

### What is `combineReducers`? (Detailed Explanation)

```
WITHOUT combineReducers (Current — ONE big reducer):
┌──────────────────────────────────────┐
│  state = {                           │
│    courses: [],   ← CourseReducer    │
│    cart: [],      ← CourseReducer    │
│    myLearning: [],← CourseReducer    │
│    teachers: [],  ← CourseReducer    │  ← Everything in ONE reducer!
│    teacher: {},   ← CourseReducer    │
│  }                                   │
└──────────────────────────────────────┘

WITH combineReducers (After — SPLIT into separate reducers):
┌──────────────────────────────────────┐
│  state = {                           │
│    courseState: {    ← courseReducer  │
│      courses: [],                    │
│      cart: [],                       │
│      myLearning: [],                 │
│      course: null,                   │
│      isCreated: false,               │
│      isUpdated: false,               │
│    },                                │
│    teacherState: {  ← teacherReducer │
│      teachers: [],                   │
│      teacher: {},                    │
│    }                                 │
│  }                                   │
└──────────────────────────────────────┘
```

### How Does It Change `useSelector`?

**Before (single reducer):**
```javascript
const courses = useSelector((state) => state.courses);
const teachers = useSelector((state) => state.teachers);
```

**After (with combineReducers):**
```javascript
const courses = useSelector((state) => state.courseState.courses);
const teachers = useSelector((state) => state.teacherState.teachers);
```

> [!IMPORTANT]
> After setting up `combineReducers`, you MUST update **every `useSelector`** call in your components to use the new path.

---

## Step 9 — Split & Update Reducers

### 9.1 Update `CourseReducer.js`

Now `CourseReducer` should only handle **course, cart, and myLearning** state — NOT teacher state.

Replace `src/Services/Reducer/CourseReducer.js` with:

```javascript
// src/Services/Reducer/CourseReducer.js

const initialState = {
  courses: [],
  cart: [],
  myLearning: [],
  course: null,
  isCreated: false,
  isUpdated: false,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return {
        ...state,
        isCreated: true,
      };

    case "GET_ALL_COURSE":
      return {
        ...state,
        courses: action.payload,
        isCreated: false,
        isUpdated: false,
      };

    case "GET_COURSE":
      return {
        ...state,
        course: action.payload,
      };

    case "UPDATE_COURSE":
      return {
        ...state,
        course: null,
        isUpdated: true,
      };

    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "GET_MY_LEARNING":
      return {
        ...state,
        myLearning: action.payload,
      };

    case "ADD_FORM":
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };

    default:
      return state;
  }
};

export default courseReducer;
```

**What changed:** Removed the `GET_ALL_TEACHER` and `GET_TEACHER` cases (those now belong in `teacherReducer.js`).

### 9.2 The `teacherReducer.js` (Already Exists — No Changes Needed)

Your existing `teacherReducer.js` is already correct:

```javascript
// src/Services/Reducer/teacherReducer.js (NO CHANGES NEEDED)

const initialState = {
  teachers: [],
  teacher: {},
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_TEACHER":
      return { ...state, teachers: action.payload };

    case "GET_TEACHER":
      return { ...state, teacher: action.payload };

    default:
      return state;
  }
};

export default teacherReducer;
```

---

## Step 10 — Update the Redux Store

Replace `src/Services/Store.js` with:

```javascript
// src/Services/Store.js
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./Reducer/rootReducer";

const store = createStore(
  rootReducer,          // ← Use the combined root reducer
  applyMiddleware(thunk),
);

export default store;
```

**What changed:** Replaced `CourseReducer` with `rootReducer`.

---

## Step 11 — Rewrite Action Files for Firestore

This is the **biggest change**. We replace all `axios` calls with **Firestore** methods.

### Firestore Methods You'll Use

| Firestore Method | What It Does | Replaces |
|---|---|---|
| `collection(db, "name")` | Points to a collection (like a table) | URL path |
| `doc(db, "collection", "id")` | Points to a specific document | URL + id |
| `getDocs(collection)` | Get ALL documents from a collection | `axios.get(URL)` |
| `getDoc(doc)` | Get ONE document by ID | `axios.get(URL/id)` |
| `addDoc(collection, data)` | Add a new document (auto ID) | `axios.post()` |
| `setDoc(doc, data)` | Set/overwrite a document (your own ID) | `axios.put()` |
| `updateDoc(doc, data)` | Partially update a document | `axios.patch()` |
| `deleteDoc(doc)` | Delete a document | `axios.delete()` |

### 11.1 Rewrite `cource.action.js`

Replace `src/Services/Action/cource.action.js` with:

```javascript
// src/Services/Action/cource.action.js
import db from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

/* ============================================= */
/*           SYNC ACTION CREATORS                */
/* ============================================= */

export const addCourse = () => {
  return { type: "ADD_COURSE" };
};

export const getAllCourse = (data) => {
  return { type: "GET_ALL_COURSE", payload: data };
};

export const getCourse = (data) => {
  return { type: "GET_COURSE", payload: data };
};

export const updateCourse = (course) => {
  return { type: "UPDATE_COURSE", payload: course };
};

export const deleteCourse = (id) => {
  return { type: "DELETE_COURSE", payload: id };
};

export const getCart = (data) => {
  return { type: "GET_CART", payload: data };
};

export const getMyLearning = (data) => {
  return { type: "GET_MY_LEARNING", payload: data };
};

export const addForm = (course) => {
  return { type: "ADD_FORM", payload: course };
};

/* ============================================= */
/*      ASYNC ACTION CREATORS  (Firestore)       */
/* ============================================= */

// Helper: Convert Firestore QuerySnapshot to an array
// Firestore returns a snapshot object, we need a normal array for React
const snapshotToArray = (snapshot) => {
  const arr = [];
  snapshot.forEach((docSnap) => {
    arr.push({ ...docSnap.data(), id: docSnap.id });
  });
  return arr;
};

/* ---------- COURSES ---------- */

// GET ALL COURSES
export const getAllCourseAsync = () => {
  return async (dispatch) => {
    try {
      const coursesCol = collection(db, "courses");   // Points to "courses" collection
      const snapshot = await getDocs(coursesCol);      // Fetches all documents
      const coursesArray = snapshotToArray(snapshot);   // Converts to array
      console.log("Fetched courses:", coursesArray);
      dispatch(getAllCourse(coursesArray));
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };
};

// GET SINGLE COURSE
export const getCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", id);       // Points to specific document
      const snapshot = await getDoc(courseDoc);        // Fetches that document
      if (snapshot.exists()) {                         // Check if document exists
        dispatch(getCourse({ ...snapshot.data(), id: snapshot.id }));
      }
    } catch (error) {
      console.log("Error fetching course:", error);
    }
  };
};

// ADD NEW COURSE
export const addCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      const coursesCol = collection(db, "courses");
      // addDoc() generates a unique ID automatically
      const docRef = await addDoc(coursesCol, data);
      console.log("Course added with ID:", docRef.id);
      // Update the document to include its own ID as a field
      await setDoc(doc(db, "courses", docRef.id), { ...data, id: docRef.id });
      dispatch(addCourse());
      dispatch(getAllCourseAsync());                    // Refresh the list
    } catch (error) {
      console.log("Error adding course:", error);
    }
  };
};

// UPDATE COURSE
export const updateCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", data.id);
      await setDoc(courseDoc, data);                   // Overwrite the document
      console.log("Course updated:", data);
      dispatch(updateCourse(data));
      dispatch(getAllCourseAsync());                    // Refresh the list
    } catch (error) {
      console.log("Error updating course:", error);
    }
  };
};

// DELETE COURSE
export const deleteCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      const courseDoc = doc(db, "courses", id);
      await deleteDoc(courseDoc);                      // Delete the document
      console.log("Course deleted:", id);
      dispatch(getAllCourseAsync());                    // Refresh the list
    } catch (error) {
      console.log("Error deleting course:", error);
    }
  };
};

/* ---------- CART ---------- */

// GET CART
export const getCartAsync = () => {
  return async (dispatch) => {
    try {
      const cartCol = collection(db, "cart");
      const snapshot = await getDocs(cartCol);
      const cartArray = snapshotToArray(snapshot);
      dispatch(getCart(cartArray));
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };
};

// ADD TO CART
export const addToCartAsync = (course) => {
  return async (dispatch) => {
    try {
      // Use the course ID as the document ID (prevents duplicates)
      const cartDoc = doc(db, "cart", course.id);
      await setDoc(cartDoc, course);
      dispatch(getCartAsync());                        // Refresh cart
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };
};

// REMOVE FROM CART
export const removeFromCartAsync = (id) => {
  return async (dispatch) => {
    try {
      const cartDoc = doc(db, "cart", id);
      await deleteDoc(cartDoc);
      dispatch(getCartAsync());                        // Refresh cart
    } catch (error) {
      console.log("Error removing from cart:", error);
    }
  };
};

/* ---------- MY LEARNING ---------- */

// GET MY LEARNING
export const getMyLearningAsync = () => {
  return async (dispatch) => {
    try {
      const myLearningCol = collection(db, "myLearning");
      const snapshot = await getDocs(myLearningCol);
      const learningArray = snapshotToArray(snapshot);
      dispatch(getMyLearning(learningArray));
    } catch (error) {
      console.log("Error fetching My Learning:", error);
    }
  };
};

// PURCHASE (Move items from Cart → My Learning)
export const purchaseCoursesAsync = (cartItems) => {
  return async (dispatch) => {
    try {
      for (const item of cartItems) {
        // 1. Add to myLearning collection
        const learningDoc = doc(db, "myLearning", item.id);
        await setDoc(learningDoc, item);

        // 2. Remove from cart collection
        const cartDoc = doc(db, "cart", item.id);
        await deleteDoc(cartDoc);
      }
      dispatch(getCartAsync());
      dispatch(getMyLearningAsync());
    } catch (error) {
      console.log("Error purchasing courses:", error);
    }
  };
};
```

### 11.2 Rewrite `teacher.action.js`

Replace `src/Services/Action/teacher.action.js` with:

```javascript
// src/Services/Action/teacher.action.js
import db from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

/* ============================================= */
/*           SYNC ACTION CREATORS                */
/* ============================================= */

export const addTeacher = () => {
  return { type: "ADD_TEACHER" };
};

export const getAllTeacher = (data) => {
  return { type: "GET_ALL_TEACHER", payload: data };
};

export const getTeacher = (data) => {
  return { type: "GET_TEACHER", payload: data };
};

export const updateTeacher = (teacher) => {
  return { type: "UPDATE_TEACHER", payload: teacher };
};

export const deleteTeacher = (id) => {
  return { type: "DELETE_TEACHER", payload: id };
};

/* ============================================= */
/*       ASYNC ACTION CREATORS (Firestore)       */
/* ============================================= */

// Helper: Convert Firestore QuerySnapshot to an array
const snapshotToArray = (snapshot) => {
  const arr = [];
  snapshot.forEach((docSnap) => {
    arr.push({ ...docSnap.data(), id: docSnap.id });
  });
  return arr;
};

// GET ALL TEACHERS
export const getAllTeacherAsync = () => {
  return async (dispatch) => {
    try {
      const teachersCol = collection(db, "teachers");
      const snapshot = await getDocs(teachersCol);
      const teachersArray = snapshotToArray(snapshot);
      dispatch(getAllTeacher(teachersArray));
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  };
};

// GET SINGLE TEACHER
export const getTeacherAsync = (id) => {
  return async (dispatch) => {
    try {
      const teacherDoc = doc(db, "teachers", id);
      const snapshot = await getDoc(teacherDoc);
      if (snapshot.exists()) {
        dispatch(getTeacher({ ...snapshot.data(), id: snapshot.id }));
      }
    } catch (error) {
      console.log("Error fetching teacher:", error);
    }
  };
};

// ADD NEW TEACHER
export const addTeacherAsync = (data) => {
  return async (dispatch) => {
    try {
      const teachersCol = collection(db, "teachers");
      const docRef = await addDoc(teachersCol, data);
      // Update document to include its own ID
      await setDoc(doc(db, "teachers", docRef.id), { ...data, id: docRef.id });
      dispatch(addTeacher());
      dispatch(getAllTeacherAsync());
    } catch (error) {
      console.log("Error adding teacher:", error);
    }
  };
};

// DELETE TEACHER
export const deleteTeacherAsync = (id) => {
  return async (dispatch) => {
    try {
      const teacherDoc = doc(db, "teachers", id);
      await deleteDoc(teacherDoc);
      dispatch(getAllTeacherAsync());
    } catch (error) {
      console.log("Error deleting teacher:", error);
    }
  };
};

// UPDATE TEACHER
export const updateTeacherAsync = (data) => {
  return async (dispatch) => {
    try {
      const teacherDoc = doc(db, "teachers", data.id);
      await setDoc(teacherDoc, data);
      dispatch(updateTeacher(data));
      dispatch(getAllTeacherAsync());
    } catch (error) {
      console.log("Error updating teacher:", error);
    }
  };
};
```

---

## Step 12 — Update `useSelector` in ALL Components

Since we now use `combineReducers`, the state shape has changed. Here's what you need to update in **every component** that uses `useSelector`:

### Before vs After Cheat Sheet

| Before (Old) | After (New) |
|---|---|
| `state.courses` | `state.courseState.courses` |
| `state.course` | `state.courseState.course` |
| `state.cart` | `state.courseState.cart` |
| `state.myLearning` | `state.courseState.myLearning` |
| `state.isCreated` | `state.courseState.isCreated` |
| `state.isUpdated` | `state.courseState.isUpdated` |
| `state.teachers` | `state.teacherState.teachers` |
| `state.teacher` | `state.teacherState.teacher` |

### Example Component Update

**Before:**
```javascript
const courses = useSelector((state) => state.courses);
const cart = useSelector((state) => state.cart);
const teachers = useSelector((state) => state.teachers);
```

**After:**
```javascript
const courses = useSelector((state) => state.courseState.courses);
const cart = useSelector((state) => state.courseState.cart);
const teachers = useSelector((state) => state.teacherState.teachers);
```

### Components That Need Updating

| Component Folder | What to Update |
|---|---|
| `components/ViewCourses/` | `state.courses` → `state.courseState.courses` |
| `components/CourseDetails/` | `state.course` → `state.courseState.course` |
| `components/AddCourse/` | `state.isCreated` → `state.courseState.isCreated` |
| `components/EditCourse/` | `state.course`, `state.isUpdated` → prefix with `state.courseState.` |
| `components/Cart/` | `state.cart` → `state.courseState.cart` |
| `components/MyLearning/` | `state.myLearning` → `state.courseState.myLearning` |
| `components/Teach/` | `state.teachers` → `state.teacherState.teachers` |

---

## Step 13 — Verify Everything Works

Run the project:

```bash
npm run dev
```

### Checklist

- [ ] App loads without errors in the console
- [ ] Courses are displayed (fetched from Firestore)
- [ ] Can add a new course (appears in Firestore Console)
- [ ] Can edit a course
- [ ] Can delete a course
- [ ] Can add courses to cart
- [ ] Can purchase courses (moves from cart → My Learning)
- [ ] Teachers page works (fetched from Firestore)
- [ ] Can add/edit/delete teachers
- [ ] Open Firebase Console → Firestore Database — data updates live!

---

## Complete File Structure After Migration

```
PR_11FireBase/
├── src/
│   ├── Services/
│   │   ├── firebase.js              ← NEW: Firebase config & Firestore initialization
│   │   ├── Store.js                 ← MODIFIED: Now uses rootReducer
│   │   ├── Action/
│   │   │   ├── cource.action.js     ← MODIFIED: Uses Firestore instead of axios
│   │   │   └── teacher.action.js    ← MODIFIED: Uses Firestore instead of axios
│   │   └── Reducer/
│   │       ├── rootReducer.js       ← NEW: combineReducers file
│   │       ├── CourseReducer.js     ← MODIFIED: Removed teacher cases
│   │       └── teacherReducer.js    ← UNCHANGED
│   ├── components/
│   │   ├── ViewCourses/             ← UPDATE useSelector paths
│   │   ├── CourseDetails/           ← UPDATE useSelector paths
│   │   ├── AddCourse/               ← UPDATE useSelector paths
│   │   ├── EditCourse/              ← UPDATE useSelector paths
│   │   ├── Cart/                    ← UPDATE useSelector paths
│   │   ├── MyLearning/              ← UPDATE useSelector paths
│   │   ├── Teach/                   ← UPDATE useSelector paths
│   │   └── ...
│   └── ...
├── firebase.config.js               ← CAN DELETE (replaced by src/Services/firebase.js)
├── package.json                     ← MODIFIED: Removed json-server, added firebase
└── (db.json — DELETED)
```

---

## Quick Summary of All Changes

| File | Action | What Changed |
|---|---|---|
| `package.json` | MODIFY | Remove json-server, concurrently, axios; add firebase; update dev script |
| `db.json` | DELETE | Data is now in Firestore |
| `src/Services/api.js` | DELETE | No longer needed (using Firestore SDK directly) |
| `src/Services/firebase.js` | NEW | Firebase initialization & Firestore `db` export |
| `src/Services/Store.js` | MODIFY | Import `rootReducer` instead of `CourseReducer` |
| `src/Services/Reducer/rootReducer.js` | NEW | `combineReducers` with `courseState` & `teacherState` |
| `src/Services/Reducer/CourseReducer.js` | MODIFY | Remove teacher-related cases |
| `src/Services/Reducer/teacherReducer.js` | NO CHANGE | Already correct |
| `src/Services/Action/cource.action.js` | MODIFY | Replace all axios calls with Firestore methods |
| `src/Services/Action/teacher.action.js` | MODIFY | Replace all axios calls with Firestore methods |
| All components with `useSelector` | MODIFY | Update state paths to include `courseState` / `teacherState` |

---

## JSON Server vs Firestore — Comparison

| Feature | JSON Server (Old) | Cloud Firestore (New) |
|---|---|---|
| Where data lives | Your computer (`db.json`) | Google cloud servers |
| Needs separate server | ✅ Yes (`json-server` command) | ❌ No (built into Firebase SDK) |
| Works after PC shutdown | ❌ No (server stops) | ✅ Yes (cloud database) |
| Data format | JSON arrays `[{}, {}]` | Collections → Documents → Fields |
| How you read data | `axios.get("http://localhost:3000/courses")` | `getDocs(collection(db, "courses"))` |
| How you write data | `axios.post(URL, data)` | `addDoc(collection, data)` or `setDoc(doc, data)` |
| How you delete data | `axios.delete(URL)` | `deleteDoc(doc(db, "collection", id))` |
| Free to use | ✅ Yes | ✅ Yes (generous free tier) |

---

> **🎉 Congratulations!** Your project is now powered by Firebase Cloud Firestore. No more starting a separate JSON server — Firestore runs in the cloud 24/7!
