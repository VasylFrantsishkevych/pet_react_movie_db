import {ITheme, ThemeType} from "./theme.interface";
import {ThemeColors} from "./theme.colors";

export const THEMES: Record<ThemeType, ITheme> = {
    dark: {
        '--background': ThemeColors.DARK
    },
    light: {
        '--background': ThemeColors.LIGHT
    }
};
