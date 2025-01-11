import ProductGrid from "@/components/ProductGrid";

function Men() {
  return (
    <div>
      <ProductGrid
        title="SHOP AFRICAN PRINT FOR MEN"
        description="Modern African clothing for men! UbuntuElite offers stylish African print clothing for men.  Shop our            full selection of men's African clothing below."
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

export default Men;
