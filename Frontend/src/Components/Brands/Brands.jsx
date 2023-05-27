const Brands = () => {
  const Brands = [
    {
      id: 1,
      img: "./src/assets/images/KrispyKremeLogo.png",
      name: "Kirspy Kreme",
    },
    {
      id: 2,
      img: "./src/assets/images/timsLogo.png",
      name: "Tim Hortons",
    },
    {
      id: 3,
      img: "./src/assets/images/starbucks.png",
      name: "StarBucks",
    },
    {
      id: 4,
      img: "./src/assets/images/costaCoffee.png",
      name: "StarBucks",
    },
  ];
  return (
    <section className="w-full sm:w-[80%] mx-auto font-semibold mt-6 mb-4 px-2">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center sm:text-left">
        Associated Brands
      </h2>
      <div className="flex justify-center items-center flex-wrap">
        {Brands.map((brand) => (
          <div key={brand.id} className="w-1/2 md:w-1/3">
            <img src={brand.img} alt={brand.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
