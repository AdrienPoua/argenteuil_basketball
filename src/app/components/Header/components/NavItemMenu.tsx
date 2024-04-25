import React, { useContext, useRef } from "react";
import { MenuContext } from "../../../utils/contexts";
import { NavItem } from "../../../types";

export default function NavItemMenu({ item }: { readonly item: NavItem }) {
  const { dataMenu, setDataMenu, setIsMenuOpen, isMenuOpen } =
    useContext(MenuContext);
  const navItemRef = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    const prevTitle = dataMenu?.title;
    const shouldToggleMenu: boolean = !isMenuOpen || (!prevTitle || (navItemRef.current && !navItemRef.current.innerText.includes(prevTitle)));
    setDataMenu(item);
    setIsMenuOpen( shouldToggleMenu );
    console.log(isMenuOpen);
  };
  

  return (
    <li
      ref={navItemRef}
      key={item.title}
      className='grow flex justify-center  text-black items-center hover:text-indigo-500'
    >
      <button
        onClick={(e) => {
          handleClick();
        }}
        className='flex grow relative px-5 py-3'
      >
        <div className='flex justify-center items-center '>
          <h3 className='flex text-xs'>{item.title}</h3>
          {/* Élément simulant un pseudo-élément ::after */}
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginLeft: "6px",
              content: "''",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "5px 5px 0",
              borderColor: "#000 transparent transparent transparent",
            }}
          />
        </div>
      </button>
    </li>
  );
}
