import StyledButton from './StyledButton'

function Product({ data, handleClick }) {
  return (
    <div className="product-item border border-black p-6 flex flex-col">
      <img src={data.images[0].src} alt={data.name} />
      <div className="mt-4 font-semibold text-lg leading-tight flex-grow">{data.name}</div>
      <div className="my-3 text-lg font-semibold">{data.price} $</div>
      <StyledButton text="Add to cart" handleBtnClick={handleClick} />
    </div>
  );
}

export default Product;