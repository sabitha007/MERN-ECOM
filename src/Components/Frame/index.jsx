import "./frame.css";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
const Frame = (props) => {
  return (
    <div className="frame">
      <Sidebar />
      <div className="right-frame">
        <Navbar />
        <div className="content">
          <h1 className="header">{props.heading}</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
};
export default Frame;
