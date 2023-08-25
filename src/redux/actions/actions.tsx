import { AnyAction } from "redux";
import { Task } from "../reducers/selectedTasksReducer";

export const addTask = (task: Task, categoryId: number): AnyAction => ({
  type: "ADD_TASK",
  payload: { task, categoryId },
});

export const removeTask = (taskId: number): AnyAction => ({
  type: "REMOVE_TASK",
  payload: taskId,
});
