function CartInput({ name, value, placeholder, handleInput }) {
  let type;
  switch(name){
    case 'email':
      type = 'email';
      break;
    case 'phone':
      type = 'tel';
      break;
    default:
      type = 'text';
  }
  
  return (
    <input required type={type} pattern={(name==='postcode')?"[0-9]{5}":null} className="w-full border border-gray-200 p-2" onChange={(event) => handleInput(name, event.target.value)} value={value} placeholder={placeholder} />
  );
}
export default CartInput;