import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { getAllCategoriesAPI } from "../../api/common";
import { createCategoryAPI, updateCategoryAPI, deleteCategoryAPI } from "../../api/admin";
import toast from "react-hot-toast";
import TableOne from "../../components/admin/TableOne";
import * as yup from 'yup'

const tableData = {
  name: "Available Categories",
  head: ["name","created", "description"],
};

const categorySchema = yup
  .object({
    title: yup.string().required().trim().min(3).max(30),
    description: yup.string().required().min(3).max(90),
  })
  .required();


export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const tableDiv = useRef();
  const addNewCategoryDiv = useRef();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(categorySchema) });

   // Fetch categories
   const fetchCategories = async () => {
    try {
      const response = await getAllCategoriesAPI();
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  // Handle form submission (edit category)
const onSubmit = (data) => {
  if (editingCategory) {
    // Editing an existing category
    updateCategoryAPI(editingCategory._id, data)
      .then((response) => {
        // Check if the response contains the expected data
        if (response.data && response.data.category) {
          const updatedCategory = response.data.category;

          setCategories((prevCategories) =>
            prevCategories.map((cat) =>
              cat._id === updatedCategory._id ? updatedCategory : cat
            )
          );
          setEditingCategory(null);
          reset();
          toast.success('Category updated successfully!');
          tableDiv.current.scrollIntoView({ behavior: "smooth" });
        } else {
          throw new Error('Category update response is not valid');
        }
      })
      .catch((err) => {
        console.error('Error updating category', err.response || err.message);
        toast.error('Error updating category');
      });
  } else {
    // Creating a new category
    createCategoryAPI(data)
      .then((response) => {
        setCategories([...categories, response.data.category]); // Make sure this matches the updated response structure
        tableDiv.current.scrollIntoView({ behavior: "smooth" });
        reset();
        setEditingCategory(null);
        toast.success("Category Added Successfully", {
            style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                padding: "15px",
            },
        });
    })
      .catch((err) => {
        console.error('Error creating category', err.response || err.message);
        toast.error('Error creating category');
      });
  }
};

  // Set the selected category's data into the form for editing
  const onEditCategory = (category) => {
    setEditingCategory(category); // Set the category to be edited
    setValue('title', category.title); // Populate the form with the category's title
    setValue('description', category.description);
    addNewCategoryDiv.current.scrollIntoView({ behavior: "smooth" }); 
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategoryAPI(id);
      fetchCategories(); 
       toast.success("Category Deleted Successfully")
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Layout>
      <PageInfo admin pageName={"Manage Categories"} />
      <div className="relative overflow-hidden bg-white shadow-1 dark:bg-gray-800 sm:rounded-lg mb-5 scroll-smooth">
        <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <div>
            
            <p className="text-gray-500 dark:text-gray-400">
              Manage all your existing categories or add a new one
            </p>
          </div>
          <button
            type="button"
            className="flex items-center justify-center px-4 py-2 text-sm text-white bg-indigo-500 font-medium rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            onClick={() => addNewCategoryDiv.current.scrollIntoView()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 mr-2 -ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
            Add new category
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-9 sm:grid-cols-2">
        <div className="flex flex-col mb-10 gap-9 w-full" ref={tableDiv}>
          <TableOne tableData={ tableData } 
                    categories={ categories } 
                    onEditCategory={onEditCategory}
                    onDelete={handleDeleteCategory}/>
        </div>
        {/* </div> */}
        <div
          className="flex flex-col w-3/5 gap-9"
          id="form"
          ref={addNewCategoryDiv}
        >
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h1 className="font-semibold text-black text-center">
              {editingCategory ? "Edit Category" : "Publish New Category"}
              </h1>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="category"
                    className="mb-3 ml-4 mt-4 block text-gray-800 font-medium"
                  >
                    Category Title
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Default Input"
                    className={`w-80 ml-4 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5
                              outline-none transition focus:border-primary active:border-primary disabled:cursor-default 
                              disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                              ${errors.title?.message && 'ring-red-600 ring-1 rounded-md'}`
                    } 
                  />
                  <p className="text-red-600 text-end nexa-font text-xs mt-2 ml-1">
                    {errors.title?.message}
                  </p>
                </div>
                <div>
                  <label className="mb-3 ml-4 mt-4 block font-medium text-gray-800">
                    Category Description
                  </label>
                  <textarea
                    rows={6}
                    {...register("description")}
                    placeholder="Description..."
                    className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                      errors.description?.message &&
                      "ring-red-600 ring-1 rounded-md"
                    }`}
                  />{" "}
                  <p className="text-red-600 text-end nexa-font text-xs mt-2 ml-1">
                    {errors.description?.message}
                  </p>
                </div>
                <div className="w-full flex flex-end">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {editingCategory ? "Update Category" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
