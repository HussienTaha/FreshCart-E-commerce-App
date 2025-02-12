import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  return data.data;
};

const fetchSubcategories = async (categoryId) => {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`
  );
  return data.data;
};

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: subcategories,
    isLoading: isSubcategoriesLoading,
    isError: isSubcategoriesError,
    error: subcategoriesError,
  } = useQuery({
    queryKey: ["subcategories", selectedCategoryId],
    queryFn: () => fetchSubcategories(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  const selectedCategory = categories?.find(
    (category) => category._id === selectedCategoryId
  );

  const placeholderCount = 10;

  if (isCategoriesLoading) {
    return (
      <>
        <div className="mb-4 "></div>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-3 ">
          {Array.from({ length: placeholderCount }).map((_, index) => (
            <div
              key={index}
              role="status"
              className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700 w-full  mx-auto"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              <div className="flex items-center mt-4 ">
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (isCategoriesError) {
    return (
      <div className="text-center  text-red-500">
        Error: {categoriesError.message}
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-3  gap-6 grid-cols-2">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategoryId(category._id)}
            className="max-w-sm  bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
          >
            <div>
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={category.image}
                alt={category.name}
              />
            </div>
            <div className="p-5">
              <div>
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-center  text-[#4FA74F] dark:text-white">
                  {category.name}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <div className="mt-20">
          <h2 className="text-center mb-4 text-[#4FA74F] text-3xl font-semibold">
            {selectedCategory?.name} Subcategories
          </h2>
          {isSubcategoriesLoading ? (
            <div>
              <h2 className="text-2xl text-center font-semibold">
                Loading Subcategories ...
              </h2>
            </div>
          ) : isSubcategoriesError ? (
            <div className="text-center text-red-500">
              Error: {subcategoriesError.message}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 grid-cols-2 mb-5">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="max-w-sm bg-white border hover:shadow-lg transition-all duration-300 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {subcategory.name}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
