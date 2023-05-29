import { useEffect } from 'react';
import Product from '../Product';
import { api } from '../../api/wooConfig';

/*
  Product page
*/

function Products({ list, handleAddToCart, setProducts }) {
  useEffect(() => {
    fetchProducts();
  }, []);

  //get first 20 products
  let fetchProducts = () => {
    api
      .get("products", {
        per_page: 20,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("it's response");
          console.log(response);
          setProducts(response.data);
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <h1>Games</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 xl:max-w-[1200px] mx-auto">
        {list.length ? list.map(product => <Product key={product.id} data={product} handleClick={() => handleAddToCart("add", product.id)} />) : <p>Please wait...</p>}
        {}
      </div>
    </>
  );
}
export default Products;