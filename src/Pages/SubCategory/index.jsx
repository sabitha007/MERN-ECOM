import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { Button, Table } from "antd";
import Frame from "../../Components/Frame";
import "./subcategory.css";

const SubCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/subcategory/${id}`);
      fetchCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const categoryCol = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => <Link to={`/seller/addsubcategory/${id}`}>{id}</Link>,
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
      const response = await axios.get("http://localhost:8000/subcategory");
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
    navigate("/seller/addsubcategory");
  };

  return (
    <Frame>
      <div className="subcategory">
        <div className="subcategory-container">
          <h1>SubCategory</h1>
          <div className="subcategory-btns">
            <Button
              onClick={onClick}
              type="primary"
              className="addsubcategory-btn"
            >
              ADD CATEGORY
            </Button>
          </div>
          <Table
            className="subcategory-table"
            columns={categoryCol}
            dataSource={data}
          />
        </div>
      </div>
    </Frame>
  );
};

export default SubCategory;
