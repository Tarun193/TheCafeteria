import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/API/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../../Features/orderSlice/orderSlice";
const MyOrders = () => {
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrders);
  return (
    <section className="w-full my-10 flex justify-center items-center">
      <section className="w-[90%] md:w-[80%] lg:w-1/2 mx-auto bg-white p-2 py-4 rounded-xl space-y-4">
        {!orders?.length ? (
          <h2 className="text-xl sm:text-3xl font-bold text-center">
            You Didn't Placed Order Yet !!!
          </h2>
        ) : (
          <div>
            {orders.map((order) => (
              <article
                key={order.id}
                className="space-y-1 flex flex-col sm:flex-row"
              >
                <div className="max-w-[200px] max-h-[200px]">
                  <img
                    src={BASE_URL + order?.product?.images[0]?.image}
                    alt=""
                  />
                </div>
                <div className="mt-4">
                  <Link to={`/products/${order?.product?.id}`}>
                    <p className="font-bold">{order?.product?.title}</p>
                  </Link>
                  <p className="space-x-4">
                    <span>
                      Paid:{" "}
                      {Number(
                        Number(order?.quantity) *
                          Number(order?.product?.price) *
                          1.13
                      ).toFixed(2)}
                    </span>
                    <span>Qty: {order?.quantity}</span>
                  </p>
                  <p className="text-blue-400">Status: {order?.status}</p>
                  <button
                    className="mt-6 border border-black py-1 px-2"
                    onClick={() => navigate(`/products/${order?.product?.id}`)}
                  >
                    Buy again
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default MyOrders;
