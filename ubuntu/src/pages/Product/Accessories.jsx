import ProductGrid from "@/components/ProductGrid";

function Accessories() {
  return (
    <div>
      <ProductGrid
        title="shop ubuntu Accessories"
        description="Ubuntu accessories are the perfect addition to your wardrobe! Add
            bold African print accessories to all your outfits with our
            selection of bags and wallets, print head wears, and more!. Our
            collection features unique African print accessories that add a
            touch of cultural flair to any ensemble. Shop our full selection
            below."
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

export default Accessories;
