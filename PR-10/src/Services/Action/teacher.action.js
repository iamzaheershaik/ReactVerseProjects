import axios from "axios";

/* ---------------- ACTIONS ---------------- */

export const addTeacher = () => {
    return {
        type: "ADD_TEACHER",
    };
};

export const getAllTeacher = (data) => {
    return {
        type: "GET_ALL_TEACHER",
        payload: data,
    };
};

export const getTeacher = (data) => {
    return {
        type: "GET_TEACHER",
        payload: data,
    };
};

export const updateTeacher = (teacher) => {
    return {
        type: "UPDATE_TEACHER",
        payload: teacher,
    };
};

export const deleteTeacher = (id) => {
    return {
        type: "DELETE_TEACHER",
        payload: id,
    };
};


const API = "http://localhost:3000/teachers";

export const getAllTeacherAsync = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(API);
            dispatch(getAllTeacher(res.data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTeacherAsync = (id) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API}/${id}`);
            dispatch(getTeacher(res.data));
        } catch (error) {
            console.log(error);
        }
    };
};

export const addTeacherAsync = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(API, data);
            dispatch(addTeacher());
            dispatch(getAllTeacherAsync());
        } catch (error) {
            console.log(error);
        }
    };
};
export const deleteTeacherAsync = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${API}/${id}`);
            dispatch(getAllTeacherAsync());
        } catch (error) {
            console.log(error);
        }
    };
};

/* UPDATE */
export const updateTeacherAsync = (data) => {
    return async (dispatch) => {
        try {
            await axios.put(`${API}/${data.id}`, data);
            dispatch(updateTeacher(data));
            dispatch(getAllTeacherAsync());
        } catch (error) {
            console.log(error);
        }
    };
};