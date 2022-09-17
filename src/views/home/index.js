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
        title: "Chapter Two",
        subtitle: "Representation of Control Systems",
        link: `${routes.root}${routes.chapter}02`},
    {
        title: "Chapter Three",
        subtitle: "Analysis of the transient and steady-state performance of control systems",
        link: `${routes.root}${routes.chapter}03`},
    {
        title: "Chapter Four",
        subtitle: "Stability",
        link: `${routes.root}${routes.chapter}04`},
    {
        title: 'Chapter Five',
        subtitle: 'Root locus',
        link: `${routes.root}${routes.chapter}05`},
    {
        title: 'Chapter Six',
        subtitle: 'Frequency response',
        link: `${routes.root}${routes.chapter}06`
    },
    {
        title: 'Chapter Seven',
        subtitle: 'Design of Linear Control Systems',
        link: `${routes.root}${routes.chapter}07`  
    },
    
];
const HomePage = () => {
    const [ , setLoading] = useState(true);
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
