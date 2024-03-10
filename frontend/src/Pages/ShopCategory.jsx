import React, { useContext } from 'react'
import './CSS/ShopCategoty.css'
import { ShopContext } from '../Context/ShopContext'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img src={props.banner} alt="" />


    </div>
  )
}

export default ShopCategory;
