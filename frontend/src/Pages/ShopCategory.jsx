import React, { useContext } from "react";
import "./CSS/ShopCategoty.css";
import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  if (!all_product || !all_product.products) {
    return <div>Loading...</div>; // or display a loading indicator
  }
  // console.log(all_product.products[0].category);
  // console.log(props.category);
  const product = all_product.products.find(
    (e) => e.category === props.category,
  );
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      {/* <div className="shopcategory-indexSort"> */}
      {/*   <div className="shopcatagory-sort"> */}
      {/*     Sort by <img src={dropdown_icon} alt="" /> */}
      {/*   </div> */}
      {/* </div> */}
      <div className="shopcategory-products">
        {all_product.products.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ShopCategory;
