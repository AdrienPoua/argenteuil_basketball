import { NavItemType, SubItemsType } from "@/types";

type NavItemProps = {
  data: NavItemType;
  setActiveNav: (data : NavItemType) => void;
}


export const NavItem: React.FC<NavItemProps> = ({ data, setActiveNav }) => {
  return (
    <li
      key={data.title}
      className='grow flex justify-center  text-black items-center hover:text-indigo-500'
    >
      <button className='flex grow relative px-5 py-3' onClick={() => setActiveNav(data)}>
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