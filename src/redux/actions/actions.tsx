import { AnyAction } from "redux";

export const addTask = (taskId: number): AnyAction => ({
  type: "ADD_TASK",
  payload: taskId,
});

export const removeTask = (taskId: number): AnyAction => ({
  type: "REMOVE_TASK",
  payload: taskId,
});
