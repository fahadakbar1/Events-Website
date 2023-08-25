import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "../redux/actions/actions";
import { SelectedTask, Task } from "../redux/reducers/selectedTasksReducer";
import { motion } from "framer-motion";
interface TaskCardProps {
  task: Task;
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
      dispatch(addTask(task, selectedCategory.id));
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
        <motion.div
          animate={{ rotateY: isSelected ? 0 : 180 }}
          transition={{ duration: 1 }}
        >
          {isSelected ? (
            <img src={require("../assets/images/checkedIcon.png")} alt="Checked Icon" width="27px" height="27px" />
          ) : (
            <img src={require("../assets/images/addIcon.png")} alt="Add Icon" width="27px" height="27px" />
          )}
        </motion.div>
      </button>
      <div className="p-2 pt-0">
        <h4 className="text-[#616161] text-sm mb-1">{task.title}</h4>
        <div className="flex justify-between items-center">
          <p className=" text-black font-bold text-sm">
            ${task.minBudget.toLocaleString()}-{task.maxBudget.toLocaleString()}
          </p>
          <p className="text-[#616161] text-xs md:text-[11px]">
            Avg:${task.avgBudget.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
