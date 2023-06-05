import React, { useEffect } from "react";

const Checkout = ({
  open,
  setOpen,
  handleClose,
  scroll,
  descriptionElementRef,
  handlePlaceOrder,
  itemPrice,
  setItemPrice,
  shippingTax,
  shippingInfo,
  showSummary,
  setShowSummary,
}) => {
  useEffect(() => {
    console.log("this is checkout");
  }, []);
  return <div></div>;
};

export default Checkout;
