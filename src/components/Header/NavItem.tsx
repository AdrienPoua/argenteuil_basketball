import { NavItemType } from "@/types";

export const NavItem = ({ data, setActiveNav }: { data: Readonly<NavItemType>, setActiveNav: (x : string) => void }) => {

  const handleClick = () => {
    setActiveNav(data.title)
  }
  return (
    <li
      key={data.title}
      className='grow flex justify-center  text-black items-center hover:text-indigo-500'
    >
      <button
        onClick={() => {
          handleClick();
        }}
        className='flex grow relative px-5 py-3'
      >
        <div className='flex justify-center items-center '>
          <h3 className='flex text-xs'>{data.title}</h3>
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
};

