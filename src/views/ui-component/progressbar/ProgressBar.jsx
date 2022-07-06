const ProgressBar = ({
    id,
    color = "white",
    background = "lightgreen",
    borderRadius = "10px",
}) => {
    return (
        <div
            style={{
                width: "0%",
                textAlign: "right",
                background,
                color,
                borderRadius,
                padding: "1%",
            }}
            id={id}
        ></div>
    );
};

export default ProgressBar;
