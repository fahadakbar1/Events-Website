import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCards";
interface CategoryType {
  id: number;
  title: string;
  image: string;
}
interface TaskType {
  id: number;
  title: string;
  minBudget: number;
  maxBudget: number;
  avgBudget: number;
  image: string;
}

const EventsPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Number>();
  const [categoryData, setCategoryData] = useState<TaskType[]>([]);

  // Fetch categories
  useEffect(() => {
    fetch(
      "https://swensonhe-dev-challenge.s3.us-west-2.amazonaws.com/categories.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        console.log("Categories :", data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Fetch category data for selected category
  useEffect(() => {
    if (selectedCategory !== null) {
      fetch(
        `https://swensonhe-dev-challenge.s3.us-west-2.amazonaws.com/categories/${selectedCategory}.json`
      )
        .then((response) => response.json())
        .then((data) => {
          setCategoryData(data);
          console.log("Selected Category: ", data);
        })
        .catch((error) =>
          console.error("Error fetching category data:", error)
        );
    }
  }, [selectedCategory]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const selectedTasks = useSelector((state: any) => state.selectedTasks);

  // Calculate estimated price
  const calculateEstimatedPrice = () => {
    const selectedTaskPrices = selectedTasks.map(
      (taskId: number) =>
        categoryData.find((task) => task.id === taskId)?.avgBudget || 0
    );
    return selectedTaskPrices.reduce((sum: any, price: any) => sum + price, 0);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="md:flex justify-start align-middle w-[92%] m-auto mt-4 md:mt-10">
      <div className="w-full mb-5 md:w-1/5 px-4 lg:pr-8 lg:px-0">
        <h1 className="text-center md:text-left text-xl md:text-lg font-bold">
          Event Builder
        </h1>
        <p className=" mt-2 md:mt-4 text-[#747474] text-center md:text-left ">
          Add items to your event using the{" "}
          <svg
            width="17"
            height="17"
            viewBox="0 0 29 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline"
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
          </svg>{" "}
          to view our cost estimate
        </p>
      </div>
      <div className="w-full md:w-3/5 bg-[#FFFFFF] rounded-2xl">
        <div className="w-full md:flex mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`mx-0.5 md:mx-4 px-4 py-1 md:px-8 md:py-2.5 rounded-full hover:bg-[#5DA3A9] hover:text-white hover:text-bold hover:font-semibold transition duration-500 ${
                selectedCategory === category.id
                  ? "bg-[#5DA3A9] text-white font-semibold"
                  : "bg-[#FAF9F8] text-gray-800"
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              {/* {selectedCategory === category.id && (
                <span className="mr-2">1</span>
              )} */}
              {category.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryData.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
      <div className="mt-4 w-full md:w-1/5 bg-[#FFFFFF] rounded-2xl p-3">
        <h2 className="text-md text-center font-semibold mb-2">
          Your Event Estimate
        </h2>
        <p className="text-center text-3xl font-semibold">
          {
            selectedTasks.length === 0
              ? "$-"
              : `${calculateEstimatedPrice().toLocaleString()}-$${(
                  calculateEstimatedPrice() + 300
                ).toLocaleString()}` // Adjust this range as needed
          }
        </p>
        <hr className="text-[#FAF9F8] my-4" />
        {/* Display selected categories and tasks */}
        <div className="mt-4">
          {categories.map((category) => (
            <div className="mb-3" key={category.id}>
              <h3 className="text-sm text-[#6c6c6c] font-medium mb-1">
                {category.title}
              </h3>
              {selectedTasks
                .filter((id: number) =>
                  categoryData.some((task) => task.id === id)
                )
                .map((selectedId: React.Key | null | undefined) => (
                  <p className="text-sm text-[#747474]" key={selectedId}>
                    {categoryData.find((task) => task.id === selectedId)?.title}{" "}
                    - $
                    {
                      categoryData.find((task) => task.id === selectedId)
                        ?.avgBudget
                    }
                  </p>
                ))}
            </div>
          ))}
        </div>
        <button
          className="mt-4 w-full bg-[#5DA3A9] font-semibold text-white px-4 py-2 rounded-xl"
          onClick={handleSaveClick}
        >
          Save
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Event Saved!</h2>
            <p>
              Total Price: ${calculateEstimatedPrice()}-$
              {calculateEstimatedPrice() + 300}
            </p>
            <div className="flex items-center justify-end mt-4">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
