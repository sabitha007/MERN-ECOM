import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../../Components/Customer/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import Productcard from "../../../Components/Customer/Productcard";

const Home = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const fetchCategory = async () => {
    const response = await axios.get("http://localhost:8000/category");
    setCategory(response.data);
  };
  const fetchProduct = async () => {
    const response = await axios.get("http://localhost:8000/product");
    setProduct(response.data);
  };
  const fetchProductWithCat = async (catId) => {
    const response = await axios.get(
      `http://localhost:8000/product?category=${catId}`
    );

    setProduct(response.data);
  };
  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);
  console.log(product);
  return (
    <>
      <div className="home">
        <ToastContainer></ToastContainer>
        <Navbar />
      </div>
      <div className="home-img"></div>
      <div className="home-category">
        <div className="home-category-container">
          {category.map((item) => (
            <div
              onClick={() => {
                fetchProductWithCat(item._id);
              }}
              className="img-div"
            >
              <img src={item.image} alt="" crossOrigin="anonymous" />
              <p> {item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="productcard-container">
        {product.map((item) => (
          <Productcard
            thumpnailimage={item.thumbnailimage}
            name={item.name}
            description={item.description}
            price={item.price}
            discount={item.discount}
            sellerId={item.sellerid}
            productId={item._id}
          />
        ))}
      </div>
      ;
    </>
  );
};

export default Home;
