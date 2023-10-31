import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("token");
    navigate("/");
  };
  const onLogIn = () => {
    navigate("/customer/login");
  };
  return (
    <div className="customer-navbar">
      <div className="left">
        <h1>ECOM</h1>
      </div>
      <div className="right">
        <p>Home</p>
        <p>Category</p>
        <p>Cart</p>
        <p>Order</p>
        <p>Account</p>
        {localStorage.getItem("token") ? (
          <Button onClick={onLogOut}>Log Out</Button>
        ) : (
          <Button onClick={onLogIn}>Log In</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
