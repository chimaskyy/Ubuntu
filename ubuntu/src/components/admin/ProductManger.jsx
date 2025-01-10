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
    <div className="p-8">
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
