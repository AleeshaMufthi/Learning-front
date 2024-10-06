import timeAgo from "../../utils/timeAgo";
import PropTypes from "prop-types";

const TableOne = ({ tableData, categories, onEditCategory, onDelete }) => {
  return (
    <div className="rounded-lg border border-stroke bg-white px-6 py-6 shadow-md dark:border-strokedark dark:bg-gray-800">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {tableData.name}
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-lg bg-gray-100 dark:bg-gray-700 sm:grid-cols-4 mb-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-300">
              {tableData.head[0]}
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-300">
              {tableData.head[1]}
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-semibold uppercase text-gray-700 dark:text-gray-300">
              {tableData.head[2]}
            </h5>
          </div>

          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ACTIONS
            </h5>
          </div>
        </div>
        <div>
          {categories.map((category) => (
            <div
              key={category._id}
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-4"
            >
              <div className="flex items-center gap-3 p-2 xl:p-5">
                <div className="flex-shrink-0">
                  <p className="text-black nexa-font dark:text-white font-semibold capitalize">
                    {category.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center flex-col justify-center p-2.5 xl:p-5">
                <p className="font-medium">
                  {new Date(category.createdAt).toDateString()}
                </p>
                <p className="text-gray-500">
                  {timeAgo(category.createdAt)} Ago
                </p>
              </div>
              <div className="hidden p-2.5 sm:block xl:py-3">
                <p className="text-black dark:text-white tracking-tight">
                  {category.description}
                </p>
              </div>

              {/* Place Edit and Delete buttons together */}
              <div className="flex items-center justify-center gap-4 p-2.5 sm:block xl:py-3">
                <button
                  onClick={() => onEditCategory(category)} 
                  className="bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-indigo-500 mr-4"
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white  px-3 py-2 rounded-md hover:bg-red-800 ml-4"
                  onClick={() => onDelete(category._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

TableOne.propTypes = {
  tableData: PropTypes.object,
  categories: PropTypes.array,
  onEditCategory: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TableOne;
