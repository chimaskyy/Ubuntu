/* eslint-disable react/prop-types */
import ImageCard from "./ImageCard";


export default function CategoryCard({ category }) {
  return (
    <ImageCard
      image={category.image}
      title={category.title}
      link={category.page}
      overlay={true}
    />
  );
}
