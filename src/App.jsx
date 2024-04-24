import { createContext } from "react";
import Header from "./components/Header/Header";
import NewsContainer from "./components/News";
import Band from "./components/Band";
import { Match } from "./utils/models";
import matchsData from "./data/matchs.json";
import data from "./data/news.json";
import { useIsScrollingUp } from "./utils/hooks/useIsScrolling";
import useMenu from "./utils/hooks/useMenu";
import LandingPage from "./components/LandingPage";

// Création du contexte ScrollingContext
export const ScrollingContext = createContext();
export const MenuContext = createContext();

export default function App() {
  const handleMenu = useMenu();
  const isScrolling = useIsScrollingUp();

  return (
    <MenuContext.Provider value={handleMenu}>
      <ScrollingContext.Provider value={isScrolling}>
        <div className='m-auto '>
          <Header />
          <LandingPage />
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
