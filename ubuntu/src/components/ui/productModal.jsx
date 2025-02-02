// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// // Define subcategories for each category
// const categorySubcategories = {
//   men: ["Shirts", "Pants", "Accessories", "Undies"],
//   "unisex shorts": ["Casual", "Athletic", "Beach"],
//   kids: ["Boys", "Girls"],
//   accessories: ["Caps", "Sticks", "Hats", "Fans", "Belts"],
//   footings: ["Men's Shoes", "Women's Shoes"],
//   "his and hers": ["Couples Sets", "Matching Outfits"],
//   undies: ["Boxers", "Briefs", "Trunks"],
//   "head wear": ["Traditional", "Modern", "Casual"],
// };

// function ProductModal({
//   isEditing,
//   selectedProduct,
//   onClose,
//   onSubmit,
//   files,
//   setFiles,
//   productData,
//   setProductData,
//   category,
//   setCategory,
// }) {
//   const [specifications, setSpecifications] = useState(
//     productData.specifications || {
//       Material: "",
//       Style: "",
//       Care: "",
//       Origin: "",
//     }
//   );

//   const [variants, setVariants] = useState(productData.variants || []);
//   const [subcategory, setSubcategory] = useState(productData.subcategory || "");

//   const predefinedSizes = {
//     clothing: ["XS", "S", "M", "L", "XL", "XXL"],
//     shoes: Array.from({ length: 13 }, (_, i) => (35 + i).toString()), // 35-47
//     accessories: ["Yellow", "Blue", "Red", "Green", "Black", "White"],
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     const validFiles = selectedFiles.filter((file) =>
//       ["image/jpeg", "image/png"].includes(file.type)
//     );
//     if (validFiles.length !== selectedFiles.length) {
//       toast.error("Only image files are allowed!");
//     }
//     setFiles(validFiles);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prev) => ({
//       ...prev,
//       [name]:
//         name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
//     }));
//   };

//   const handleSpecificationChange = (key, value) => {
//     setSpecifications((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//     setProductData((prev) => ({
//       ...prev,
//       specifications: {
//         ...prev.specifications,
//         [key]: value,
//       },
//     }));
//   };

//   const handleSubcategoryChange = (e) => {
//     const value = e.target.value;
//     setSubcategory(value);
//     setProductData((prev) => ({
//       ...prev,
//       subcategory: value,
//     }));
//   };

//   const addVariant = (value) => {
//     if (!value) return;
//     if (variants.includes(value)) {
//       toast.error("This variant already exists!");
//       return;
//     }
//     const newVariants = [...variants, value];
//     setVariants(newVariants);
//     setProductData((prev) => ({
//       ...prev,
//       variants: newVariants,
//     }));
//   };

//   const removeVariant = (variantToRemove) => {
//     const newVariants = variants.filter((v) => v !== variantToRemove);
//     setVariants(newVariants);
//     setProductData((prev) => ({
//       ...prev,
//       variants: newVariants,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       !files.length ||
//       !category ||
//       !subcategory ||
//       !productData.name ||
//       !productData.price ||
//       !productData.stock ||
//       !productData.description ||
//       !productData.specifications ||
//       !variants.length
//     ) {
//       toast.error(
//         "All fields are required, including category, subcategory, and at least one variant!"
//       );
//       return;
//     }
//     onSubmit();
//     onClose();
//   };

//   const isClothingCategory = ["men", "kids", "his and hers", "undies"].includes(
//     category.toLowerCase()
//   );
//   const isAccessoriesCategory = ["accessories", "head wear"].includes(
//     category.toLowerCase()
//   );
//   const isFootwearCategory = category.toLowerCase() === "footings";

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-bold">
//             {selectedProduct ? "Edit Product" : "Add Product"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="h-6 w-6" />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={productData.name}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={productData.description}
//               onChange={handleInputChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               rows={3}
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={productData.price}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-2">Stock</label>
//               <input
//                 type="number"
//                 name="stock"
//                 value={productData.stock}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Category</label>
//               <select
//                 name="category"
//                 value={category}
//                 onChange={(e) => {
//                   setCategory(e.target.value);
//                   // Reset subcategory, variants when category changes
//                   setSubcategory("");
//                   setVariants([]);
//                   setProductData((prev) => ({
//                     ...prev,
//                     subcategory: "",
//                     variants: [],
//                   }));
//                 }}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900"
//               >
//                 <option value="">Select Category</option>
//                 <option value="men">Men</option>
//                 <option value="unisex shorts">Unisex Shorts</option>
//                 <option value="kids">Kids</option>
//                 <option value="accessories">Accessories</option>
//                 <option value="footings">Footings</option>
//                 <option value="his and hers">His & Hers</option>
//                 <option value="undies">Men Undies</option>
//                 <option value="head wear">Head Wear</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Subcategory
//               </label>
//               <select
//                 name="subcategory"
//                 value={subcategory}
//                 onChange={handleSubcategoryChange}
//                 disabled={!category}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
//               >
//                 <option value="">Select Subcategory</option>
//                 {category &&
//                   categorySubcategories[category]?.map((sub) => (
//                     <option key={sub} value={sub.toLowerCase()}>
//                       {sub}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           {/* Variants Section */}
//           {category &&
//             (isClothingCategory ||
//               isFootwearCategory ||
//               isAccessoriesCategory) && (
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <label className="block text-sm font-medium">
//                     Product Variants
//                   </label>
//                   <div className="flex gap-2">
//                     {isClothingCategory && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setVariants(predefinedSizes.clothing);
//                           setProductData((prev) => ({
//                             ...prev,
//                             variants: predefinedSizes.clothing,
//                           }));
//                         }}
//                       >
//                         Add All Clothing Sizes
//                       </Button>
//                     )}
//                     {isFootwearCategory && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setVariants(predefinedSizes.shoes);
//                           setProductData((prev) => ({
//                             ...prev,
//                             variants: predefinedSizes.shoes,
//                           }));
//                         }}
//                       >
//                         Add All Shoe Sizes
//                       </Button>
//                     )}
//                     {isAccessoriesCategory && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => {
//                           setVariants(predefinedSizes.accessories);
//                           setProductData((prev) => ({
//                             ...prev,
//                             variants: predefinedSizes.accessories,
//                           }));
//                         }}
//                       >
//                         Add All Colors
//                       </Button>
//                     )}
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <select
//                     value=""
//                     onChange={(e) => addVariant(e.target.value)}
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="">
//                       Select {isFootwearCategory ? "Size" : "Variant"}
//                     </option>
//                     {(isFootwearCategory
//                       ? predefinedSizes.shoes
//                       : isAccessoriesCategory
//                       ? predefinedSizes.accessories
//                       : predefinedSizes.clothing
//                     )
//                       .filter((size) => !variants.includes(size))
//                       .map((size) => (
//                         <option key={size} value={size}>
//                           {size}
//                         </option>
//                       ))}
//                   </select>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {variants.map((variant) => (
//                     <div
//                       key={variant}
//                       className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
//                     >
//                       <span>{variant}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeVariant(variant)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <X className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           <div>
//             <label className="block text-sm font-medium mb-4">
//               Specifications
//             </label>
//             <div className="space-y-4">
//               {Object.entries(specifications).map(([key, value]) => (
//                 <div key={key} className="flex gap-4">
//                   <input
//                     type="text"
//                     value={key}
//                     disabled
//                     className="w-1/3 px-4 py-2 border rounded-lg bg-gray-50"
//                   />
//                   <input
//                     type="text"
//                     value={value}
//                     onChange={(e) =>
//                       handleSpecificationChange(key, e.target.value)
//                     }
//                     placeholder={`Enter ${key}`}
//                     className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Images</label>
//             <input
//               type="file"
//               multiple
//               onChange={handleFileChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900"
//             />
//           </div>

//           <div className="flex justify-end space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               {selectedProduct ? "Save Changes" : "Add Product"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProductModal;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProduct } from "@/reducers/productSlice";

// Define subcategories for each category
const categorySubcategories = {
  men: ["Shirts", "Pants", "Accessories", "Undies"],
  "unisex shorts": ["Casual", "Athletic", "Beach"],
  kids: ["Boys", "Girls"],
  accessories: ["Caps", "Sticks", "Hats", "Fans", "Belts"],
  footings: ["Men's Shoes", "Women's Shoes"],
  "his and hers": ["Couples Sets", "Matching Outfits"],
  undies: ["Boxers", "Briefs", "Trunks"],
  "head wear": ["Traditional", "Modern", "Casual"],
};

function AddProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    subcategory: "",
    variants: [],
    specifications: {
      Material: "",
      Style: "",
      Care: "",
      Origin: "",
    },
  });

  const [specifications, setSpecifications] = useState({
    Material: "",
    Style: "",
    Care: "",
    Origin: "",
  });

  const [variants, setVariants] = useState([]);
  const [subcategory, setSubcategory] = useState("");

  const predefinedSizes = {
    clothing: ["XS", "S", "M", "L", "XL", "XXL"],
    shoes: Array.from({ length: 13 }, (_, i) => (35 + i).toString()), // 35-47
    accessories: ["Yellow", "Blue", "Red", "Green", "Black", "White"],
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );
    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only image files are allowed!");
    }
    setFiles(validFiles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSpecificationChange = (key, value) => {
    setSpecifications((prev) => ({
      ...prev,
      [key]: value,
    }));
    setProductData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value,
      },
    }));
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    setSubcategory(value);
    setProductData((prev) => ({
      ...prev,
      subcategory: value,
    }));
  };

  const addVariant = (value) => {
    if (!value) return;
    if (variants.includes(value)) {
      toast.error("This variant already exists!");
      return;
    }
    const newVariants = [...variants, value];
    setVariants(newVariants);
    setProductData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  const removeVariant = (variantToRemove) => {
    const newVariants = variants.filter((v) => v !== variantToRemove);
    setVariants(newVariants);
    setProductData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   if (
     !files.length ||
     !category ||
     !category ||
     !subcategory ||
     !productData.name ||
     !productData.price ||
     !productData.stock ||
     !productData.description ||
     !productData.specifications ||
     !variants.length
   ) {
     toast.error(
       "All fields are required, including category, subcategory, and at least one variant!"
     );
     return;
   }

   try {
     // Dispatch the addProduct action with all required data
     await dispatch(
       addProduct({
         files,
         productData: {
           ...productData,
           category,
           subcategory,
           variants,
           specifications,
         },
       })
     ).unwrap();

     toast.success("Product added successfully!");
     navigate("/admin/products"); // Adjust this path to match your route structure
   } catch (error) {
     toast.error(error?.message || "Failed to add product. Please try again.");
   }
 };

  const isClothingCategory = ["men", "kids", "his and hers", "undies"].includes(
    category.toLowerCase()
  );
  const isAccessoriesCategory = ["accessories", "head wear"].includes(
    category.toLowerCase()
  );
  const isFootwearCategory = category.toLowerCase() === "footings";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="ml-14 items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to product list
          </Button>
          <h1 className="text-2xl font-bold mt-2">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Description */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Description</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Name of the product..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      rows={4}
                      placeholder="Product Description"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Category</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        setSubcategory("");
                        setVariants([]);
                        setProductData((prev) => ({
                          ...prev,
                          subcategory: "",
                          variants: [],
                        }));
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900"
                    >
                      <option value="">Select Category</option>
                      <option value="men">Men</option>
                      <option value="unisex shorts">Unisex Shorts</option>
                      <option value="kids">Kids</option>
                      <option value="accessories">Accessories</option>
                      <option value="footings">Footings</option>
                      <option value="his and hers">His & Hers</option>
                      <option value="undies">Men Undies</option>
                      <option value="head wear">Head Wear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subcategory
                    </label>
                    <select
                      name="subcategory"
                      value={subcategory}
                      onChange={handleSubcategoryChange}
                      disabled={!category}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Select Subcategory</option>
                      {category &&
                        categorySubcategories[category]?.map((sub) => (
                          <option key={sub} value={sub.toLowerCase()}>
                            {sub}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Pricing</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productData.price}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={productData.stock}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Images and Additional Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex flex-col items-center"
                  >
                    <div className="p-4 bg-gray-50 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">
                      Click to upload images
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 10MB
                    </span>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-4">
                    {Array.from(files).map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFiles = Array.from(files);
                            newFiles.splice(index, 1);
                            setFiles(newFiles);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {category &&
                (isClothingCategory ||
                  isFootwearCategory ||
                  isAccessoriesCategory) && (
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">
                        Product Variants
                      </h2>
                      <div className="flex gap-2">
                        {isClothingCategory && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setVariants(predefinedSizes.clothing);
                              setProductData((prev) => ({
                                ...prev,
                                variants: predefinedSizes.clothing,
                              }));
                            }}
                          >
                            Add All Clothing Sizes
                          </Button>
                        )}
                        {isFootwearCategory && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setVariants(predefinedSizes.shoes);
                              setProductData((prev) => ({
                                ...prev,
                                variants: predefinedSizes.shoes,
                              }));
                            }}
                          >
                            Add All Shoe Sizes
                          </Button>
                        )}
                        {isAccessoriesCategory && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setVariants(predefinedSizes.accessories);
                              setProductData((prev) => ({
                                ...prev,
                                variants: predefinedSizes.accessories,
                              }));
                            }}
                          >
                            Add All Colors
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <select
                        value=""
                        onChange={(e) => addVariant(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        <option value="">
                          Select {isFootwearCategory ? "Size" : "Variant"}
                        </option>
                        {(isFootwearCategory
                          ? predefinedSizes.shoes
                          : isAccessoriesCategory
                          ? predefinedSizes.accessories
                          : predefinedSizes.clothing
                        )
                          .filter((size) => !variants.includes(size))
                          .map((size) => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                      </select>

                      <div className="flex flex-wrap gap-2">
                        {variants.map((variant) => (
                          <div
                            key={variant}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                          >
                            <span>{variant}</span>
                            <button
                              type="button"
                              onClick={() => removeVariant(variant)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Specifications</h2>
                <div className="space-y-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex gap-4">
                      <input
                        type="text"
                        value={key}
                        disabled
                        className="w-1/3 px-4 py-2 border rounded-lg bg-gray-50"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleSpecificationChange(key, e.target.value)
                        }
                        placeholder={`Enter ${key}`}
                        className="w-2/3 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("admin/products")}
            >
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;
