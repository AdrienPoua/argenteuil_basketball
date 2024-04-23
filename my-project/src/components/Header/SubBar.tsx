import React, { useContext } from "react";
import { MenuContext } from "../../App";
import SubItem from "./SubItem";

export default function SubBar() {
    const { isMenuOpen, dataMenu } = useContext(MenuContext);
  return <>
  {isMenuOpen && <div className='bg-secondary flex gap-5 justify-center items-center'>

    { dataMenu?.subItems?.map((item) => (
      <SubItem data={item} key={item.title} />
    )) }
    </div>}

  
  </>;
}
