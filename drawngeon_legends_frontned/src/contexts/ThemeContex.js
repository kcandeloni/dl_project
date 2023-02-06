import { createContext, useContext, useReducer } from "react";

import { lightTheme, darkTheme } from "../components/common/themes";

const ThemeContext = createContext();
const TYPES = Object.freeze({
  LIGHT: "light",
  DARK: "dark"
});

function reducer(state, action) {
  if (action.type === "dark") {
    return darkTheme;
  }
  return lightTheme;
}

function ThemeProvider({ children }) {
  const [theme, dispatch] = useReducer(reducer, lightTheme);

  return (
    <ThemeContext.Provider value={{ theme, dispatch, TYPES }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Contexto Theme não encontrado");
  }
  return context;
}

export { useTheme, ThemeProvider };
