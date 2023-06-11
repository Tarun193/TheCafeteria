import { useSelector } from "react-redux";
import ProductCard from "../../Components/TopProducts/ProductCard";
import { selectAllBrands } from "../../Features/Brand/BrandSlice";
import { useEffect, useState } from "react";
const Products = () => {
  const products = [
    {
      id: 1,
      title: "Chamomile tea - Natural",
      subTitle: "Chamomile tea - Natural, Pack of 20",
      price: "4.99",
      description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromati",
      stock: 10,
      likes: 0,
      images: [
        {
          id: 7,
          image: "/media/ProductImages/TH-Chamomile-20ct-Crt-Eng_kaF9Izy.jpg",
        },
      ],
      Brand: {
        id: 1,
        name: "Tim Hortons",
        logo: "/media/BrandImages/timsLogo.png",
      },
    },
    {
      id: 2,
      title: "Starbucks Caffe Verona Dark Roast Ground Coffee",
      subTitle:
        "Starbucks Caffe Verona Dark Roast Ground Coffee K-Cups - 10 CT",
      price: "18.99",
      description:
        "Muted with oil, the tumbling beans become eerily silent. A master roaster watches, knowing that if he pushes them a second too long, they'll burst into flame. White smoke hangs down as the glistening beans turn ebony. This is French roast, and you can't roast it darker. Straightforward, light-bodied with low acidity, and immensely popular since 1971, our darkest roast is adored for its intense smokiness. Designed for use with the Keurig Single Cup Brewing System to provide a premium brewed coffee experience in less than a minute—without the mess.",
      stock: 20,
      likes: 0,
      images: [
        {
          id: 18,
          image: "/media/ProductImages/star_1_cBPAcg0.jpg",
        },
      ],
      Brand: {
        id: 2,
        name: "Starbucks",
        logo: "/media/BrandImages/starbucks.png",
      },
    },
    {
      id: 3,
      title: "Chamomile tea - Natural",
      subTitle: "Chamomile tea - Natural, Pack of 20",
      price: "4.99",
      description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromati",
      stock: 10,
      likes: 0,
      images: [
        {
          id: 7,
          image: "/media/ProductImages/TH-Chamomile-20ct-Crt-Eng_kaF9Izy.jpg",
        },
      ],
      Brand: {
        id: 1,
        name: "Tim Hortons",
        logo: "/media/BrandImages/timsLogo.png",
      },
    },
    {
      id: 4,
      title: "Starbucks Caffe Verona Dark Roast Ground Coffee",
      subTitle:
        "Starbucks Caffe Verona Dark Roast Ground Coffee K-Cups - 10 CT",
      price: "18.99",
      description:
        "Muted with oil, the tumbling beans become eerily silent. A master roaster watches, knowing that if he pushes them a second too long, they'll burst into flame. White smoke hangs down as the glistening beans turn ebony. This is French roast, and you can't roast it darker. Straightforward, light-bodied with low acidity, and immensely popular since 1971, our darkest roast is adored for its intense smokiness. Designed for use with the Keurig Single Cup Brewing System to provide a premium brewed coffee experience in less than a minute—without the mess.",
      stock: 20,
      likes: 0,
      images: [
        {
          id: 18,
          image: "/media/ProductImages/star_1_cBPAcg0.jpg",
        },
      ],
      Brand: {
        id: 2,
        name: "Starbucks",
        logo: "/media/BrandImages/starbucks.png",
      },
    },
    {
      id: 5,
      title: "Chamomile tea - Natural",
      subTitle: "Chamomile tea - Natural, Pack of 20",
      price: "4.99",
      description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromati",
      stock: 10,
      likes: 0,
      images: [
        {
          id: 7,
          image: "/media/ProductImages/TH-Chamomile-20ct-Crt-Eng_kaF9Izy.jpg",
        },
      ],
      Brand: {
        id: 1,
        name: "Tim Hortons",
        logo: "/media/BrandImages/timsLogo.png",
      },
    },
    {
      id: 6,
      title: "Starbucks Caffe Verona Dark Roast Ground Coffee",
      subTitle:
        "Starbucks Caffe Verona Dark Roast Ground Coffee K-Cups - 10 CT",
      price: "18.99",
      description:
        "Muted with oil, the tumbling beans become eerily silent. A master roaster watches, knowing that if he pushes them a second too long, they'll burst into flame. White smoke hangs down as the glistening beans turn ebony. This is French roast, and you can't roast it darker. Straightforward, light-bodied with low acidity, and immensely popular since 1971, our darkest roast is adored for its intense smokiness. Designed for use with the Keurig Single Cup Brewing System to provide a premium brewed coffee experience in less than a minute—without the mess.",
      stock: 20,
      likes: 0,
      images: [
        {
          id: 18,
          image: "/media/ProductImages/star_1_cBPAcg0.jpg",
        },
      ],
      Brand: {
        id: 2,
        name: "Starbucks",
        logo: "/media/BrandImages/starbucks.png",
      },
    },
    {
      id: 7,
      title: "Chamomile tea - Natural",
      subTitle: "Chamomile tea - Natural, Pack of 20",
      price: "4.99",
      description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromati",
      stock: 10,
      likes: 0,
      images: [
        {
          id: 7,
          image: "/media/ProductImages/TH-Chamomile-20ct-Crt-Eng_kaF9Izy.jpg",
        },
      ],
      Brand: {
        id: 1,
        name: "Tim Hortons",
        logo: "/media/BrandImages/timsLogo.png",
      },
    },
    {
      id: 8,
      title: "Starbucks Caffe Verona Dark Roast Ground Coffee",
      subTitle:
        "Starbucks Caffe Verona Dark Roast Ground Coffee K-Cups - 10 CT",
      price: "18.99",
      description:
        "Muted with oil, the tumbling beans become eerily silent. A master roaster watches, knowing that if he pushes them a second too long, they'll burst into flame. White smoke hangs down as the glistening beans turn ebony. This is French roast, and you can't roast it darker. Straightforward, light-bodied with low acidity, and immensely popular since 1971, our darkest roast is adored for its intense smokiness. Designed for use with the Keurig Single Cup Brewing System to provide a premium brewed coffee experience in less than a minute—without the mess.",
      stock: 20,
      likes: 0,
      images: [
        {
          id: 18,
          image: "/media/ProductImages/star_1_cBPAcg0.jpg",
        },
      ],
      Brand: {
        id: 2,
        name: "Starbucks",
        logo: "/media/BrandImages/starbucks.png",
      },
    },
  ];
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const Brands = useSelector(selectAllBrands);

  const handleCheckInput = (event) => {
    console.log(event);
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
    console.log(selectedBrands);
    if (selectedBrands.length) {
      const newFilteredProducts = products.filter((product) => {
        return selectedBrands.includes(String(product.Brand.id));
      });
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedBrands]);
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
  console.log(BrandFilter);
  return (
    <section className="flex">
      <section className="md:w-[75%] mx-auto relative px-8">
        <h2 className="text-3xl font-bold my-4 mx-2">Products</h2>
        {/* <button className="absolute right-0 top-2 border border-black rounded-md px-3">
          <p className="font-bold text-2xl">Filters</p>
        </button> */}
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
          <div className="ml-4 space-y-2 text-md">
            <div className="flex items-center">
              <input
                id=""
                type="radio"
                value="HighToLow"
                name="price"
                className="w-4 h-4"
              />
              <label htmlFor="" className="ml-2 font-medium">
                High to Low
              </label>
            </div>
            <div className="flex items-center">
              <input
                id=""
                type="radio"
                value="LowToHigh"
                name="price"
                className="w-4 h-4"
              />
              <label htmlFor="" className="ml-2 font-medium">
                Low to High
              </label>
            </div>
          </div>
        </fieldset>
      </section>
    </section>
  );
};

export default Products;
