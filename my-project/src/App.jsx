import { createContext } from "react";
import Header from "./components/Header/Header";
import NewsContainer from "./components/News";
import Band from "./components/Band";
import { Match } from "./utils/models";
import matchsData from "./data/matchs.json";
import data from "./data/news.json";
import { useIsScrolling } from "./utils/hooks/useIsScrolling";
import useMenu from "./utils/hooks/useMenu";

// Création du contexte ScrollingContext
export const ScrollingContext = createContext();
export const MenuContext = createContext();

export default function App() {
  const isScrolling = useIsScrolling();
  const handleMenu = useMenu();

  return (
    <MenuContext.Provider value={handleMenu}>
      <ScrollingContext.Provider value={isScrolling}>
        <div className='m-auto bg-primary'>
          <Header />
          <NewsContainer data={data} />
          {matchsData.map((match) => {
            const bandData = new Match(match);
            return <Band key={bandData.number} match={bandData} />;
          })}
        </div>
      </ScrollingContext.Provider>
    </MenuContext.Provider>
  );
}
