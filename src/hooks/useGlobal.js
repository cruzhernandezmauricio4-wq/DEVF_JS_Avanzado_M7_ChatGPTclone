import { useContext } from "react";
import { GlobalContext } from "../context/global-context";

export default function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal debe usarse dentro de GlobalProvider");
  }
  return context;
}
