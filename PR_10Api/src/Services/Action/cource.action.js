import axios from "axios";

let BASE_URL = "http://localhost:3000/courses";

export const addCourse = (course) => {
  return {
    type: "ADD_COURSE",
  };
};

export const getAllCourse = (data) => {
  return {
    type: "GET_ALL_COURSE",
    payload: data
  }
}

export const getCourse = (data) => {
  return {
    type: "GET_COURSE",
    payload: data
  }
}

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

export const getCart = (data) => {
  return {
    type: "GET_CART",
    payload: data,
  };
};

export const getMyLearning = (data) => {
  return {
    type: "GET_MY_LEARNING",
    payload: data,
  };
};

export const addForm = (course) => {
  return {
    type: "ADD_FORM",
    payload: course,
  };
};

export const getCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`${BASE_URL}/${id}`);
      dispatch(getCourse(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};


export const getAllCourseAsync = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(BASE_URL);
      console.log(res.data);
      dispatch(getAllCourse(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const deleteCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`${BASE_URL}/${id}`);
      console.log(res.data);
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log(error);
    }
  }
};

export const updateCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.put(`${BASE_URL}/${data.id}`, data);
      console.log(res.data);
      dispatch(updateCourse(res.data));
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log(error);
    }
  }
};

export const addCourseAsync = (data) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${BASE_URL}/`, data);
      dispatch(addCourse());
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log(error);
    }
  }
};

/* --- Cart & MyLearning Async Actions --- */

export const getCartAsync = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get("http://localhost:3000/cart");
      dispatch(getCart(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const addToCartAsync = (course) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3000/cart", course);
      dispatch(getCartAsync());
    } catch (error) {
      console.log(error);
    }
  }
};

export const removeFromCartAsync = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`);
      dispatch(getCartAsync());
    } catch (error) {
      console.log(error);
    }
  }
};

export const getMyLearningAsync = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get("http://localhost:3000/myLearning");
      dispatch(getMyLearning(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};

export const purchaseCoursesAsync = (cartItems) => {
  return async (dispatch) => {
    try {
      for (const item of cartItems) {
        // Add to My Learning
        await axios.post("http://localhost:3000/myLearning", item);
        // Remove from Cart
        await axios.delete(`http://localhost:3000/cart/${item.id}`);
      }
      dispatch(getCartAsync());
      dispatch(getMyLearningAsync());
    } catch (error) {
      console.log(error);
    }
  }
};