import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import { gridSpacing } from "store/constant";
import ChapterSelectDarkCard from "./ChapterSelectDarkCard";
import { routes } from "config";

// ==============================|| DEFAULT Home Page ||============================== //

const sections = [
    {
        title: "فصل دوم",
        subtitle: "نمایش سیستم های کنترلی",
        link: `${routes.root}${routes.chapter}02`},
    {
        title: "فصل سوم",
        subtitle: "تحلیل عملکرد گذرا و ماندگار سیستم های کنترلی",
        link: `${routes.root}${routes.chapter}03`},
    {
        title: "فصل چهارم",
        subtitle: "پایداری",
        link: `${routes.root}${routes.chapter}04`},
    {
        title: 'فصل پنجم',
        subtitle: 'مکان هندسی',
        link: `${routes.root}${routes.chapter}05`},
    {
        title: 'فصل ششم',
        subtitle: 'پاسخ فرکانسی',
        link: `${routes.root}${routes.chapter}06`
    },
    {
        title: 'فصل هفتم',
        subtitle: 'طراحی سیستم های کنترل خطی',
        link: `${routes.root}${routes.chapter}07`  
    },
    
];
const HomePage = () => {
    const [isLoading , setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {sections.map((section) => (
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <ChapterSelectDarkCard
                                title={section.title}
                                subtitle={section.subtitle}
                                link={section.link}
                                isLoading={isLoading}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
