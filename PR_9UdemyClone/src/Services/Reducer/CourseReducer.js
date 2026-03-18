const initialState = {
  courses: JSON.parse(localStorage.getItem("Courses")) || [],
  cart: JSON.parse(localStorage.getItem("Cart")) || [],
  myLearning: JSON.parse(localStorage.getItem("MyLearning")) || [],
  course: null,
};

const CourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      const addedCourses = [...state.courses, action.payload];
      localStorage.setItem("Courses", JSON.stringify(addedCourses));
      return {
        ...state,
        courses: addedCourses,
      };

    case "UPDATE_COURSE":
      let updatedData = JSON.parse(localStorage.getItem("Courses")) || [];

      updatedData = updatedData.map((course) => {
        if (course.id == action.payload.id) {
          return action.payload;
        } else {
          return course;
        }
      });

      localStorage.setItem("Courses", JSON.stringify(updatedData));

      return {
        ...state,
        courses: updatedData,
      };

    case "DELETE_COURSE":
      const remainingCourses = state.courses.filter((course) => course.id !== action.payload);
      localStorage.setItem("Courses", JSON.stringify(remainingCourses));
      return {
        ...state,
        courses: remainingCourses,
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

    default:
      return state;
  }
};

export default CourseReducer;
