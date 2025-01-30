const filterProducts = (products, searchValue) => {
  if (!searchValue) return [];

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export default filterProducts;