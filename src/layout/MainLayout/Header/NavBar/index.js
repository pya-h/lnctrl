import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { routes } from "config";
import { useTheme } from "@emotion/react";
import "./navbar.css";
import { useLocation } from "react-router";
import { path } from "toolshed";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const NavBar = () => {
    const location = useLocation();
    const { pathname } = location;

    const [currentChapter, setCurrentChapter] = useState("/");

    useEffect(() => {
        const current = path.hierarchy(
            "test = ",
            `${routes.root}${routes.chapter}02/${routes.hydraulic_systems_modeling}`
        );
        setCurrentChapter(current[0]);
        // setActive(
        //     path.hierarchy(pathname)[0] ===
        //         path.hierarchy(chapter.link)[0]
        // );
    }, [pathname]);
    const theme = useTheme();
    const chapterList = [
        { title: "Topics", link: "/" },
        {
            title: "Chapter 2",
            link: `${routes.root}${routes.chapter}02`,
        },
        {
            title: "Chapter 3",
            link: `${routes.root}${routes.chapter}03`,
        },
        {
            title: "Chapter 4",
            link: `${routes.root}${routes.chapter}04`,
        },
        {
            title: "Chapter 5",
            link: `${routes.root}${routes.chapter}05`,
        },
        {
            title: "Chapter 6",
            link: `${routes.root}${routes.chapter}06`,
        },
        {
            title: "Chapter 7",
            link: `${routes.root}${routes.chapter}07`,
        },

        { title: "Tools", link: "/toolbox" },
    ];
    const updateActivityCheck = (chapter) => {
        // setActive(
        //     path.hierarchy(pathname)[0] ===
        //         path.hierarchy(chapter.link)[0]
        // );
    };
    return (
        <Box
            sx={{
                display: "flex",
                [theme.breakpoints.down("md")]: {
                    width: "auto",
                },
            }}
        >
            {chapterList.map((chapter) => (
                <NavLink
                    isActive={() =>
                        path.hierarchy(chapter.link)[0] === currentChapter
                    }
                    // onActiveStyle={{ color: "#18BC9C" }}
                    onClick={() => updateActivityCheck(chapter)}
                    className="nav-bar-item"
                    to={chapter.link}
                >
                    <Typography>{chapter.title}</Typography>
                </NavLink>
            ))}
        </Box>
    );
};

export default NavBar;
