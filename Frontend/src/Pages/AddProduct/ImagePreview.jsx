const ImagePreview = ({ images, setImage }) => {
  const handleImageRemove = (id) => {
    const newImages = images.filter((image) => image.id != id);
    setImage(newImages);
  };
  return (
    <div className="space-x-2">
      {images
        ? images.map((image) => (
            <div className="inline-block" key={image.id}>
              <img
                src={URL.createObjectURL(image.image)}
                alt=""
                width={150}
                height={150}
                className="border"
              />
              <button
                className="text-sm text-red-400"
                type="button"
                onClick={() => handleImageRemove(image.id)}
              >
                Remove
              </button>
            </div>
          ))
        : null}
    </div>
  );
};

export default ImagePreview;
