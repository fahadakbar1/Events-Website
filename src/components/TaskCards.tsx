import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "../redux/actions/actions";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    minBudget: number;
    maxBudget: number;
    avgBudget: number;
    image: string;
  };
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTasks = useSelector((state: any) => state.selectedTasks);

  const isSelected = selectedTasks.includes(task.id);

  const handleTaskToggle = () => {
    if (isSelected) {
      dispatch(removeTask(task.id));
    } else {
      dispatch(addTask(task.id));
    }
  };

  return (
    <div
      className={`border p-4 mb-4 ${
        isSelected ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <img src={task.image} alt={task.title} className="w-12 h-12 mr-2" />
        <button onClick={handleTaskToggle}>
          {isSelected ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
          )}
        </button>
      </div>
      <h4 className="text-lg font-semibold">{task.title}</h4>
      <p className="text-gray-600 mb-2">
        {task.minBudget} - {task.maxBudget}
      </p>
      <p className="text-gray-600">{task.avgBudget}</p>
    </div>
  );
};

export default TaskCard;
