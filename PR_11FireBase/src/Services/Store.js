import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import CourseReducer from "./Reducer/CourseReducer";
import teacherReducer from "./Reducer/teacherReducer";

const rootReducer = combineReducers({
  course: CourseReducer,
  teacher: teacherReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
