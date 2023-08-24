import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, removeTask } from "../redux/actions/actions";

interface CategoryType {
  id: number;
  title: string;
  image: string;
}

const EventsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Number>();
  const [categoryData, setCategoryData] = useState([]);

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
    </div>
  );
};

export default EventsPage;
