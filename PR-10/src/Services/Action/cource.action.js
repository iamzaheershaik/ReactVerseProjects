import axios from "axios";

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

export const addForm = (course) => {
  return {
    type: "ADD_FORM",
    payload: course,
  };
};export const getCourseAsync = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3000/courses/${id}`);
      dispatch(getCourse(res.data));
    } catch (error) {
      console.log(error);
    }
  }
};


export const getAllCourseAsync = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`http://localhost:3000/courses`);
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
      let res = await axios.delete(`http://localhost:3000/courses/${id}`);
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
      let res = await axios.put(`http://localhost:3000/courses/${data.id}`, data);
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
      let res = await axios.post(`http://localhost:3000/courses/`, data);
      dispatch(addCourse());
      dispatch(getAllCourseAsync());
    } catch (error) {
      console.log(error);
    }
  }
};