const Hero = () => {
  return (
    <>
      <section className="w-full sm:w-[80%] text-4xl mx-auto text-center my-4 flex flex-col-reverse sm:flex-row justify-center items-center px-4">
        <div className=" w-full sm:w-2/3 mt-2">
          <h1 className="text-black text-3xl md:text-4xl font-bold">
            <span>Discover Your Perfect Brew at The Cafeteria</span>
            <span className="text-xl md:text-2xl block italic">
              - &ldquo;Where Coffee Dreams Come True!&rdquo;
            </span>
          </h1>
        </div>
        <div className="w-full sm:w-1/3 flex justify-center items-center mt-2">
          <img
            src="./src/assets/images/coffee.png"
            alt="Coffee Image"
            className="w-[70%]"
          />
        </div>
      </section>
      <hr className="my-2 h-1 w-[80%] bg-yellow-950 mx-auto" />
    </>
  );
};

export default Hero;
