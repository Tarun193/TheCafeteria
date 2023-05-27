const ProductCardContent = ({ product }) => {
  return (
    <div className="space-y-1 mt-1 font-mono relative text-xs sm:text-sm md:text-md">
      <p className="text-left">{product.title}</p>
      <p>${product.price}</p>
      <p>Rating:{product.Rating}</p>
    </div>
  );
};

export default ProductCardContent;
