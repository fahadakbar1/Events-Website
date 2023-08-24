import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "../redux/actions/actions";
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
  const dispatch = useDispatch();
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

  return (
    <div>
      <div className="flex mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`mr-4 px-4 py-2 rounded ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            {selectedCategory === category.id && (
              <span className="mr-2">1</span>
            )}
            {category.title}
          </button>
        ))}
      </div>
      <div>
        {categoryData.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Your Event Estimate</h2>
        <p>
          {selectedTasks.length === 0
            ? "$-"
            : `${calculateEstimatedPrice()}-$${
                calculateEstimatedPrice() + 300
              }` // Adjust this range as needed
          }
        </p>
        {/* Display selected categories and tasks */}
        <div className="mt-4">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-md font-semibold mb-2">{category.title}</h3>
              {selectedTasks
                .filter((id: number) =>
                  categoryData.some((task) => task.id === id)
                )
                .map((selectedId: React.Key | null | undefined) => (
                  <p key={selectedId}>
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
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default EventsPage;
