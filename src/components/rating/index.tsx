import { classNames } from "@/components/classNames";
import React from "react"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

const Rating = ({rating, maxStar = 5, className, size} : {rating: number, maxStar: number, className?:string, size?:number}) => {
  const stars = [];
  for(let i = 1; i <= maxStar; i++) {
    if(i <= Math.floor(rating)) {
      // star full
      stars.push(<FaStar key={i} className={classNames("text-on-secondary text-sm")} size={size} />)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // half star
      stars.push(<FaStarHalfAlt key={i} className="text-on-secondary text-sm"  size={size}/>)
    } else {
      stars.push(<FaRegStar key={i} className="text-on-secondary text-sm"  size={size}/>)
    }
  }
  return <div className={classNames("flex gap-1", className ? className : "")}>{stars}</div>
}

export default Rating;