import { motion } from "framer-motion";

export interface SavedModalProps {
  handleCloseModal: any;
  minPrice: Number;
  maxPrice: Number;
}

const SaveModal: React.FC<SavedModalProps> = ({
  handleCloseModal,
  minPrice,
  maxPrice,
}) => {
  return (
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
              {minPrice === 0 && maxPrice === 0
                ? "$-"
                : `$${minPrice}-${maxPrice}`}
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
  );
};

export default SaveModal;
