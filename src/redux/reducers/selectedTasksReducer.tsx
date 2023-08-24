import { AnyAction } from "redux";

const initialState: number[] = []; // Array to store selected task IDs

const selectedTasksReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "REMOVE_TASK":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};

export default selectedTasksReducer;
