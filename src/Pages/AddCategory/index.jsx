import React, { useState, useEffect } from "react";
import "./addcategory.css";
import { Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AddCategory = () => {
  const [data, setData] = useState({ image: "", name: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id);

  const getCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/category/${id}`);
      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, []);

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const addCategory = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/category", data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };
  const editCategory = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8000/category/${id}`, data);
      setLoading(false);
      navigate("/seller/category");
      getCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  const onClick = () => {
    // addCategory();
    if (id) {
      editCategory();
    } else {
      addCategory();
    }
  };

  return (
    <div className="add-category">
      <h1>{id ? "EDIT CATEGORY" : "ADD CATEGORY"}</h1>
      <div className="form">
        <label>Name:</label>
        <Input
          onChange={(e) => onChange(e, "name")}
          size="large"
          placeholder="Name"
          value={data.name}
        />
        <label>Image:</label>
        <Upload
          className="file"
          action="http://localhost:8000/upload"
          onChange={onUploadChange}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <div className="add-category-btn">
          <Button
            onClick={onClick}
            className="category-btn"
            size="large"
            type="primary"
            // loading={loading}
          >
            {id ? "UPDATECATEGORY" : "ADD CATEGORY"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
