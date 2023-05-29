import Checkout from "../Checkout";
import CartItem from "../CartItem";

/*
  Cart page
*/

function Cart({ list, handleActionWithCartProduct, handleCreateOrder }) {
  return (
    <>
      <h1>Cart</h1>
      <div className="flex flex-col items-center lg:flex-row gap-12">
        <div className="flex-grow pt-8">
          {list.map(product => <CartItem key={product.id} product={product} handleActionWithCartProduct={handleActionWithCartProduct} />)}
          {list.length
            ?
            <div className="text-right text-xl">
              Total: <span className="font-semibold">{list.reduce((total, product) => total + parseFloat(product.price)*parseFloat(product.count), 0)}</span> $
            </div>
            :
            <div className="text-center">
              Cart is empty
            </div>
          }

        </div>
        <div className="sm:w-2/3 lg:w-1/3">
          <Checkout handleCreateOrder={handleCreateOrder} />
        </div>
      </div>
    </>
  );
}
export default Cart;