export const addCourse = (course) => {
  return {
    type: "ADD_COURSE",
    payload: course,
  };
};

export const updateCourse = (course) => {
  return {
    type: "UPDATE_COURSE",
    payload: course,
  };
};

export const deleteCourse = (id) => {
  return {
    type: "DELETE_COURSE",
    payload: id,
  };
};

export const addToCart = (course) => {
  return {
    type: "ADD_TO_CART",
    payload: course,
  };
};

export const removeFromCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: id,
  };
};

export const purchaseCourses = () => {
  return {
    type: "PURCHASE_COURSES",
  };
};
