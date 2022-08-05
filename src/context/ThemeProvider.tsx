/* eslint-disable react/jsx-no-constructed-context-values */
import {
  FC, createContext, useReducer, ReactNode, useContext,
  Reducer, MouseEventHandler,
} from 'react';


type Theme = {
  light: boolean,
  dark: boolean
}

interface ContextProps {
  theme: Theme
  onToggleThemeHandler: MouseEventHandler
}

const themeReducer: Reducer<Theme, string> = (state, action) => {
  switch (action) {
    case 'light':
      return {
        light: true,
        dark: false,
      };
    case 'dark':
      return {
        light: false,
        dark: true,
      };
    default:
      return state;
  }
};

const preferredTheme: string|null = localStorage.getItem('toDoApp-theme');

const initialTheme = (): Theme => {
  if (preferredTheme === 'light') {
    return {
      light: true,
      dark: false,
    };
  }

  if (preferredTheme === 'dark') {
    return {
      light: false,
      dark: true,
    };
  }
  return {
    light: true,
    dark: false,
  };
};

const Context = createContext({} as ContextProps);

export const useThemeContext = () => {
  return useContext(Context);
};

/**
 *
 * @description Provider to change between dark and light theme and
 * save our preferred one to localStorage.
 */
export const ThemeProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useReducer(themeReducer, initialTheme());

  const onToggleThemeHandler: MouseEventHandler = () => {
    if (theme.light) {
      setTheme('dark');
      localStorage.setItem('toDoApp-theme', 'dark');
    } else if (theme.dark) {
      setTheme('light');
      localStorage.setItem('toDoApp-theme', 'light');
    }
  };

  return (
    <Context.Provider value={{ theme, onToggleThemeHandler }}>
      <div id="app" data-theme={theme.light ? 'light' : 'dark'}>
        {children}
      </div>
    </Context.Provider>
  );
};
