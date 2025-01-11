import ProductGrid from "@/components/ProductGrid";

function Footings() {
  return (
    <div>
      <ProductGrid
        title="SHOP UBUNTU FOOTINGS"
        description="Be a trendsetter in our latest modern African clothing arrivals!
            Enjoy vibrant collections where contemporary fashion meets
            traditional African prints. Shop the latest trends."
        category="men"
        categories={[
          { value: "shirts", label: "Shirts" },
          { value: "pants", label: "Pants" },
          { value: "accessories", label: "Accessories" },
        ]}
      />
    </div>
  );
}

export default Footings;

