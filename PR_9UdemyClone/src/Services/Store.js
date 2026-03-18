import { createStore } from "redux";
import CourseReducer from "./Reducer/CourseReducer";

const store = createStore(
  CourseReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
