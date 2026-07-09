import { useSelector } from "react-redux";

// Renders the dark or light variant of a (white-background) lecture image
// depending on the active theme. Falls back to the light image if no dark
// variant is provided.
const ThemedImage = ({ light, dark, alt = "", className = "lecture-image", ...rest }) => {
    const navType = useSelector((state) => state.customization.navType);
    const src = navType === "dark" && dark ? dark : light;
    return <img className={className} src={src} alt={alt} {...rest} />;
};

export default ThemedImage;
