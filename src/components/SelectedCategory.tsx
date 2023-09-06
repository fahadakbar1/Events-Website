import { CategoryType } from "../pages/EventsPage";
import { Task } from "../redux/reducers/selectedTasksReducer";

export interface SelectedCategoryProps {
  selectedCategory: CategoryType | undefined;
  categoryData: Task[];
  categoryAverageBudget: Number;
}

const SelectedCategory: React.FC<SelectedCategoryProps> = ({
  selectedCategory,
  categoryData,
  categoryAverageBudget,
}) => {
  return (
    <>
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
              ${categoryAverageBudget.toLocaleString()}
            </span>
          </p>
        </div>
      )}
    </>
  );
};

export default SelectedCategory;
