import { useContext } from "react";
import { GlobalContext } from "../context/global-context";

// 3. Custom hook con useContext: cualquier componente lee el estado global
//    sin que se lo pasen por props (así evitamos el "prop drilling").
export default function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe usarse dentro de GlobalProvider");
  }
  return context;
}
