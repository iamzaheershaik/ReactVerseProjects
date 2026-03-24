import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import CourseReducer from "./Reducer/CourseReducer";

const store = createStore(
  CourseReducer,
  applyMiddleware(thunk),
);

export default store;
