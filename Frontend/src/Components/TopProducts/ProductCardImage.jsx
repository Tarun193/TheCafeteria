const ProductCardImage = ({ img }) => {
  return (
    <div className="overflow-hidden shadow-sm shadow-black rounded-lg mb-2">
      <img
        src={img}
        alt="Product"
        className="p-2 object-contain aspect-square"
      />
    </div>
  );
};

export default ProductCardImage;
