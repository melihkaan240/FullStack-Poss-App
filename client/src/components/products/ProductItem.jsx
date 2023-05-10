import React from "react";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
    message.success("Ürün Sepete Eklendi");
  };
  return (
    <div
      className="product-item border hover:shadow-lg select-none cursor-pointer transition-all "
      key={item._id}
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28  object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;
