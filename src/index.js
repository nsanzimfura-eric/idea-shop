import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { motion, AnimatePresence } from "framer-motion";
import { productsData } from "./productsData";

function CurveFN() {
  const initialPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q-100 ${window.innerHeight / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${window.innerHeight} L100 ${
    window.innerHeight
  } Q100 ${window.innerHeight / 2} 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className="svgCurve">
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      ></motion.path>
    </svg>
  );
}

//animation variables

const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

// cart for user
const items = [
  { id: 1, name: "Item 1", quantity: 3, price: 10 },
  { id: 2, name: "Item 2", quantity: 2, price: 15 },
  { id: 3, name: "Item 3", quantity: 4, price: 8 },
];

// svgs------------
const Done = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 96 96"
    className="done"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_26_6)">
      <path
        d="M77.2959 30.7716L71.2314 22.36L43.9626 60.1825L50.0271 68.5941L77.2959 30.7716ZM95.5325 22.36L50.0271 85.4771L32.0486 60.6001L25.9841 69.0117L50.0271 102.36L101.64 30.7716L95.5325 22.36ZM1.64 69.0117L25.683 102.36L31.7475 93.9484L7.74753 60.6001L1.64 69.0117Z"
        fill="#0BFA31"
      />
    </g>
    <defs>
      <clipPath id="clip0_26_6">
        <rect width="96" height="96" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 96 96"
    fill="none"
    className="cartLogo"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44 36H52V24H64V16H52V4H44V16H32V24H44V36ZM28 72C23.6 72 20.04 75.6 20.04 80C20.04 84.4 23.6 88 28 88C32.4 88 36 84.4 36 80C36 75.6 32.4 72 28 72ZM68 72C63.6 72 60.04 75.6 60.04 80C60.04 84.4 63.6 88 68 88C72.4 88 76 84.4 76 80C76 75.6 72.4 72 68 72ZM28.68 59L28.8 58.52L32.4 52H62.2C65.2 52 67.84 50.36 69.2 47.88L84.64 19.84L77.68 16H77.64L73.24 24L62.2 44H34.12L33.6 42.92L24.64 24L20.84 16L17.08 8H4V16H12L26.4 46.36L21 56.16C20.36 57.28 20 58.6 20 60C20 64.4 23.6 68 28 68H76V60H29.68C29.16 60 28.68 59.56 28.68 59Z"
      fill="#BC4823"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 56 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="deleteIcon"
  >
    <path
      d="M4 64C4 68.4 7.6 72 12 72H44C48.4 72 52 68.4 52 64V16H4V64ZM56 4H42L38 0H18L14 4H0V12H56V4Z"
      fill="#FE0000"
    />
  </svg>
);

function Cart() {
  return (
    <motion.path
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="card_product"
    >
      <div className="productsWrapper">
        <div className="products">
          {navItems.map((data, index) => {
            return (
              <div key={index} className="singleProduct">
                <div className="card single">
                  <img src="./images/cheers.jpg" alt="Card_img" />
                  <div className="body">
                    <h3>title</h3>
                    <p>detailes</p>
                    <div className="pricing">
                      <small>veicles</small> <span>12$</span>
                    </div>
                    <div className="btn">
                      <Done />
                    </div>
                  </div>
                </div>
                <div className="remove">
                  {" "}
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
        <div className="checkout">
          <div className="h1 loader">
            <span>Checkout</span>
          </div>
          <table className="details">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="price">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="payment">
            <div className="amount">
              Total Quantities: <span>{7}</span>
            </div>
            <div className="amount">
              Overall Total: <span>{1000}$</span>
            </div>
          </div>
          <div className="actions">
            <button>Process to Pay</button>
          </div>
        </div>
      </div>
      <CurveFN />
    </motion.path>
  );
}

//App

function App() {
  const [isActive, setIsActive] = useState(false);

  const handleShowCart = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="main">
        <div className="header">
          <div onClick={handleShowCart} className="button">
            <div className={`cartBtn ${isActive ? "burgerActive" : ""}`}>
              <CartIcon />
            </div>
            <span className="items">{50}</span>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Cart />}</AnimatePresence>
    </>
  );
}

//render

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
