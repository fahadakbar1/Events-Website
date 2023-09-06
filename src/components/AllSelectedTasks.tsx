import { SelectedTask } from "../redux/reducers/selectedTasksReducer";
import { CategoryType } from "../pages/EventsPage";
export interface AllSelectedTasksProps {
  categories: CategoryType[];
  selectedTasks: any;
  selectedTasksAvg: Number;
}

const AllSelectedTasks: React.FC<AllSelectedTasksProps> = ({
  categories,
  selectedTasks,
  selectedTasksAvg,
}) => {
  return (
    <div className="mt-4 hidden md:block">
      {categories.map((category) => (
        <div className="mb-3" key={category.id}>
          <h3 className="text-sm text-[#6c6c6c] font-semibold mb-1">
            {category.title}
          </h3>
          {selectedTasks
            .filter(
              (selectedTask: { categoryId: number }) =>
                selectedTask.categoryId === category.id
            )
            .map((selectedTask: SelectedTask) => (
              <div className="flex justify-between" key={selectedTask.task.id}>
                <p className="text-sm text-[#747474]">
                  {selectedTask.task.title}
                </p>
                <p className="text-sm text-[#747474]">
                  ${selectedTask.task.minBudget} - $
                  {selectedTask.task.maxBudget}
                </p>
              </div>
            ))}
        </div>
      ))}
      <p className="mt-4 font-bold text-sm text-[#6c6c6c]">
        Average Cost:{" "}
        <span className="font-normal text-[#747474]">
          {selectedTasksAvg ? `${selectedTasksAvg.toLocaleString()}` : `$-`}
        </span>
      </p>
    </div>
  );
};

export default AllSelectedTasks;
