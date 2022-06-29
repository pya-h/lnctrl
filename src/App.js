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
// ==============================|| APP ||============================== //
const App = () => {

    const customization = useSelector((state) => state.customization);
    
    // const x = new Equation(new Poly([1, 1, 2, 4, -8,0])).approximation();
    // console.log(x);
    // const x = new Complex(0.00003, -0.00002);
    // const y = new Complex(-4.31386, 6.21075);

    // console.log("result = ",x.devide(y).toString())
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <div dir="rtl">
                    <CssBaseline />
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
