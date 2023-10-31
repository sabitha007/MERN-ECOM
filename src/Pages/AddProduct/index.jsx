import React, { useEffect, useState } from "react";
import { Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Frame from "../../components/Frame";
import "./addproduct.css";

const { TextArea } = Input;

const AddProducts = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    thumbnailImage: "",
    Images: "",
    categoryid: "",
    subCategoryid: "",
    varients: "",
    is_available: "",
    quantity: "",
    brand: "",
    tags: "",
    sellerid: localStorage.sellerId,
  });

  const [isAvailable, setIsAvailable] = useState(data.is_available);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = (e, key) => {
    if (key === "categoryid") {
      setData({ ...data, categoryid: e });
      fetchSubCategory(e);
    } else if (key === "is_available") {
      const isAvailableValue = e === "yes";
      setData({ ...data, [key]: isAvailableValue });
      setIsAvailable(isAvailableValue);
    } else {
      setData({ ...data, [key]: e.target.value });
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      const actualData = response.data.map((item) => {
        return { label: item.name, value: item._id };
      });
      setCategory(actualData);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/subCategory");
      const subCategoryData = response.data.map((item) => {
        return { label: item.name, value: item._id };
      });
      setSubCategory(subCategoryData);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      const productData = response.data;
      setData(productData);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/product", data);
      setLoading(false);
      navigate("/seller/product");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const editProduct = async () => {
    try {
      setLoading(true);
      await axios.patch(`http://localhost:8000/product/${id}`, data);
      setLoading(false);
      navigate("/seller/product");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onUploadChange = (info, type) => {
    if (info.file.status === "done") {
      const imageKey = type === "thumbnail" ? "thumbnailImage" : "Images";
      setData({ ...data, [imageKey]: info.file.response.imageURL });
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const onClick = () => {
    if (id) {
      editProduct();
    } else {
      addProduct();
    }
  };

  return (
    <Frame>
      <div className="add-product">
        <h1>{id ? "EDIT PRODUCT" : "ADD PRODUCT"}</h1>
        <div className="form">
          <label>Name:</label>
          <Input
            placeholder="Name"
            value={data.name}
            onChange={(e) => onChange(e, "name")}
          />

          <label>Description:</label>
          <TextArea
            rows={4}
            placeholder="Description"
            value={data.description}
            onChange={(e) => onChange(e, "description")}
          />

          <label>Price:</label>
          <Input
            placeholder="Price"
            value={data.price}
            onChange={(e) => onChange(e, "price")}
          />

          <label>Discount:</label>
          <Input
            placeholder="Discount"
            value={data.discount}
            onChange={(e) => onChange(e, "discount")}
          />

          <label>Upload Thumbnail Image:</label>
          <Upload
            name="file"
            action="http://localhost:8000/upload"
            onChange={(info) => onUploadChange(info, "thumbnail")}
          >
            <Button icon={<UploadOutlined />}>Upload Thumbnail Image</Button>
          </Upload>

          <label>Upload Regular Image:</label>
          <Upload
            name="file"
            action="http://localhost:8000/upload"
            onChange={(info) => onUploadChange(info, "regular")}
          >
            <Button icon={<UploadOutlined />}>Upload Regular Image</Button>
          </Upload>

          <label>Category:</label>
          <Select
            defaultValue="Select category"
            className="category-select"
            options={category}
            onChange={(e) => onChange(e, "categoryid")}
            value={data.categoryid.name}
          />

          <label>Sub-Category:</label>
          <Select
            defaultValue="Select sub-category"
            className="subCategory-select"
            options={subCategory}
            onChange={(e) => onChange(e, "subCategoryid")}
          />
          <label>Varients:</label>
          <Input
            placeholder="Vareints"
            value={data.varients}
            onChange={(e) => onChange(e, "varients")}
          />

          <label>Is Available:</label>
          <Select
            defaultValue={
              isAvailable
                ? { label: "Yes", value: "yes" }
                : { label: "No", value: "no" }
            }
            className="is-available-select"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(e) => onChange(e.value, "is_available")}
          />
          <label>Quantity:</label>
          <Input
            placeholder="quantity"
            value={data.quantity}
            onChange={(e) => onChange(e, "quantity")}
          />
          <label>Brand:</label>
          <Input
            placeholder="brand"
            value={data.brand}
            onChange={(e) => onChange(e, "brand")}
          />
          <label>Tags:</label>
          <Input
            placeholder="tags"
            value={data.tags}
            onChange={(e) => onChange(e, "tags")}
          />
          <label>Seller ID:</label>
          <Input placeholder="Seller ID" value={data.sellerid} disabled />
          <div className="btns">
            <Button
              type="primary"
              onClick={onClick}
              loading={loading}
              className="btn"
            >
              {id ? "EDIT PRODUCT" : "ADD PRODUCT"}
            </Button>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default AddProducts;
