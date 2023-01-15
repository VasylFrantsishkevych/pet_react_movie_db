import {ITheme, ThemeType} from "./theme.interface";
import {ThemeColors} from "./theme.colors";

export const THEMES: Record<ThemeType, ITheme> = {
    dark: {
        '--background-wrap': ThemeColors.DARK,
        '--background-main': ThemeColors.BLACK,
        '--primary': ThemeColors.DARK_GREY,
        '--secondary': ThemeColors.DARK_GREY_SECONDARY,
        '--auxiliary': ThemeColors.ALMOST_BLACK,
        '--border-pagination': ThemeColors.GREY,
        '--color-text-primary': ThemeColors.COLOR_TEXT_DARK,
        '--color-text-secondary': ThemeColors.COLOR_TEXT_DARK_SECONDARY
    },
    light: {
        '--background-wrap': ThemeColors.LIGHT,
        '--background-main': ThemeColors.GREY,
        '--primary': ThemeColors.LIGHT_GREY,
        '--secondary': ThemeColors.LIGHT_GREY_SECONDARY,
        '--auxiliary': ThemeColors.GREY,
        '--border-pagination': ThemeColors.GREY,
        '--color-text-primary': ThemeColors.COLOR_TEXT_LIGHT,
        '--color-text-secondary': ThemeColors.COLOR_TEXT_LIGHT_SECONDARY
    }
};
