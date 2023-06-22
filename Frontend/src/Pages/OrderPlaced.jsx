import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);

  return (
    <h1 className="text-black text-center text-xl sm:text-3xl md:text-4xl font-extrabold mt-20">
      Order Placed 🔥!!
    </h1>
  );
};

export default OrderPlaced;
