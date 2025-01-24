import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/admin/Layout";
import PageInfo from "../../components/common/PageInfo";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { getAllCategoriesAdminAPI } from "../../api/common";
import { createCategoryAPI, updateCategoryAPI, deleteCategoryAPI } from "../../api/admin";
import toast from "react-hot-toast";
import TableOne from "../../components/admin/TableOne";
import { Modal } from "flowbite-react";
import * as yup from 'yup'
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../../components/common/Pagination";

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
  const [isModalOpen, setIsModalOpen] = useState(false);    

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);


  const tableDiv = useRef();
  const addNewCategoryDiv = useRef();

  const debouncedSearch = useDebounce(search, 500);

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
      const query = `page=${page}&search=${debouncedSearch}&limit=${limit}`;
      const response = await getAllCategoriesAdminAPI(query);
      console.log(response.data, 'response.dataa');
      setCategories(response.data.categories);
      setTotal(response.data.total)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, debouncedSearch, limit]);

const onSubmit = (data) => {
  const isDuplicate = categories.some(
    (category) =>
      category.title.toLowerCase().trim() === data.title.toLowerCase().trim()
  );

  if (isDuplicate) {
    toast.error("Category with this title already exists!");
    return;
  }
  if (editingCategory) {
    updateCategoryAPI(editingCategory._id, data)
      .then((response) => {
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
  } else {
    // Creating a new category
    createCategoryAPI(data)
      .then((response) => {
        setCategories([...categories, response.data.category]); 
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
  reset();
  setEditingCategory(null);
  setIsModalOpen(false); 
};

  const onEditCategory = (category) => {
    setEditingCategory(category);
    setValue('title', category.title);
    setValue('description', category.description);
    setIsModalOpen(true);
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

    <div className="relative">
              <input
                type="text"
                placeholder="Search instructors..."
                className="block w-3/4 py-2 px-3 text-sm border rounded-md shadow-xl border-gray-500 placeholder:text-gray-600 focus:outline-2 focus:ring-2 focus:ring-blue-400 mb-5 mx-auto"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

    <div className="relative overflow-hidden bg-white shadow-1 dark:bg-gray-800 sm:rounded-lg mb-5">
      <div className="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
        <p className="text-gray-500 dark:text-gray-400">
          Manage all your existing categories or add a new one
        </p>
        <button
          type="button"
          className="px-4 py-2 text-sm text-white bg-indigo-500 font-medium rounded-lg hover:bg-indigo-600"
          onClick={() => setIsModalOpen(true)} // Open modal
        >
          Add New Category
        </button>
      </div>
    </div>

    {/* Category Table */}
    <div className="flex flex-col w-full items-center gap-9">
      <div className="flex flex-col mb-10 gap-9 w-full">
        <TableOne
          tableData={tableData}
          categories={categories}
          onEditCategory={onEditCategory}
          onDelete={handleDeleteCategory}
        />
      </div>
    </div>

    {/* Pagination */}
                      <div className="mt-10">
                      <Pagination
                      page={page}
                      total={total} 
                      limit={limit}
                      setPage={(action) => {
                  if (action === "prev") setPage((prev) => Math.max(prev - 1, 1));
                    else if (action === "next")
                    setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)));
                    else setPage(action);
                  }}
               />
              </div>

    {/* Modal for Adding/Editing Category */}
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>
        {editingCategory ? "Edit Category" : "Add New Category"}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Title
            </label>
            <input
              type="text"
              {...register("title")}
              className={`block w-full px-3 py-2 border rounded-md ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm">{errors.title?.message}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className={`block w-full px-3 py-2 border rounded-md ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-red-500 text-sm">{errors.description?.message}</p>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  </Layout>
  );
}
