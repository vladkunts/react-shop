import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import React from 'react';
import { api } from './api/wooConfig';

import Products from './components/pages/Products';
import Cart from './components/pages/Cart';
import NoMatch from './components/pages/NoMatch';

import logo from './logo.svg';
import './App.css';
import 'reactjs-popup/dist/index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    message: ''
  });

  //If there is something to show in the modal, we show it
  useEffect(() => {
    setShowModal(!(!modalData.title.length && !modalData.message.length))
  }, [modalData])

  //Handler of all actions on the product in the cart
  const handleActionWithCartProduct = (action, productId, manualValue = null) => {
    const product = products.find(product => product.id === productId);
    const cartProductId = cart.findIndex(product => product.id === productId);

    if(action === "add"){
      if(cartProductId >= 0)
        cart[cartProductId].count++;
      else
        cart.push({id: product.id, count: 1});
    }
    if(action === "sub"){
      if(cart[cartProductId].count > 0)
        cart[cartProductId].count--;
    }
    if(action === "remove"){
      cart.splice(cartProductId, 1);
    }
    if(action === "set"){
      cart[cartProductId].count = manualValue;
    }
    setCart([...cart]);
  }

  //Creating woo order
  const handleCreateOrder = ( clientData ) => {
    api
    .post("orders", {
      payment_method: "cod",
      payment_method_title: "By cash",
      set_paid: true,
      billing: {
        first_name: clientData.firstname,
        last_name: clientData.surname,
        address_1: clientData.address,
        address_2: "",
        city: clientData.city,
        state: clientData.state,
        postcode: clientData.postcode,
        country: clientData.country,
        email: clientData.email,
        phone: clientData.phone
      },
      shipping: {
        first_name: clientData.firstname,
        last_name: clientData.surname,
        address_1: clientData.address,
        address_2: "",
        city: clientData.city,
        state: clientData.state,
        postcode: clientData.postcode,
        country: clientData.country
      },
      line_items: cart.map(item => { return {product_id: item.id, quantity: item.count} }),
    })
    .then((response) => {
      if (response.status === 201) {
        console.log("it's response...");
        console.log(response);
        setCart([]);
        setModalData({title: "Order created", message: "Thank you for your order!"});
      }
    })
    .catch((error) => {
      console.log("it's error");
      console.log(error);
      setModalData({title: "Error!", message: error.message});
    });
  }

  //We will transfer only the necessary fields to the basket
  let cartProducts = cart.map(cartProduct => {
      const product = products.find(product => product.id === cartProduct.id);
      return {
        id: cartProduct.id,
        name: product.name,
        img: product.images[0].src,
        price: product.price,
        count: cartProduct.count,
      }
    })

  return (
  <BrowserRouter>
    <div className="flex flex-col min-h-[100vh]">
      <header>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} className="logo" alt="logo" />
            <span className="font-semibold">Game Shop</span>
          </Link>
          <Link to="/cart" className="flex gap-2">
            <span>{cart.length}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </Link>
        </div>
      </header>
      <div className="container mx-auto flex-grow py-12">
          <Routes>
            <Route path="/" element={<Products list={products} handleAddToCart={handleActionWithCartProduct} setProducts={setProducts} />} />
            <Route path="/cart" element={<Cart list={cartProducts} handleActionWithCartProduct={handleActionWithCartProduct} handleCreateOrder={handleCreateOrder} />} />
            <Route path="/404" element={<NoMatch />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
      </div>
      <footer>
        <div className="container mx-auto">
          2023 &copy; Game Shop
        </div>
      </footer>
    </div>
    {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl w-full text-center font-semibold">{modalData.title}</h3>
                  <button
                    className="z-10 p-1 pt-0 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalData({title:'', message:''})}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 leading-tight flex-auto">
                  <p className="my-4 text-slate-500 text-base leading-relaxed">{modalData.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
  </BrowserRouter>
  );
}

export default App;
