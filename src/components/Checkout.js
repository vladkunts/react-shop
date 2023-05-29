import { useState } from "react";
import StyledButton from "./StyledButton";
import CartInput from "./CartInput";

function Checkout({ handleCreateOrder }) {
  const defaultCheckoutInfo = {
    firstname: "",
    surname: "",
    country: "USA",
    state: "",
    postcode: "",
    city: "",
    address: "",
    email: "",
    phone: "",
  }
  const [checkoutInfo, setCheckoutInfo] = useState(defaultCheckoutInfo);
  
  const handleInput = (name, value) => {
    checkoutInfo[name] = value;
    setCheckoutInfo({...checkoutInfo});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateOrder(checkoutInfo);
    setCheckoutInfo(defaultCheckoutInfo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="text-lg py-1 uppercase text-center font-semibold">Your data</div>
      <div className="checkout-row">
        <CartInput placeholder="Firstname" name="firstname" value={checkoutInfo.firstname} handleInput={handleInput} />
        <CartInput placeholder="Surname" name="surname" value={checkoutInfo.surname} handleInput={handleInput} />
      </div>
      <div className="checkout-row">
        <input type="text" className="w-full border border-gray-200 p-2" placeholder="Country" value="USA" readOnly />
        <CartInput placeholder="City" name="city" value={checkoutInfo.city} handleInput={handleInput} />
      </div>
      <div className="checkout-row">
        <CartInput placeholder="State" name="state" value={checkoutInfo.state} handleInput={handleInput} />
        <CartInput placeholder="Postcode" name="postcode" value={checkoutInfo.postcode} handleInput={handleInput} />
      </div>
      <div className="checkout-row">
        <CartInput placeholder="Address" name="address" value={checkoutInfo.address} handleInput={handleInput} />
      </div>
      <div className="checkout-row">
        <CartInput placeholder="Email" name="email" value={checkoutInfo.email} handleInput={handleInput} />
        <CartInput placeholder="Phone" name="phone" value={checkoutInfo.phone} handleInput={handleInput} />
      </div>
      <StyledButton type="submit" text="Order"  className="w-32" />
    </form>
  );
}

export default Checkout;