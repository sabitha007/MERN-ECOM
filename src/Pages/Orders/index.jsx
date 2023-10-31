import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { Button, Table } from "antd";
import Frame from "../../Components/Frame";
import "./order.css";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/orders/${id}`);
      fetchCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const orderCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/orders/${id}`}>{id}</Link>,
    },
    {
      title: "Customer",
      dataIndex: "customerId",
      render: (customer) => <p>{customer.name}</p>,
    },
    {
      title: "Product",
      dataIndex: "product",
      render: (product) => <p>{product[0].productId}</p>,
    },

    {
      title: "Delete",
      dataIndex: "_id",
      render: (id) => (
        <i class="fa-solid fa-trash delete" onClick={() => onDelete(id)}></i>
      ),
    },
  ];

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const sellerId = localStorage.getItem("sellerId");
      const response = await axios.get(
        `http://localhost:8000/orders?sellerId=6${sellerId}`
      );
      setLoading(false);
      setData(response.data);
      console.log("Data fetched successfully");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const onClick = () => {
    navigate("/seller/orders");
  };

  return (
    <Frame>
      <div className="orders">
        <div className="orders-container">
          <h1>Orders</h1>
          <div className="orders-btns">
            <Button onClick={onClick} type="primary" className="orders-btn">
              ADD CATEGORY
            </Button>
          </div>
          <Table
            className="orders-table"
            columns={orderCol}
            dataSource={data}
          />
        </div>
      </div>
    </Frame>
  );
};

export default Orders;
