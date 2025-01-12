import ProductGrid from "@/components/ProductGrid";

function HeadWear() {
  return (
    <div>
      <ProductGrid
        title=" SHOP CLASSIC TRADITIONAL HEAD WEARS"
        description=" Shop our latest modern African head wear! Enjoy vibrant collections
            where contemporary fashion meets traditional African prints. Shop
            the latest trends."
        category="headwear"
        categories={[
          { value: "shirts", label: "Shirts" },
          { value: "pants", label: "Pants" },
          { value: "accessories", label: "Accessories" },
        ]}
      />
    </div>
  );
}

export default HeadWear;


