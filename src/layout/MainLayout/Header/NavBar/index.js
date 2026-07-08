import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import { routes } from "config";
import { useTheme } from "@emotion/react";
import "./navbar.css";
import { Typography } from "@mui/material";

const NavBar = () => {
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
                    key={chapter.link}
                    end={chapter.link === "/"}
                    className={({ isActive }) =>
                        isActive ? "nav-bar-item active" : "nav-bar-item"
                    }
                    to={chapter.link}
                >
                    <Typography>{chapter.title}</Typography>
                </NavLink>
            ))}
        </Box>
    );
};

export default NavBar;
