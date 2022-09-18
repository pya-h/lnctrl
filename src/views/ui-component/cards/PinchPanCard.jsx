import SubCard from "./SubCard";
import { MapInteractionCSS } from "react-map-interaction";
import { useSelector } from "react-redux";

const PinchPanCard = ({ children, title, border }) => {
    const customization = useSelector((state) => state.customization);
    return (
        <SubCard title={title} darkBorder={border} sx={{ direction: "rtl" }}>
            <MapInteractionCSS disableZoom={!customization.enableZoom}>
                {children}
            </MapInteractionCSS>
        </SubCard>
    );
};

export default PinchPanCard;
