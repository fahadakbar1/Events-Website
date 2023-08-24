import { combineReducers } from "redux";
import selectedTasksReducer from "./selectedTasksReducer";

const rootReducer = combineReducers({
  selectedTasks: selectedTasksReducer,
});

export default rootReducer;
