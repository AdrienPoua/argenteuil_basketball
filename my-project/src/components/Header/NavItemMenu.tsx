import React, { useContext, useRef } from "react";
import { MenuContext } from "../../App";

export default function NavItemMenu({ item }) {
  const { dataMenu, setDataMenu, setIsMenuOpen, isMenuOpen } =
    useContext(MenuContext);
  const navItemRef = useRef(null);

  const handleClick = () => {
    const prevTitle = dataMenu?.title;
    setDataMenu(item);
    setIsMenuOpen(!isMenuOpen || !navItemRef?.current?.innerText.includes(prevTitle));
  };
  return (
    <li
      ref={navItemRef}
      key={item.title}
      className='grow flex justify-center items-center'
    >
      <button
        onClick={(e) => {
          handleClick(e);
        }}
        className='flex grow p-5 border relative' // Ajout de la position relative
      >
        <div className='flex justify-center items-center gap-3 '>
          <h3 className='flex '>{item.title}</h3>
          {/* Élément simulant un pseudo-élément ::after */}
          <div
            style={{
              display: "inline-block",
              verticalAlign: "middle",
              marginLeft: "6px",
              content: "''", // Définition de contenu vide pour simuler un pseudo-élément
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
