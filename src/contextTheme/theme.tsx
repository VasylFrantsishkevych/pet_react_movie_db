import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from "react";

import {ITheme, ThemeType} from "./theme.interface";
import {THEMES} from "./theme.config";

interface ThemeContextProps {
    themeType: ThemeType;
    theme: ITheme;
    setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}

export const ThemeContext = createContext<ThemeContextProps>({
    themeType: 'dark',
    theme: THEMES['dark'],
} as ThemeContextProps);

export const ThemeProvider: FC<{children?: ReactNode}> = ({children}) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('dark');
    return (
        <ThemeContext.Provider value={{
            themeType: currentTheme,
            theme: THEMES[currentTheme],
            setCurrentTheme,
        }}>{children}</ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);

