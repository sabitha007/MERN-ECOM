import React from "react";
import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("sellerId");
    localStorage.removeItem("token");
    navigate("/seller/login");
  };
  return (
    <div className="sidebar">
      <div className="logo-section">
        <i className="fa-solid fa-cart-shopping"></i>

        <h1>ECOM APP</h1>
      </div>
      <h2 className="section-heading">Dashboard</h2>
      <div className="dashboard-section">
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i className="fa-solid fa-table-columns"></i>
          DashBoard
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/product">
          <i className="fa-solid fa-gift"></i>
          Inventory
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/category">
          <i className="fa-solid fa-warehouse"></i>
          Category
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/subcategory">
          <i className="fa-solid fa-inbox"></i>
          Subcategory
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/order">
          <i className="fa-brands fa-first-order"></i>
          Orders
        </NavLink>
      </div>
      <h2 className="section-heading">Setting</h2>
      <div className="dashboard-section">
        <NavLink className="sidebar-link" to="/seller/account">
          <i className="fa-solid fa-table-columns"></i>
          Account
        </NavLink>

        <p className="sidebar-link" onClick={onClick}>
          <i className="fa-sharp fa-light fa-right-from-bracket"></i>
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
