import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCards";
import { Task } from "../redux/reducers/selectedTasksReducer";
import { SelectedTask } from "../redux/reducers/selectedTasksReducer";
import { AnimatePresence } from "framer-motion";
import SelectedCategory from "../components/SelectedCategory";
import SaveModal from "../components/SaveModal";
import AllSelectedTasks from "../components/AllSelectedTasks";

import {
  calculateMinPrice,
  calculateMaxPrice,
  calculateCategoryAverageBudget,
  calculateSelectedTasksAverage,
} from "../priceUtils";

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

  const minPrice = calculateMinPrice(selectedTasks);
  const maxPrice = calculateMaxPrice(selectedTasks);
  const categoryAvgBudget = calculateCategoryAverageBudget(categoryData);
  const selectedTasksAvg = calculateSelectedTasksAverage(selectedTasks);

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
        <SelectedCategory
          selectedCategory={selectedCategory}
          categoryData={categoryData}
          categoryAverageBudget={categoryAvgBudget}
        />
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
                  : `$${minPrice.toLocaleString()}-${maxPrice.toLocaleString()}` // Adjust this range as needed
              }
            </p>
            <hr className="text-[#FAF9F8] my-4 hidden md:block" />
            <AllSelectedTasks
              categories={categories}
              selectedTasks={selectedTasks}
              selectedTasksAvg={selectedTasksAvg}
            />
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
          <SaveModal
            handleCloseModal={handleCloseModal}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventsPage;
