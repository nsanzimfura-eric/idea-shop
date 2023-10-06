import React, { useEffect, useState, useRef } from "react";
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
    <g clipPath="url(#clip0_26_6)">
      <path
        d="M77.2959 30.7716L71.2314 22.36L43.9626 60.1825L50.0271 68.5941L77.2959 30.7716ZM95.5325 22.36L50.0271 85.4771L32.0486 60.6001L25.9841 69.0117L50.0271 102.36L101.64 30.7716L95.5325 22.36ZM1.64 69.0117L25.683 102.36L31.7475 93.9484L7.74753 60.6001L1.64 69.0117Z"
        fill="#0BFA31"
      ></path>
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
    ></path>
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
    ></path>
  </svg>
);

//carousel container

const CarouselFlow = (props) => {
  const RADIUS = 1200;
  const FLIP_RANGE = 3;
  const el = useRef(null);
  const img = useRef(null);
  let angleUnit, currentIndex, currentAngle;
  const [card, setCard] = useState(null);
  const { handleAddToCart } = props;

  function setTransform(el, xpos, zpos, angle, flipAngle) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${angle}deg) rotateX(${flipAngle}deg)`;
  }
  const imagesData = [...props.imageData, ...props.imageData];

  useEffect(() => {
    angleUnit = 360 / imagesData.length;
    currentIndex = currentAngle = 0;
    target(0, true);
  }, [imagesData]);

  // Target an item and make it center
  function target(index, initial = false) {
    // Display full size image if matched index
    if (!initial && index == currentIndex) pickImage(imagesData[index]);

    // Calculate amount of angle to shift
    let deltaAngle = -(index - currentIndex) * angleUnit;
    if (deltaAngle < -180) deltaAngle += 360;
    else if (deltaAngle > 180) deltaAngle -= 360;

    currentAngle += deltaAngle;
    currentIndex = index;

    // Rotate the container and flip item angle
    const cf = el.current;
    cf.style.transform = `translateZ(-1250px) rotateY(${currentAngle}deg)`;

    // Flip items angle
    let fliptAngle = 90;
    const items = cf.children;

    // Iterate the items and apply transformation
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemAngle = angleUnit * i;
      const itemAngleRad = (itemAngle * Math.PI) / 180;
      const xpos = Math.sin(itemAngleRad) * RADIUS;
      const zpos = Math.cos(itemAngleRad) * RADIUS;

      let deltaIndex = Math.abs(i - index);
      if (deltaIndex > cf.children.length / 2) {
        deltaIndex = cf.children.length - deltaIndex;
      }
      if (deltaIndex <= FLIP_RANGE) {
        fliptAngle = deltaIndex * (90 / FLIP_RANGE);
      } else fliptAngle = 90;
      setTransform(item, xpos, zpos, itemAngle, fliptAngle);
    }
  }

  // Display full size image
  const pickImage = (card) => {
    setCard(card);
    img.current.style.transform = "scale(1, 1)";
  };

  const handleHideImg = (_) => {
    setCard(null);
    img.current.style.transform = "scale(0, 0)";
  };

  return (
    <div className="container">
      <div className="availableonSm">
        {props.imageData &&
          props.imageData.map((data, index) => (
            <div key={index} className="singleProduct">
              <SingleCard
                data={data}
                index={index}
                handleAddToCart={handleAddToCart}
                target={() => null}
              />
            </div>
          ))}
      </div>
      <div className="carouselflow" ref={el}>
        {imagesData.map((data, index) => (
          <div key={index} className="carouselflow-item">
            <SingleCard
              data={data}
              index={index}
              handleAddToCart={handleAddToCart}
              target={target}
            />
          </div>
        ))}
      </div>
      <div className="image-display" ref={img}>
        {card && (
          <SingleCard
            data={card}
            index={card.id}
            handleAddToCart={handleAddToCart}
            target={handleHideImg}
          />
        )}
      </div>
    </div>
  );
};

const SingleCard = (props) => {
  const { data, handleAddToCart, index, target } = props;

  return (
    <div className="card single">
      <img src={data.img} alt="Card_img" onClick={() => target(index)} />
      <div className="body" onClick={() => target(index)}>
        <h3>{data.name}</h3>
        <p>{data.details}</p>
        <div className="pricing">
          <small>Gategory: {data.category}</small> <span>{data.price}$</span>
        </div>
      </div>
      <div className="btnAdd" onClick={() => handleAddToCart(data.id)}>
        <span className="btnClick">
          Add to <CartIcon />
        </span>
      </div>
    </div>
  );
};

function Cart(props) {
  const { addedToCart, handleRemoveFromCart, totalQuantity } = props;
  const totalPrice = addedToCart.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <motion.path
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="card_product"
      transition={{ duration: 2 }}
    >
      <div className="productsWrapper">
        <div className="products">
          {addedToCart &&
            addedToCart.map((data, index) => {
              return (
                <div key={index} className="singleProduct">
                  <div className="card single">
                    <img src={data.img} alt="Card_img" />
                    <div className="body">
                      <h3>{data.name}</h3>
                      <p>{data.details}</p>
                      <div className="pricing">
                        <small>Gategory: {data.category}</small>{" "}
                        <span>{data.price}$</span>
                      </div>
                      <div className="btn btnAdd">
                        <span>Added to cart</span>
                        <Done />
                      </div>
                    </div>
                    <div className="remove">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="circle"
                        onClick={() => handleRemoveFromCart(data.id)}
                      >
                        <DeleteIcon />
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          {addedToCart.length === 0 && (
            <div
              style={{
                color: "white",
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Empty Cart
            </div>
          )}
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
              {addedToCart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="price">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="payment">
            <div className="amount">
              Total Quantities: <span>{totalQuantity}</span>
            </div>
            <div className="amount">
              Overall Total: <span>{totalPrice}$</span>
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
  const [addedToCart, setAddedToCart] = useState([]);

  const vehiclesProducts = productsData.filter(
    (prod) => prod.category === "vehicles"
  );
  const others = productsData.filter((prod) => prod.category !== "vehicles");

  const handleShowCart = () => {
    setIsActive(!isActive);
  };

  const handleAddToCart = (id) => {
    const productToAdd = productsData.find((product) => product.id === id);

    if (!productToAdd) {
      return;
    }

    const existingProduct = addedToCart.find(
      (addedProd) => addedProd.id === productToAdd.id
    );

    if (existingProduct) {
      setAddedToCart((prevCart) =>
        prevCart.map((item) =>
          item.id === existingProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setAddedToCart((prevCart) => [
        ...prevCart,
        { ...productToAdd, quantity: 1 },
      ]);
    }
  };
  //data logic
  useEffect(() => {
    localStorage.setItem("productsData", JSON.stringify(productsData));
  }, []);

  useEffect(() => {
    localStorage.setItem("addedToCart", JSON.stringify(addedToCart));
  }, [addedToCart]);

  const totalQuantity = addedToCart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const handleRemoveFromCart = (id) => {
    const updatedCart = addedToCart.filter((item) => item.id !== id);

    setAddedToCart(updatedCart);
  };

  return (
    <>
      <div className={isActive ? "main fixed" : "main"}>
        <div className="header">
          <motion.div
            initial={{ x: "-200px" }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 1.5, stiffness: 90 }}
            onClick={handleShowCart}
            className="button"
          >
            <div className={`cartBtn ${isActive ? "burgerActive" : ""}`}>
              <CartIcon />
            </div>
            <span className="items">{totalQuantity}</span>
          </motion.div>
        </div>
        <header className="appHeader">
          <div className="loader">
            <span>iDeAsHoP</span>
          </div>
        </header>
        <div className="bodyApp">
          <motion.h4
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 30 }}
            style={{ textAlign: "center" }}
          >
            Welcome to <strong>Idea shop!</strong> Buy your favourite items at
            the lowest price
          </motion.h4>
          <div
            className="allProducts"
            style={{ width: "100%", padding: 0, margin: 0 }}
          >
            <motion.h2
              initial={{ y: "-100vw" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.5, delay: 0.2, stiffness: 120 }}
            >
              Get you Favourites here
            </motion.h2>
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, stiffness: 120 }}
              className="products"
            >
              {others &&
                others.map((data, key) => {
                  return (
                    <div key={key} className="singleProduct">
                      <SingleCard
                        data={data}
                        index={key}
                        handleAddToCart={handleAddToCart}
                        target={() => null}
                      />
                    </div>
                  );
                })}
            </motion.div>
          </div>

          <motion.h2
            initial={{ x: "-100vw", y: "-20vh" }}
            animate={{ x: 0, y: 0 }}
            transition={{ duration: 1.5, delay: 1, stiffness: 120 }}
            styles={{ marginTob: 30 }}
          >
            Navigate Vehicles market
          </motion.h2>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, stiffness: 120 }}
          >
            <CarouselFlow
              imageData={vehiclesProducts}
              handleAddToCart={handleAddToCart}
            />
          </motion.div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && (
          <Cart
            addedToCart={addedToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            totalQuantity={totalQuantity}
          />
        )}
      </AnimatePresence>
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
