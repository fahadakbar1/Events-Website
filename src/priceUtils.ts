import { SelectedTask, Task } from "./redux/reducers/selectedTasksReducer";

export const calculateMinPrice = (selectedTasks: SelectedTask[]): number => {
  const selectedTaskPrices = selectedTasks.map(
    (SelectedTask: SelectedTask) => SelectedTask.task.minBudget || 0
  );
  return selectedTaskPrices.reduce(
    (sum: number, price: number) => sum + price,
    0
  );
};

export const calculateMaxPrice = (selectedTasks: SelectedTask[]): number => {
  const selectedTaskPrices = selectedTasks.map(
    (SelectedTask: SelectedTask) => SelectedTask.task.maxBudget || 0
  );
  return selectedTaskPrices.reduce(
    (sum: number, price: number) => sum + price,
    0
  );
};

export const calculateCategoryAverageBudget = (
  categoryData: Task[]
): number => {
  const avgBudgetArray = categoryData.map((task) => task.avgBudget);
  const sumOfAvgBudgets = avgBudgetArray.reduce(
    (total, avgBudget) => total + avgBudget,
    0
  );
  const average = sumOfAvgBudgets / avgBudgetArray.length;
  return Math.floor(average);
};

export const calculateSelectedTasksAverage = (
  selectedTasks: SelectedTask[]
): number => {
  const avgBudgetArray = selectedTasks.map(
    (task: SelectedTask) => task.task.avgBudget
  );
  const sumOfAvgBudgets = avgBudgetArray.reduce(
    (total: any, avgBudget: any) => total + avgBudget,
    0
  );
  return Math.floor(sumOfAvgBudgets);
};
