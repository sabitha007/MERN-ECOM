import React, { useEffect, useState } from "react";
import { Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./addsubcategory.css";
import Frame from "../../Components/Frame";

const Addsubcategory = () => {
  const [data, setData] = useState({ name: "", image: "", categoryid: "" });
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const onChange = (e, key) => {
    if (key == "categoryid") {
      setData({ ...data, categoryid: e });
    } else {
      setData({ ...data, [key]: e.target.value });
    }
  };

  const addSubCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/subcategory",
        data
      );
      console.log(response)
      setLoading(false);
      navigate("/seller/subcategory");
      console.log(response);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    }
  };

  const getSubCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/subcategory/${id}`
      );

      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const editSubCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:8000/subcategory/${id}`,
        data
      );
      setLoading(false);
      navigate("/seller/subcategory");
      getSubCategory();
      console.log(response);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      const actualData = response.data.map((item) => {
        return { label: item.name, value: item._id };
      });
      console.log(actualData);
      setCategory(actualData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchCategory();
    if (id) {
      getSubCategory();
    }
  }, []);
  const onClick = () => {
    if (id) {
      editSubCategory();
    } else {
      addSubCategory();
    }
  };

  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  return (
    <Frame>
      <div className="add-sub-category">
        <h1>{id ? "EDIT SUBCATEGORY" : "ADD SUBCATEGORY"}</h1>

        <div className="form">
          <label>Name:</label>
          <Input
            className=""
            placeholder="Name"
            size="large"
            value={data.name}
            onChange={(e) => onChange(e, "name")}
          />
          <label>Category: </label>
          <Select
            defaultValue="select category"
            className="category-select"
            options={category}
            onChange={(e) => onChange(e, "categoryid")}
          />
          <div className="upload-div">
            <label>Image:</label>
            <Upload
              name="file"
              action="http://localhost:8000/upload"
              onChange={onUploadChange}
            >
              <Button icon={<UploadOutlined />} className="upload-btn">
                Click here to Upload
              </Button>
            </Upload>
          </div>

          <div className="add-sub-category-btn">
            <Button
              className="sub-category-btns"
              type="primary"
              size="large"
              onClick={onClick}
              // loading={loading}
            >
              {id ? "EDIT SUBCATEGORY" : "ADD SUBCATEGORY"}
            </Button>
          </div>
        </div>
      </div>
    </Frame>
  );
};
 export default Addsubcategory;