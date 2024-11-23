import React from "react"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating = ({rating, maxStar = 5} : {rating: number, maxStar: number}) => {
  const stars = [];
  for(let i = 1; i <= maxStar; i++) {
    if(i <= Math.floor(rating)) {
      // star full
      stars.push(<FaStar key={i} className="text-OnSecondary text-sm"/>)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // half star
      stars.push(<FaStarHalfAlt key={i} className="text-OnSecondary text-sm"/>)
    } else {
      stars.push(<FaRegStar key={i} className="text-OnSecondary text-sm"/>)
    }
  }
  return <div className="flex gap-1">{stars}</div>
}

export default Rating;