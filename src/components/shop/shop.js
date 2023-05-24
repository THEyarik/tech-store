import { Axios } from "axios";
import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { useEffect, useState } from "react";


export const Shop = () => {
//   var[PRODUCTS1,setPRODUCTS1] = useState();

// useEffect(() => {
//   const fecthAllClient = async () => {
//     try {
//       const res = await Axios.get("http://localhost:3001/products/all")
//       console.log(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   fecthAllClient()
//   console.log(PRODUCTS1);
// })

  return (
    <div className="shop">
      <div className="shopTitle">
        <h1> Tech Shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product data={product} />
        ))}
      </div>
    </div>
  );
};