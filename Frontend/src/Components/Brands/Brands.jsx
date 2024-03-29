import { useSelector } from "react-redux";
import { selectAllBrands } from "../../Features/Brand/BrandSlice";
import { BASE_URL } from "../../utils/API/api";

const Brands = () => {
  const Brands = useSelector(selectAllBrands);
  return (
    <section className="w-full sm:w-[80%] mx-auto font-semibold mt-6 mb-4 px-2">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center sm:text-left">
        Associated Brands
      </h2>
      <div className="flex justify-center items-center flex-wrap">
        {Brands.map((brand) => (
          <div key={brand.id} className="w-1/2 md:w-1/3">
            <img src={BASE_URL + brand.logo} alt={brand.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
