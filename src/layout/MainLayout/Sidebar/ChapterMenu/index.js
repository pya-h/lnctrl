// material-ui
import { Typography } from "@mui/material";
// project imports
import NavGroup from "./NavGroup";
import chapterRelatedMenuHandler from "menu";
import { useEffect, useState } from "react";
// ==============================|| SIDEBAR MENU LIST ||============================== //
import { useLocation } from "react-router";

const ChapterMenu = () => {
    // right side menu that is updated each time new chapter is selected
    // this menu actualy contains the sub chapters the selected chapter
    const [thisChaptersMenu, updateThisChaptersMenu] = useState(
        chapterRelatedMenuHandler
    ); // this chapter's menu
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        updateThisChaptersMenu(
            chapterRelatedMenuHandler.load(pathname) // do not use chapterMenu.load => it cause infinite useEffect call
        );
    }, [pathname]);

    const navItems = thisChaptersMenu.items.map((item) => {
        switch (item.type) {
            case "group":
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography
                        key={item.id}
                        variant="h6"
                        color="error"
                        align="center"
                    >
                        خطا در بارگذاری مباحث
                    </Typography>
                );
        }
    });

    return <> {navItems} </>;
};

export default ChapterMenu;
