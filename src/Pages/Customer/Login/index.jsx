import "./login.css";
import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const loginCustomer = async () => {
    try {
      const user = await axios.post(
        "http://localhost:8000/customer/login",
        data
      );
      console.log(user);
      const Login = user.data.customerId;
      const token = user.data.token;
      localStorage.setItem("customerId", Login);
      localStorage.setItem("token", token);
      console.log(user);
      setLoading(false);
      navigate("/");
      console.log("logged");
    } catch (e) {
      console.log(e);
    }
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onClick = () => {
    loginCustomer();
  };
  return (
    <div className="customer-login">
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
export default Login;
