// import { Plus, Pencil, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addProduct,
//   fetchProducts,
//   editProduct,
//   deleteProduct,
// } from "../../reducers/productSlice";
// import toast from "react-hot-toast";

// function ProductManager() {
//   const [files, setFiles] = useState([]);
//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//     category: "",
//   });
//   const [category, setCategory] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { products, loading, error } = useSelector((state) => state.products); // Fetch products from Redux
//   const dispatch = useDispatch();

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

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!files.length || !category || !productData.name || !productData.price) {
//       toast("All fields are required!");
//       return;
//     }

//     // const formData = new FormData();
//     // files.forEach((file, index) => {
//     //   formData.append(`images[${index}]`, file);
//     // });

//     // Object.entries(productData).forEach(([key, value]) => {
//     //   formData.append(key, value);
//     // });

//     // formData.append("category", category);

//     if (!selectedProduct) {
//       dispatch(addProduct({ files, productData, category }));
//       toast.success("Product added");
//       console.log("Added product:", productData);
//     } else {
//       dispatch(
//         editProduct({
//           id: selectedProduct.id,
//           updateData: { ...productData, category },
//         })
//       );
//     }

//     resetForm();
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     dispatch(fetchProducts(category));
//   }, [dispatch, category]);

//   // if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setProductData({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       stock: product.stock,
//     });
//     setCategory(product.category);
//     setIsEditing(true);
//   };

//   const handleDelete = (productId) => {
//     dispatch(deleteProduct(productId));
//     // Add delete logic here
//   };

//   const resetForm = () => {
//     setProductData({
//       name: "",
//       description: "",
//       price: "",
//       stock: "",
//     });
//     setFiles([]);
//     setCategory("");
//     setSelectedProduct(null);
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Products</h1>
//         <button
//           onClick={() => {
//             resetForm();
//             setIsEditing(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
//         >
//           <Plus className="w-5 h-5" />
//           <span>Add Product</span>
//         </button>
//       </div>

//       {/* Product List */}
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                 Image
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                 Price
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                 Stock
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {products.map((product) => (
//               <tr key={product.id}>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     {(product.imageUrls || []).map((imageUrl, index) => (
//                       <img
//                         key={index}
//                         src={imageUrl}
//                         alt={product.name}
//                         className="w-16 h-16 object-cover rounded-lg"
//                       />
//                     ))}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">{product.name}</td>
//                 <td className="px-6 py-4">{product.category}</td>
//                 <td className="px-6 py-4"> ₦{product.price}</td>
//                 <td className="px-6 py-4">{product.stock}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleEdit(product)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//                     >
//                       <Pencil className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(product.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit/Add Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
//             <h2 className="text-xl font-bold mb-6">
//               {selectedProduct ? "Edit Product" : "Add Product"}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={productData.name}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   value={productData.description}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   rows={3}
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={productData.price}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Stock
//                   </label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={productData.stock}
//                     onChange={handleInputChange}
//                     multiple
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//               <select
//                 name="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900"
//               >
//                 <option value="">Select Category</option>
//                 <option value="fashion">Men</option>
//                 <option value="groceries">Unisex Shorts</option>
//                 <option value="beauty">Kids</option>
//                 <option value="groceries">Accessories</option>
//                 <option value="groceries">Footings</option>
//                 <option value="groceries">His & Hers</option>
//               </select>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Image</label>
//                 <input
//                   type="file"
//                   multiple
//                   onChange={handleFileChange}
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900"
//                 />
//               </div>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 border rounded-lg hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   onClick={handleSubmit}
//                   // disabled={loading}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
//                 >
//                   Add Product
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductManager;

// import { Plus } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addProduct,
//   editProduct,
//   deleteProduct,
//   fetchProducts,
// } from "../../reducers/productSlice";
// import { ProductList } from "@/components/ui/productList";
// import { ProductFormModal } from "@/components/ui/productModal";

// function ProductManager() {
//   const [files, setFiles] = useState([]);
//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     stock: 0,
//   });
//   const [category, setCategory] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const { products } = useSelector((state) => state.products);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProducts(category));
//   }, [category, dispatch]);

//   const handleFileChange = (e) => {
//     setFiles([...e.target.files]);
//   };

//   const handleEdit = (product) => {
//     setProductData(product);
//     setIsEditing(true);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   const handleSubmit = () => {
//     if (isEditing) {
//       dispatch(editProduct({ ...productData }));
//     } else {
//       dispatch(addProduct({ ...productData, files }));
//     }
//     resetForm();
//   };

//   const resetForm = () => {
//     setFiles([]);
//     setProductData({ name: "", description: "", price: 0, stock: 0 });
//     setIsEditing(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Products</h1>
//         <button
//           onClick={() => setIsEditing(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
//         >
//           <Plus className="w-5 h-5 mr-2" /> Add Product
//         </button>
//       </div>
//       <ProductList
//         products={products}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//       />
//       <ProductFormModal
//         isOpen={isEditing}
//         productData={productData}
//         setProductData={setProductData}
//         category={category}
//         setCategory={setCategory}
//         files={files}
//         handleFileChange={handleFileChange}
//         handleSubmit={handleSubmit}
//         resetForm={resetForm}
//       />
//     </div>
//   );
// }

// export default ProductManager;

// import ProductList from "@/components/ui/productList";

// const ProductManager = () => {
//   return (
//     <div>
//       <ProductList />
//     </div>
//   );
// };

// export default ProductManager;

import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchProducts,
  editProduct,
  deleteProduct,
} from "../../reducers/productSlice";
import toast from "react-hot-toast";
import ProductList from "@/components/ui/productList";
import ProductModal from "@/components/ui/productModal";

function ProductManager() {
  const [files, setFiles] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [category, setCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, error } = useSelector((state) => state.products); // Fetch products from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  if (error) return <p>Error: {error}</p>;

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setCategory(product.category);
    setIsEditing(true);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleSubmit = async () => {
    if (!selectedProduct) {
      dispatch(addProduct({ files, productData, category }));
      toast.success("Product added");
    } else {
      dispatch(
        editProduct({
          id: selectedProduct.id,
          updateData: { ...productData, category },
        })
      );
    }
    resetForm();
  };

  const resetForm = () => {
    setProductData({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    setFiles([]);
    setCategory("");
    setSelectedProduct(null);
    setIsEditing(false);
  };

  return (
    <div className="p-8 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>
      <div className="mb-6">
        <ul className="flex border-b">
          {[
            "All Products",
            "Live",
            "Archived",
            "Out of Stock",
            "Low Stock",
          ].map((tab, index) => (
            <li key={index} className="-mb-px mr-1">
              <a
                href="#"
                className={`bg-white inline-block py-2 px-4 text-gray-700 font-semibold ${
                  index === 0 ? "border-l border-t border-r rounded-t" : ""
                }`}
              >
                {tab}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search products"
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isEditing && (
        <ProductModal
          isEditing={isEditing}
          selectedProduct={selectedProduct}
          onClose={() => setIsEditing(false)}
          onSubmit={handleSubmit}
          files={files}
          setFiles={setFiles}
          productData={productData}
          setProductData={setProductData}
          category={category}
          setCategory={setCategory}
        />
      )}
    </div>
  );
}

export default ProductManager;
