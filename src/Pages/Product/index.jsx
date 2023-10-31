import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, Table } from "antd";
import Frame from "../../components/Frame";
import "./product.css";

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addproduct/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Price", dataIndex: "price" },
    { title: "Discount", dataIndex: "discount" },
    {
      title: "Thumbnail Image",
      dataIndex: "thumbnailimage",
      render: (text) => <img src={text} alt="Thumbnail" className="item-img" />,
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (images) => {
        if (Array.isArray(images)) {
          return (
            <div>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image-${index}`}
                  className="item-img"
                  crossOrigin="anonymous"
                />
              ))}
            </div>
          );
        } else {
          return <div>No images available.</div>;
        }
      },
    },
    { title: "Category ID", dataIndex: "categoryid" },
    { title: "Subcategory ID", dataIndex: "subCategoryid" },
    { title: "Variants", dataIndex: "variants" },
    { title: "Is Available", dataIndex: "is_available" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Tags", dataIndex: "tags" },
    { title: "Seller ID", dataIndex: "sellerid" },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id) => (
        <i
          className="fa-solid fa-trash delete"
          onClick={() => onDelete(id)}
        ></i>
      ),
    },
  ];

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/product");
      setLoading(false);
      setData(response.data);
      console.log("Data fetched successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const onClick = () => {
    navigate("/seller/addproduct");
  };

  return (
    <Frame>
      <div className="product">
        <div className="product-container">
          <h1>Product</h1>
          <div className="product-btns">
            <Button onClick={onClick} type="primary" className="product-btn">
              ADD PRODUCT
            </Button>
          </div>
          <Table
            className="product-table"
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </Frame>
  );
};

export default Product;
