import { createContext, useContext, useState } from "react";

const AIContext = createContext();

export function AIProvider({ children }) {
  const [aiData, setAIData] = useState(null);

  return (
    <AIContext.Provider value={{ aiData, setAIData }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  return useContext(AIContext);
}
