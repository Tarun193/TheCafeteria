import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken, getuserInfo } from "../../Features/auth/authSlice";
import { addreview } from "../../Features/Products/ProductSlice";
const ReviewSection = ({ product_id, reviews }) => {
  const [reviewStars, setReviewStars] = useState(0);
  const [review, setReview] = useState("");
  const user = useSelector(getuserInfo)?.user_id;
  const access = useSelector(getAuthToken)?.access;
  const [orderedReviews, setOrderedReviews] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviews) {
      const reviewsCopy = [...reviews]; // create a copy of the array
      const sorted = reviewsCopy.sort((r1, r2) =>
        r2.id > r1.id ? 1 : r2.id < r1.id ? -1 : 0
      );
      setOrderedReviews(sorted);
    }
  }, [reviews]);
  const handleReviewSubmission = () => {
    try {
      const data = {
        product_id,
        user_id: user,
        stars: reviewStars,
        review,
      };
      dispatch(addreview({ access, data })).unwrap();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto bg-white p-4 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <div className="space-y-2">
        <p className="font-semibold ml-1">Write your Review</p>
        <div className="flex items-center space-x-1">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <svg
                key={index}
                aria-hidden="true"
                className={`w-8 h-8 hover:cursor-pointer ${
                  index < reviewStars
                    ? "text-yellow-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setReviewStars(index + 1)}
              >
                <title>First star</title>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
        </div>
        <p>
          <textarea
            name="review"
            id="review"
            rows="4"
            placeholder="Your Feedback"
            className="border border-black p-2 w-full sm:w-[30%]"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </p>
      </div>
      <button
        type="button"
        className={`border border-black px-2 py-1  ${
          !user
            ? "hover:cursor-not-allowed opacity-60"
            : "hover:text-white hover:bg-black"
        }`}
        disabled={!user}
        onClick={() => handleReviewSubmission()}
      >
        Submit
      </button>
      <hr className="h-1 bg-yellow-950 w-2/3 mx-auto rounded-full mt-2" />
      {!orderedReviews?.length ? (
        <p className="text-center text-2xl font-bold my-2">No reviews Yet !!</p>
      ) : (
        <section>
          <h3 className="font-bold text-2xl  my-3">Customer Reviews:</h3>
          <div className="space-y-2 w-full sm:w-1/2">
            {orderedReviews?.map((r) => (
              <div key={r.id}>
                <p className="font-semibold italic text-lg">{r.user_name}</p>
                <div className="flex items-start space-x-1">
                  {Array(r.stars)
                    .fill(0)
                    .map((_, index) => (
                      <svg
                        key={index}
                        aria-hidden="true"
                        className={`w-5 h-5 hover:cursor-pointer relative left-[-0.2rem] text-yellow-400`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setReviewStars(index + 1)}
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                </div>
                <p className="text-md font-semibold my-1">{r.review}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ReviewSection;
