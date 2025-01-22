/* eslint-disable react/prop-types */
import ImageCard2 from "./ImageCard2";


export default function CategoryCard({ category }) {
  return (
    <ImageCard2
      image={category.image}
      title={category.title}
      link={category.page}
    />
  );
}
