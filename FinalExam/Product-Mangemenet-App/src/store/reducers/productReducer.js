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
