const initialState = {
  courses: [],
  cart: JSON.parse(localStorage.getItem("Cart")) || [],
  myLearning: JSON.parse(localStorage.getItem("MyLearning")) || [],
  course: null,
  isCreated: false,
  isUpdated: false
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return {
        ...state,
        isCreated: true
      };

    case "GET_ALL_COURSE":
      return {
        ...state,
        courses: action.payload,
        isCreated: false,
        isUpdated: false
      };

    case "GET_COURSE":
      return {
        ...state,
        course: action.payload,
      }

    case "UPDATE_COURSE":
      return {
        ...state,
        course: null,
        isUpdated: true
      };

    case "ADD_TO_CART":
      const newCart = [...state.cart, action.payload];
      localStorage.setItem("Cart", JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };

    case "REMOVE_FROM_CART":
      const filteredCart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem("Cart", JSON.stringify(filteredCart));
      return {
        ...state,
        cart: filteredCart,
      };

    case "PURCHASE_COURSES":
      const purchasedCourses = [...state.myLearning, ...state.cart];
      localStorage.setItem("MyLearning", JSON.stringify(purchasedCourses));
      localStorage.setItem("Cart", JSON.stringify([]));
      return {
        ...state,
        myLearning: purchasedCourses,
        cart: [],
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

export default CourseReducer;
