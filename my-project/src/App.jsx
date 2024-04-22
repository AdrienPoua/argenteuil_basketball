import { useState, useEffect, createContext } from "react";
import Header from "./components/Header/Header";
import NewsContainer from "./components/News";
import Band from "./components/Band";
import { Match } from "./utils/models";
import matchsData from "./data/matchs.json";
import data from "./data/news.json";
import { useIsScrolling } from "./utils/hooks/useIsScrolling";

// Création du contexte ScrollingContext
export const ScrollingContext = createContext();
export const MenuOpenContext = createContext(false);

export default function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isScrolling = useIsScrolling()

 

  return (  
    <MenuOpenContext.Provider value={[isMenuOpen, setIsMenuOpen]}>
      <ScrollingContext.Provider value={isScrolling}>
        <div className="m-auto relative bg-primary">
          <Header />
          <NewsContainer data={data} />
          {matchsData.map((match) => {
            const bandData = new Match(match);
            return <Band key={bandData.number} match={bandData} />;
          })}
        </div>
      </ScrollingContext.Provider>
    </MenuOpenContext.Provider>
  );
}
