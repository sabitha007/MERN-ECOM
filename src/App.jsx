import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import SellerLogin from "./Pages/sellerLogin";
import SellerDashboard from "./Pages/sellerDashBoard";
import SellerSignup from "./Pages/SellerSignup";
import Category from "./Pages/Category";
import AddCategory from "./Pages/AddCategory";
import Inventory from "./Pages/Inventory";
import Account from "./Pages/Account";
import Signout from "./Pages/Signout";
import Orders from "./Pages/Orders";
import SubCategory from "./Pages/SubCategory";
import Addsubcategory from "./Pages/AddSubcategory";
import Product from "./Pages/Product";
import Home from "./Pages/Customer/Home";
import Addproduct from "./Pages/AddProduct";
import Login from "./Pages/Customer/Login";
function App() {
  const Token = ({ children }) => {
    const token = localStorage.getItem("token");

    if (token) {
      return <>{children}</>;
    } else return <Navigate to="/seller/login" />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* SELLER */}

        <Route path="/seller/login" element={<SellerLogin />} />
        <Route
          path="/seller/dashboard"
          element={
            <Token>
              {" "}
              <SellerDashboard />
            </Token>
          }
        />

        <Route path="/seller/sign-up" element={<SellerSignup />} />
        <Route
          path="/seller/category"
          element={
            <Token>
              <Category />
            </Token>
          }
        />
        <Route
          path="/seller/addcategory"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/addcategory/:id"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/subcategory"
          element={
            <Token>
              <SubCategory />
            </Token>
          }
        />
        <Route
          path="/seller/addsubcategory"
          element={
            <Token>
              <Addsubcategory />
            </Token>
          }
        />
        <Route
          path="/seller/addsubcategory/:id"
          element={
            <Token>
              <Addsubcategory />
            </Token>
          }
        />
        <Route
          path="/seller/order"
          element={
            <Token>
              <Orders />
            </Token>
          }
        />

        <Route path="/seller/inventory" element={<Inventory />} />
        <Route path="/seller/account" element={<Account />} />
        <Route path="/seller/signout" element={<Signout />} />
        <Route path="/seller/product" element={<Product />} />
        <Route path="/seller/addproduct" element={<Addproduct />} />
        <Route path="/seller/addproduct/:id" element={<Addproduct />} />
        <Route path="/customer/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
