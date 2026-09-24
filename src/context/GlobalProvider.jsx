import { useEffect, useReducer } from "react";
import { GlobalContext, globalReducer, initialState } from "./global-context";

// 2. El Provider guarda el estado con useReducer y lo comparte con todos sus hijos.
export default function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  // Cada vez que cambia el historial, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(state.history));
  }, [state.history]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
