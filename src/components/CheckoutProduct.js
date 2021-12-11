import React from "react";
import StarIcon from '@mui/icons-material/Star';


import "./CheckoutProduct.css";
import { useStateValue } from "../StateProvider";

function CheckoutProduct({ id, image, title, price, rating }) {


  const [{basket},dispatch] = useStateValue();


  const removeFromBasket = () => {

    dispatch({
      type: "REMOVE_FROM_BASKET",
      id:id
    })

  }
  return (
    <div className="checkoutProduct">
      <img className="checkProduct_image" src={image} />
      <div className="checkProduct_info">
        <p className="checkProduct_title">{title}</p>
        <p className="checkProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon style={{ fill: "yellow" }} />
            ))}
        </div>
        <button onClick = {removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
