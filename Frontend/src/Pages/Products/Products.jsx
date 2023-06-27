import { useSelector } from "react-redux";
import ProductCard from "../../Components/TopProducts/ProductCard";
import { selectAllBrands } from "../../Features/Brand/BrandSlice";
import { useEffect, useState } from "react";
import FilterMenu from "./FilterMenu";
import { selectAllProducts } from "../../Features/Products/ProductSlice";
const Products = () => {
  const products = useSelector(selectAllProducts);
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const Brands = useSelector(selectAllBrands);
  const [priceFilter, setPriceFilter] = useState("LowToHigh");
  const handleCheckInput = (event) => {
    if (event.target.checked) {
      const newSelectedBrands = [...selectedBrands, event.target.value];
      setSelectedBrands(newSelectedBrands);
    } else {
      const newSelectedBrands = selectedBrands.filter(
        (brand) => brand !== event.target.value
      );
      setSelectedBrands(newSelectedBrands);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    let sortedProducts = [...products];
    if (selectedBrands.length) {
      sortedProducts = sortedProducts.filter((product) =>
        selectedBrands.includes(String(product.Brand.id))
      );
    } else {
      sortedProducts = [...products];
    }
    sortedProducts =
      priceFilter === "LowToHigh"
        ? sortedProducts.sort((p1, p2) => p1.price - p2.price)
        : sortedProducts.sort((p1, p2) => p2.price - p1.price);
    setFilteredProducts(sortedProducts);
  }, [selectedBrands, priceFilter]);

  const BrandFilter = Brands.map((Brand) => (
    <div key={Brand.id} className="flex items-center">
      <input
        id={Brand.id}
        type="checkbox"
        value={Brand.id}
        className="w-4 h-4"
        onChange={(e) => {
          handleCheckInput(e);
        }}
      />
      <label htmlFor={Brand.id} className="ml-2 font-medium">
        {Brand.name}
      </label>
    </div>
  ));
  const priceFilterElement = (
    <>
      <div className="flex items-center">
        <input
          id="HighToLow"
          type="radio"
          value="HighToLow"
          name="price"
          className="w-4 h-4"
          checked={priceFilter === "LowToHigh" ? false : true}
          onChange={(e) => setPriceFilter(e.target.value)}
          onTouchStart={(e) => setPriceFilter(e.target.value)}
        />
        <label htmlFor="HighToLow" className="ml-2 font-medium">
          High to Low
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="LowToHigh"
          type="radio"
          value="LowToHigh"
          name="price"
          className="w-4 h-4"
          checked={priceFilter === "LowToHigh" ? true : false}
          onChange={(e) => setPriceFilter(e.target.value)}
          onTouchStart={(e) => setPriceFilter(e.target.value)}
        />
        <label htmlFor="" className="ml-2 font-medium">
          Low to High
        </label>
      </div>
    </>
  );
  return (
    <section className="flex">
      <section className="md:w-[75%] mx-auto relative px-8">
        <h2 className="text-3xl font-bold my-4 mx-2">Products</h2>
        <FilterMenu
          BrandFilter={BrandFilter}
          priceFilterElement={priceFilterElement}
          className={"md:hidden block absolute top-6 right-10 px-2 z-10"}
        />

        <hr className="h-1 bg-yellow-950 mx-auto rounded-full mt-2"></hr>
        <section className="flex flex-wrap items-center">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              className={
                "sm:max-w-[45%] md:max-w-[40%] lg:max-w-[30.9%] max-w-[90%] min-w-[90%] sm:min-w-[45%] md:min-w-[40%] lg:min-w-[30.9%] my-6 md:mx-4 lg:mx-2 mx-2"
              }
            />
          ))}
        </section>
      </section>
      <section className="h-screen right-0 w-[25%] ml-8 px-4 md:block hidden">
        <h2 className="text-3xl font-bold my-4 mx-2">Filters</h2>
        <hr className="h-1 bg-yellow-950 mx-auto rounded-full mt-2"></hr>
        <fieldset className="mt-2">
          <legend className="my-1 font-semibold text-lg">Brands</legend>
          <div className="ml-4 space-y-2 text-md">{BrandFilter}</div>
        </fieldset>
        <fieldset className="mt-2">
          <legend className="my-1 font-semibold text-lg">Price</legend>
          <div className="ml-4 space-y-2 text-md">{priceFilterElement}</div>
        </fieldset>
      </section>
    </section>
  );
};

export default Products;
