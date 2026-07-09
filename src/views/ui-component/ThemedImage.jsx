import { useSelector } from "react-redux";

const ThemedImage = ({ light, dark, alt = "", className = "lecture-image", ...rest }) => {
    const navType = useSelector((state) => state.customization.navType);
    const src = navType === "dark" && dark ? dark : light;
    return <img className={className} src={src} alt={alt} {...rest} />;
};

export default ThemedImage;
