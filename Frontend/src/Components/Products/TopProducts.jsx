// important imports
import ProductCard from "./ProductCard";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { useRef } from "react";

const TopProducts = () => {
  // To handle the reference of the section which we have to scroll
  const productSection = useRef();

  // Function for handling the scrolling logic
  const handleScroll = (dir) => {
    const section = productSection.current;
    const scrollAmount =
      dir === "left"
        ? section.scrollLeft - (section.clientWidth + 10)
        : section.scrollLeft + (section.clientWidth + 10);

    section.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const products = [
    {
      id: 1,
      Brand: "Tim Hortons",
      title: "Chamomile tea - Natural",
      type: "decaffeinated",
      Description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromatic, calming herbal tea – naturally caffeine free.",
      Stock: 3,
      like: 0,
      Rating: 4,
      images: [
        "https://m.media-amazon.com/images/I/71Rq7qd6+8L._AC_SY445_.jpg",
      ],
      price: 4.99,
    },
    {
      id: 2,
      Brand: "Tim Hortons",
      title: "Chamomile tea - Natural",
      type: "decaffeinated",
      Description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromatic, calming herbal tea – naturally caffeine free.",
      Stock: 3,
      like: 0,
      Rating: 4,
      images: [
        "https://i5.walmartimages.com/asr/6c307a93-675d-4957-8e48-591537569309.8047a9b8ccbcd9303df9d1aa9614d827.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
      ],
      price: 4.99,
    },
    {
      id: 3,
      Brand: "Tim Hortons",
      title: "Chamomile tea - Natural",
      type: "decaffeinated",
      Description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromatic, calming herbal tea – naturally caffeine free.",
      Stock: 3,
      like: 0,
      Rating: 4,
      images: [
        "https://i5.walmartimages.com/asr/de92e6ca-2bec-4d24-839c-59b107cd9a3f.bbda9b97dec0a66a1c173729e5a66034.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
      ],
      price: 4.99,
    },
    {
      id: 4,
      Brand: "Tim Hortons",
      title: "Chamomile tea - Natural",
      type: "decaffeinated",
      Description:
        "Tim Hortons specialty teas offer the discerning tea drinker the chance to experience a variety of high quality specialty teas. Discover and enjoy our wide selection of extraordinary teas. Our soothing, revitalizing and delicious herbal teas are made from various selections of the finest herbs, flowers and spices. Tim Hortons chamomile herbal tea is an aromatic, calming herbal tea – naturally caffeine free.",
      Stock: 3,
      like: 0,
      Rating: 4,
      images: [
        "https://m.media-amazon.com/images/I/71Rq7qd6+8L._AC_SY445_.jpg",
      ],
      price: 4.99,
    },
  ];
  return (
    <section className="w-full sm:w-[80%] mx-auto font-semibold mt-6 mb-4 px-2 relative">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center sm:text-left my-2">
        Top Products
      </h2>
      <button
        className="hidden md:block hover:opacity-100 opacity-50 hover:scale-110 absolute top-[50%] z-10 left-[-1rem]"
        onClick={() => handleScroll("left")}
      >
        <BsFillArrowLeftSquareFill size={20} className="" />
      </button>
      <section
        className="flex flex-nowrap gap-4 overflow-y-auto px-1 py-3 no-scrollbar"
        ref={productSection}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
      <button
        className="hidden md:block hover:opacity-100 opacity-50 hover:scale-110 absolute top-[50%] right-[-1rem]"
        onClick={() => handleScroll("right")}
      >
        <BsFillArrowRightSquareFill size={20} className="" />
      </button>
    </section>
  );
};

export default TopProducts;
