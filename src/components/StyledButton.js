import { useState } from "react";

function StyledButton({ text, className, handleBtnClick = null, type = null }) {
    const [btnText, setBtnText] = useState(text);
    const localHandleBtnClick = () => {
      if(type !== "submit"){
        setBtnText("Added!");
        setInterval(()=>{
          setBtnText(text);
        }, 1500);
      }
  
      if(handleBtnClick instanceof Function) handleBtnClick();
    }
  
    return (
      <button type={(type==='submit')?'submit':'button'} onClick={localHandleBtnClick} className={"block mx-auto bg-black hover:bg-red-600 transition-colors duration-300 ease-in-out text-white w-full py-2 " + className}>{btnText}</button>
    );
}

export default StyledButton;