import { AnyAction } from "redux";

export interface Task {
  id: number;
  title: string;
  minBudget: number;
  maxBudget: number;
  avgBudget: number;
  image: string;
}

export interface SelectedTask {
  task: Task;
  categoryId: number; // Associate tasks with category
}

const initialState: SelectedTask[] = []; // Array to store selected task objects

const selectedTasksReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case "ADD_TASK":
      const { task, categoryId } = action.payload;
      return [...state, { task, categoryId }];
    case "REMOVE_TASK":
      const taskIdToRemove = action.payload;
      return state.filter(
        (selectedTask) => selectedTask.task.id !== taskIdToRemove
      );
    default:
      return state;
  }
};

export default selectedTasksReducer;
