import "./sellersignup.css";
import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React from "react";

const SellerSignup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    address: [
      {
        addressType: "",
        housename: "",
        city: "",
        street: "",
        pincode: "",
        state: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const signupseller = async () => {
    try {
      await axios.post("http://localhost:8000/seller/sign-up", data);
      setLoading(false);
      console.log("sign up");
    } catch (e) {
      console.log("error");
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };
  const onClick = () => {
    signupseller();
  };
  return (
    <div className="seller-signup">
      <h1>ECOM APP</h1>
      <div className="form">
        <label>Name:</label>
        <Input
          onChange={(e) => onChange(e, "name")}
          size="large"
          placeholder="Name"
        />
        <label>Email:</label>
        <Input
          onChange={(e) => onChange(e, "email")}
          size="large"
          placeholder="Email"
        />
        <label>Phone:</label>
        <Input
          onChange={(e) => onChange(e, "phone")}
          size="large"
          placeholder="Phone"
        />
        <label>Password:</label>
        <Input.Password
          onChange={(e) => onChange(e, "password")}
          size="large"
          placeholder="Password"
        />
        <label>Confirm Password:</label>
        <Input.Password
          placeholder="Confirm Password"
          onChange={(e) => onChange(e, "confirmPassword")}
        />
        <label>Address Type:</label>
        <Input
          onChange={(e) => onChange(e, "addressType")}
          size="large"
          placeholder="Address Type"
        />

        <label>House Name:</label>
        <Input
          onChange={(e) => onChange(e, "housename")}
          size="large"
          placeholder="House Name"
        />
        <label>Street:</label>
        <Input
          onChange={(e) => onChange(e, "street")}
          size="large"
          placeholder="Street"
        />
        <label>City:</label>
        <Input
          onChange={(e) => onChange(e, "city")}
          size="large"
          placeholder="City"
        />
        <label>State:</label>
        <Input
          onChange={(e) => onChange(e, "state")}
          size="large"
          placeholder="State"
        />
        <label>Pincode:</label>
        <Input
          onChange={(e) => onChange(e, "pincode")}
          size="large"
          placeholder="Pincode"
        />
        <Button onClick={onClick} className="sign-up-btn" size="large">
          SIGNED-UP
        </Button>
      </div>
    </div>
  );
};

export default SellerSignup;
