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
