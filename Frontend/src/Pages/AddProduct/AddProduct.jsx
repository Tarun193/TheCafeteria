import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadImagePreview from "../../Components/ImageUploadPreview/UploadImagePreview";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Features/Products/productSlice";
import { selectAllBrands } from "../../Features/Brand/BrandSlice";
import { getAuthToken, getuserInfo } from "../../Features/auth/authSlice";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const allBrands = useSelector(selectAllBrands);
  const navigate = useNavigate();
  const access = useSelector(getAuthToken)?.access;

  const addImage = (e) => {
    const newImg = [...image];
    Array.from(e.target.files).forEach((item) =>
      newImg.push({ id: newImg.length ? newImg.length + 1 : 1, image: item })
    );
    setImage(newImg);
  };

  const canSubmit =
    [title, subTitle, price, stock, description, image, brand].every(Boolean) &&
    requestStatus === "idle";

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setRequestStatus("pending");
      const data = new FormData();
      image.forEach((img) =>
        data.append("images_data", img.image, img.image.name)
      );
      data.append("title", title);
      data.append("subTitle", subTitle);
      data.append("price", price);
      data.append("stock", stock);
      data.append("description", description);
      data.append("brand_id", brand);
      dispatch(addProducts({ data, access })).unwrap();
      navigate("/");
    } catch (e) {
    } finally {
      setRequestStatus("idle");
    }
  };
  return (
    <section>
      <section className="min-h-[80vh] flex justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-6 sm:p-12 text-lg sm:text-2xl bg-white rounded-md space-y-4 shadow-lg my-8 w-2/3"
          encType="multipart/form-data"
        >
          <legend className="text-center font-bold"> Add Product</legend>
          <p className="space-y-2">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="text"
              id="titleS"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="border border-black block p-1 w-full"
            />
          </p>
          <p className="space-y-2">
            <label htmlFor="subTitle" className="block">
              Sub Title
            </label>
            <input
              type="text"
              id="subTitle"
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              className="border border-black block p-1 w-full"
            />
          </p>
          <p className="space-y-2">
            <label htmlFor="price" className="block">
              Price
            </label>
            <input
              type="number"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="border border-black block p-1 w-full"
            />
          </p>
          <p className="space-y-2">
            <label htmlFor="stock" className="block">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
              className="border border-black block p-1 w-full"
            />
          </p>
          <p className="space-y-2">
            <label htmlFor="Brand" className="block">
              Brand
            </label>
            <select
              name="Brand"
              id="Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-2 border"
            >
              <option value="" disabled="true">
                Select Brand
              </option>
              {allBrands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </p>
          <p className="space-y-2">
            <label htmlFor="description" className="block">
              Description:
            </label>
            <textarea
              row={4}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-black block p-1 w-full"
            />
          </p>
          <div>
            <p className="space-y-2">
              <label
                htmlFor="images"
                className="block text-sm bg-slate-400 p-2 w-32 rounded-sm font-semibold text-center hover:cursor-pointer"
              >
                Select images
              </label>
              <input
                type="file"
                id="images"
                multiple={true}
                onChange={(e) => addImage(e)}
                value={""}
                className="border border-black p-1 w-full hidden"
                placeholder="Prefered square(450 X 450)"
              />
            </p>
            <p className="text-sm">Preffred Square (450 X 450)</p>
          </div>
          <UploadImagePreview images={image} setImage={setImage} />
          <button
            type="submit"
            className={
              `text-md  bg-black text-white rounded-md px-3 sm:text-lg py-2 ` +
              (!canSubmit
                ? "opacity-50 hover:cursor-not-allowed"
                : "hover:cursor-pointer")
            }
            disabled={!canSubmit}
          >
            Add Product
          </button>
        </form>
      </section>
    </section>
  );
};

export default AddProduct;
