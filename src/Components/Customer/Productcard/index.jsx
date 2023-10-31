import { Card } from "antd";
import { Button } from "antd";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

import "./card.css";

const Productcard = (props) => {
  const [customer, setCustomer] = useState({});
  const getCustomerById = async () => {
    const customerId = localStorage.getItem("customerId");
    const response = await axios.get(
      `http://localhost:8000/customer/${customerId}`
    );

    setCustomer(response.data);
  };
  const onBuy = async () => {
    const customerId = localStorage.getItem("customerId");
    const sellerId = props.sellerId;
    const products = [
      {
        productId: props.productId,
        quantity: 1,
      },
    ];
    await getCustomerById();
    const address = customer.address;
    await axios.post("http://localhost:8000/order", {
      customerid: customerId,
      sellerid: sellerId,
      products: products,
      shippingaddress: address,
    });

    toast("orderplaced");
  };
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={<img alt="example" src={props.thumbnailimage} />}
    >
      <div className="content">
        <div className="price">
          <h2>{props.price}</h2>
          <h3>{props.discount}</h3>
          <h1>{props.name}</h1>
          <p>{props.description}</p>
          <p>{props.sellerId}</p>
          <div className="btns">
            <Button onClick={onBuy}>BUY</Button>
            <Button>ADD TO CART</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Productcard;
