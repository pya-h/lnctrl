import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = colors;
    const isDark = customization?.navType === 'dark';

    const themeOption = {
        colors: color,
        direction: 'ltr',
        heading: isDark ? color.darkTextTitle : color.grey900,
        paper: isDark ? color.darkPaper : color.paper,
        backgroundDefault: isDark ? color.darkBackground : color.paper,
        background: isDark ? color.darkLevel1 : color.primaryLight,
        bgColor: isDark ? color.darkLevel2 : color.grey50,
        darkTextPrimary: isDark ? color.darkTextPrimary : color.grey700,
        darkTextSecondary: isDark ? color.darkTextSecondary : color.grey500,
        textDark: isDark ? color.darkTextTitle : color.grey900,
        menuSelected: isDark ? color.darkSecondaryMain : color.secondaryDark,
        menuSelectedBack: isDark ? color.darkLevel2 : color.secondaryLight,
        divider: isDark ? color.darkLevel1 : color.grey200,
        customization
    };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;