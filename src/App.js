import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { MathJaxContext } from "better-react-mathjax";

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <div dir="rtl">
              d      <CssBaseline />
                    <NavigationScroll>
                        <MathJaxContext
                            version={2}
                            config={{ "fast-preview": { disabled: true } }}
                            onStartup={(mathJax) =>
                                (mathJax.Hub.processSectionDelay = 0)
                            }
                        >
                            <Routes />
                        </MathJaxContext>
                    </NavigationScroll>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
