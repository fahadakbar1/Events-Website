import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "../redux/actions/actions";
import { SelectedTask, Task } from "../redux/reducers/selectedTasksReducer";
interface TaskCardProps {
  task: Task; // Update the interface to include the Task type
  selectedCategory: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, selectedCategory }) => {
  const dispatch = useDispatch();

  const selectedTasks = useSelector((state: any) => state.selectedTasks);

  const isSelected = selectedTasks.some(
    (selectedTask: SelectedTask) => selectedTask.task.id === task.id
  );

  const handleTaskToggle = () => {
    if (isSelected) {
      dispatch(removeTask(task.id));
    } else {
      dispatch(addTask(task, selectedCategory)); // Dispatch the entire task object
    }
  };

  return (
    <div
      className={`border md:mb-4 rounded-lg relative ${
        isSelected ? "border-[#5DA3A9]" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <img src={task.image} alt={task.title} className="w-full h-full mr-2" />
      </div>
      <button className="absolute top-2 right-2" onClick={handleTaskToggle}>
        {isSelected ? (
          <svg
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <circle cx="13.6872" cy="13.3122" r="12.8981" fill="#5DA3A9" />
              <circle
                cx="13.6872"
                cy="13.3122"
                r="12.8981"
                fill="#5DA3A9"
                fill-opacity="0.2"
              />
            </g>
            <path
              d="M13.687 18.5669C12.9532 18.5669 12.3584 17.9721 12.3584 17.2384V9.38591C12.3584 8.65218 12.9532 8.05737 13.687 8.05737C14.4207 8.05737 15.0155 8.65218 15.0155 9.38591V17.2384C15.0155 17.9721 14.4207 18.5669 13.687 18.5669ZM9.76073 14.6407C9.027 14.6407 8.43219 14.0459 8.43219 13.3122C8.43219 12.5784 9.027 11.9836 9.76073 11.9836H17.6132C18.3469 11.9836 18.9417 12.5784 18.9417 13.3122C18.9417 14.0459 18.3469 14.6407 17.6132 14.6407H9.76073Z"
              fill="white"
            />
            <g opacity="0.6">
              <circle cx="13.8483" cy="13.0258" r="12.5544" fill="#5DA3A9" />
              <circle
                cx="13.8483"
                cy="13.0258"
                r="12.5544"
                fill="#5DA3A9"
                fill-opacity="0.2"
              />
            </g>
            <path
              d="M13.8479 18.1406C13.1337 18.1406 12.5548 17.5617 12.5548 16.8475V9.20427C12.5548 8.49009 13.1337 7.91113 13.8479 7.91113C14.5621 7.91113 15.141 8.49009 15.141 9.20427V16.8475C15.141 17.5617 14.5621 18.1406 13.8479 18.1406ZM10.0263 14.319C9.31213 14.319 8.73317 13.7401 8.73317 13.0259C8.73317 12.3117 9.31213 11.7327 10.0263 11.7327H17.6695C18.3837 11.7327 18.9627 12.3117 18.9627 13.0259C18.9627 13.7401 18.3837 14.319 17.6695 14.319H10.0263Z"
              fill="white"
            />
            <circle cx="13.98" cy="12.98" r="12.98" fill="#5DA3A9" />
            <circle
              cx="13.98"
              cy="12.98"
              r="12.98"
              fill="#5DA3A9"
              fill-opacity="0.2"
            />
            <path
              d="M13.4076 17.0102C12.8588 17.5043 12.0135 17.46 11.5194 16.9113C11.0253 16.3626 11.0696 15.5172 11.6183 15.0231L17.4909 9.73541C18.0397 9.24133 18.885 9.28564 19.3791 9.83437C19.8732 10.3831 19.8289 11.2285 19.2801 11.7225L13.4076 17.0102Z"
              fill="white"
            />
            <path
              d="M13.4393 15.0597C13.9334 15.6085 13.8891 16.4538 13.3404 16.9479C12.7916 17.442 11.9463 17.3977 11.4522 16.849L9.16263 14.3062C8.66855 13.7574 8.71286 12.9121 9.26159 12.418C9.81032 11.9239 10.6557 11.9682 11.1498 12.5169L13.4393 15.0597Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="27"
            height="28"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <circle cx="14.2616" cy="14.8608" r="14.1885" fill="black" />
              <circle
                cx="14.2616"
                cy="14.8608"
                r="14.1885"
                fill="black"
                fill-opacity="0.2"
              />
            </g>
            <path
              d="M14.2613 20.6413C13.4542 20.6413 12.7999 19.987 12.7999 19.1798V10.5418C12.7999 9.73463 13.4542 9.08032 14.2613 9.08032C15.0685 9.08032 15.7228 9.73464 15.7228 10.5418V19.1798C15.7228 19.987 15.0685 20.6413 14.2613 20.6413ZM9.94228 16.3223C9.13515 16.3223 8.48083 15.6679 8.48083 14.8608C8.48083 14.0537 9.13515 13.3994 9.94228 13.3994H18.5804C19.3875 13.3994 20.0418 14.0537 20.0418 14.8608C20.0418 15.6679 19.3875 16.3223 18.5804 16.3223H9.94228Z"
              fill="white"
            />
          </svg>
        )}
      </button>
      <div className="p-2 pt-0">
        <h4 className="text-[#616161] text-sm mb-1">{task.title}</h4>
        <p className=" text-black font-bold text-sm">
          ${task.minBudget.toLocaleString()}-{task.maxBudget.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
