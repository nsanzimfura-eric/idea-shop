import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { motion, AnimatePresence } from "framer-motion";

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

function Cart() {
  return (
    <motion.div
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
                <div className="card"></div>
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
    </motion.div>
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
            <div className={`burger ${isActive ? "burgerActive" : ""}`}></div>
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
