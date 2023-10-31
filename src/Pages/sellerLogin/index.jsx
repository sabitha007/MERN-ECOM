import "./sellerLogin.css";
import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SellerLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const loginSeller = async () => {
    try {
      const user = await axios.post("http://localhost:8000/seller/login", data);
      console.log(user);
      const SellerId = user.data.sellerid;
      const token = user.data.token;
      localStorage.setItem("sellerId", SellerId);
      localStorage.setItem("token", token);
      console.log(user);
      setLoading(false);
      navigate("/seller/dashboard");
      console.log("logged");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onClick = () => {
    loginSeller();
  };
  return (
    <div className="seller-login">
      <h1>ECOM APP</h1>
      <div className="form">
        <label>Email:</label>

        <Input
          onChange={(e) => onChange(e, "email")}
          size="large"
          placeholder="email"
        />
        <label>Password:</label>

        <Input.Password
          onChange={(e) => onChange(e, "password")}
          size="large"
          placeholder="Password"
        />
        <Button onClick={onClick} className="login-btn" size="large">
          LOGIN
        </Button>
      </div>
    </div>
  );
};
export default SellerLogin;
