'use client'
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingCartProps {
  rating: number; // Expected to be between 0 and 5
}

const RatingCart: React.FC<RatingCartProps> = ({ rating }) => {
  // Create an array of star icons based on the rating
  const stars = Array.from({ length: 5 }, (_, index) => {
    if (rating >= index + 1) {
      return <IoStar key={index} />; // Full star
    } else if (rating >= index + 0.5) {
      return <IoStarHalf key={index} />; // Half star
    } else {
      return <IoStarOutline key={index} />; // Empty star
    }
  });

  return <div className="text-secondaryButtonColor flex">{stars}</div>;
};

export default RatingCart;
