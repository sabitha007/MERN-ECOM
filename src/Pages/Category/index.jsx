import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { Button, Table } from "antd";
import Frame from "../../Components/Frame";
import "./category.css";

const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/category/${id}`);
      fetchCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const categoryCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addcategory/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => (
        <img src={text} crossOrigin="anonymous" className="item-img" />
      ),
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
      const response = await axios.get("http://localhost:8000/category");
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
    navigate("/seller/addcategory");
  };

  return (
    <Frame>
      <div className="category">
        <div className="category-container">
          <h1>Category</h1>
          <div className="category-btns">
            <Button
              onClick={onClick}
              type="primary"
              className="addcategory-btn"
            >
              ADD CATEGORY
            </Button>
          </div>
          <Table
            className="category-table"
            columns={categoryCol}
            dataSource={data}
          />
        </div>
      </div>
    </Frame>
  );
};

export default Category;
