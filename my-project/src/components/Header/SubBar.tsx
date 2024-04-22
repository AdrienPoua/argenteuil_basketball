import React, { useContext } from "react";
import { MenuContext } from "../../App";

export default function SubBar() {
    const { isMenuOpen } = useContext(MenuContext);
  return <>
  {isMenuOpen && <div className='bg-secondary flex'>
    
    
    SubBar
    
    
    </div>}

  
  </>;
}
