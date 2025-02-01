import {useParams} from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import {categories} from '../Data/Categories';

function CategoryPage() {
    const {category, subcategory} = useParams();
    
    //find the appropriate category data
    const categoryData = categories.find(
        (c) => c.link.replace("/", "") === category);

    //if there is no category data, return an error message
    if (!categoryData) {
        return (
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Category not found</h1>
          </div>
        );
    }

    //generate title and description based on subcategory
const title = subcategory
  ? `${categoryData.name} - ${subcategory
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`
  : `SHOP ${categoryData.name}`;

const description = subcategory
  ? `Explore our collection of ${subcategory.split("-").join(" ")} in the ${
      categoryData.name
    } category.`
  : `Shop our latest ${categoryData.name.toLowerCase()} collection. Find the perfect style that suits you.`;
   
  return (
    <>
      <ProductGrid
        title={title}
        description={description}
        category={category}
        subcategory={subcategory}
        categories={categoryData.subcategory.map((item) => ({
          value: item.toLowerCase().replace(" ", "-"),
          label: item,
        }))}
      />
    </>
  );
}

export default CategoryPage;