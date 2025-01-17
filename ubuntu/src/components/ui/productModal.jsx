/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import {X} from "lucide-react"

function ProductModal({
  isEditing,
  selectedProduct,
  onClose,
  onSubmit,
  files,
  setFiles,
  productData,
  setProductData,
  category,
  setCategory,
}) {
  const [specifications, setSpecifications] = useState(
    productData.specifications || {
      Material: "",
      Style: "",
      Care: "",
      Origin: "",
    }
  );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !files.length ||
      !category ||
      !productData.name ||
      !productData.price ||
      !productData.stock ||
      !productData.description ||
      !productData.specifications
    ) {
      toast("All fields are required!");
      return;
    }
    onSubmit();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
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
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
            <label className="block text-sm font-medium mb-4">
              Specifications
            </label>
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

          <div>
            <label className="block text-sm font-medium mb-2">Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-gray-900"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {selectedProduct ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
