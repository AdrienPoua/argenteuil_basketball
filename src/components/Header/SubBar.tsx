import React, { useContext, useEffect } from "react";
import { MenuContext, ScrollingContext } from "../../App";
import SubItem from "./SubItem";

export default function SubBar() {
  const { isMenuOpen, dataMenu, setIsMenuOpen } = useContext(MenuContext);

  return (
    <>
      {isMenuOpen && (
        <div className= 'flex gap-24 py-5 justify-center items-center'>
          {dataMenu?.subItems?.map((item) => (
            <SubItem data={item} key={item.title} />
          ))}
        </div>
      )}
    </>
  );
}
