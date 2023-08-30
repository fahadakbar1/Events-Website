import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCards";
import { Task } from "../redux/reducers/selectedTasksReducer";
import { SelectedTask } from "../redux/reducers/selectedTasksReducer";

import { motion, AnimatePresence } from "framer-motion";
import { TaskCardProps } from "../components/TaskCards";
export interface CategoryType {
  id: number;
  title: string;
  image: string;
}

const addIcon = require("../assets/images/addIcon.png");

const EventsPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>();
  const [categoryData, setCategoryData] = useState<Task[]>([]);

  // Fetch categories
  useEffect(() => {
    fetch(
      "https://swensonhe-dev-challenge.s3.us-west-2.amazonaws.com/categories.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch category data for selected category
  useEffect(() => {
    if (selectedCategory !== null) {
      fetch(
        `https://swensonhe-dev-challenge.s3.us-west-2.amazonaws.com/categories/${selectedCategory?.id}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setCategoryData(data);
        })
        .catch((error) =>
          console.error("Error fetching category data:", error)
        );
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  const selectedTasks = useSelector((state: any) => state.selectedTasks);

  // Calculate estimated price
  const calculateMinPrice = () => {
    const selectedTaskPrices = selectedTasks.map(
      (SelectedTask: SelectedTask) => SelectedTask.task.minBudget || 0
    );
    return selectedTaskPrices.reduce(
      (sum: number, price: number) => sum + price,
      0
    );
  };
  const calculateMaxPrice = () => {
    const selectedTaskPrices = selectedTasks.map(
      (SelectedTask: SelectedTask) => SelectedTask.task.maxBudget || 0
    );
    return selectedTaskPrices.reduce(
      (sum: number, price: number) => sum + price,
      0
    );
  };

  const CategoryAverageBudget = () => {
    const avgBudgetArray = categoryData.map((task) => task.avgBudget);
    const sumOfAvgBudgets = avgBudgetArray.reduce(
      (total, avgBudget) => total + avgBudget,
      0
    );
    const average = sumOfAvgBudgets / avgBudgetArray.length;
    return Math.floor(average);
  };

  const SelectedTasksAverage = () => {
    const avgBudgetArray = selectedTasks.map(
      (task: TaskCardProps) => task.task.avgBudget
    );
    const sumOfAvgBudgets = avgBudgetArray.reduce(
      (total: any, avgBudget: any) => total + avgBudget,
      0
    );
    const average = sumOfAvgBudgets / avgBudgetArray.length;
    return Math.floor(average);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="md:flex justify-start align-middle md:w-[92%] m-auto mt-4 md:mt-10 grid grid-cols-12 gap-6">
      <div className="w-full col-span-12 md:col-span-3 px-4 lg:px-0">
        <h1 className="text-center md:text-left text-xl md:text-lg font-bold">
          Event Builder
        </h1>
        <p className="mt-2 md:mt-4 text-[#747474] text-center md:text-left pr-0 md:pr-12">
          Add items to your event using the{" "}
          <img
            className="inline"
            src={addIcon}
            alt="Add Icon"
            width="17px"
            height="17px"
          />{" "}
          to view our cost estimate
        </p>
        {selectedCategory && (
          <div className="mt-4 hidden md:block">
            <h1 className="text-center md:text-left text-xl md:text-lg font-bold mb-4">
              Selected Category
            </h1>
            <img src={selectedCategory?.image} alt={selectedCategory?.title} />
            <p className="mt-4 text-[#747474] text-left">
              There are {categoryData.length} tasks which you can select in this
              category
            </p>
            <p className="mt-4 font-bold">
              Average Cost:{" "}
              <span className="font-normal text-[#747474]">
                ${CategoryAverageBudget().toLocaleString()}
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="w-full col-span-12 md:col-span-6 bg-[#FFFFFF] rounded-2xl px-3 py-4 md:p-4 h-[80vh]">
        <div className="flex justify-between items-center md:flex mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`mx-0.5 md:mx-2 px-4 py-1 md:px-8 md:py-2.5 rounded-full hover:bg-[#5DA3A9] hover:text-white hover:text-bold hover:font-semibold transition duration-500 ${
                selectedCategory?.id === category.id
                  ? "bg-[#5DA3A9] text-white font-semibold"
                  : "bg-[#FAF9F8] text-gray-800"
              }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category.title}
              {selectedCategory?.id === category.id &&
                selectedTasks.filter((SelectedTask: SelectedTask) =>
                  categoryData.some(
                    (dataTask) => dataTask.id === SelectedTask.task.id
                  )
                ).length > 0 && (
                  <span className="ml-1 md:ml-2">
                    (
                    {
                      selectedTasks.filter((SelectedTask: SelectedTask) =>
                        categoryData.some(
                          (dataTask) => dataTask.id === SelectedTask.task.id
                        )
                      ).length
                    }
                    )
                  </span>
                )}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryData.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
      </div>
      <div className="w-full col-span-12 md:col-span-3 bg-[#FFFFFF] rounded-2xl p-3 fixed bottom-0 md:static md:h-[80vh]">
        <div className="flex md:flex md:flex-col justify-between items-start h-full">
          <div className="w-full">
            <h2 className="text-sm md:text-base text-left md:text-center font-thin md:font-semibold text-[#616161] md:text-black">
              Your Event Estimate
            </h2>
            <p className="md:text-center text-3xl font-semibold">
              {
                selectedTasks.length === 0
                  ? "$-"
                  : `$${calculateMinPrice().toLocaleString()}-${calculateMaxPrice().toLocaleString()}` // Adjust this range as needed
              }
            </p>
            <hr className="text-[#FAF9F8] my-4 hidden md:block" />
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
                      <div
                        className="flex justify-between"
                        key={selectedTask.task.id}
                      >
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
                  {SelectedTasksAverage()
                    ? `${SelectedTasksAverage().toLocaleString()}`
                    : `$-`}
                </span>
              </p>
            </div>
          </div>
          <button
            className="text-sm md:text-base md:mt-4 md:w-full md:bg-[#5DA3A9] font-semibold text-[#5DA3A9] md:text-white px-4 md:py-2 rounded-xl"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-[#FAF9F8] p-6 rounded-2xl shadow-md w-11/12 md:w-2/5 m-auto h-2/3 relative">
              <button
                className="text-black hover:text-gray-700 transition-all duration-500 absolute top-4 right-4"
                onClick={handleCloseModal}
              >
                <img
                  src={require("../assets/images/closeIcon.png")}
                  alt="Add Icon"
                  width="24px"
                  height="24px"
                />
              </button>
              <div className="h-full flex flex-col justify-center items-center">
                <div className=" bg-white h-56 w-56 rounded-full bg-circle flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-semibold mb-4">Event Saved!</h2>

                  <p className="text-4xl font-semibold mb-4">
                    {calculateMinPrice() === 0 && calculateMaxPrice() === 0
                      ? "$-"
                      : `$${calculateMinPrice()}-${calculateMaxPrice()}`}
                  </p>
                  <svg
                    width="40"
                    height="37"
                    viewBox="0 0 40 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 0L24.4903 13.8197H39.0211L27.2654 22.3607L31.7557 36.1803L20 27.6393L8.2443 36.1803L12.7346 22.3607L0.97887 13.8197H15.5097L20 0Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
