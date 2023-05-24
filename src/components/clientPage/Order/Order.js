import React from 'react'
// import "./Order.css"
function Order(props) {
    // console.log(props.orderItem);
  return (
    <div clasName="orderItem">{props.orderItem.id}</div>
  )
}

export default Order