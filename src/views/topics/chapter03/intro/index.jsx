import {Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_closed_loop_system_standard_model from './img/closed_loop_system_standard_model.jpg';
import img_tf_in_out from './img/tf_in_out.jpg';


const Ch03Intro = () => {
    return (
        <PinchPanCard
            title="Introduction"
            border={true}
        >
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        The closed-loop model of a standard control system is as follows:
                        <br />
                    </Typography>
                </Grid>
                <Grid sx={{ m: "auto", textAlign: "center" }} xs={12} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_closed_loop_system_standard_model}
                        alt="Image loading failed"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    In order to model the system in the form of a transfer function, we seek to understand the behaviors of the relevant transfer functions. This is done to create the tools and criteria needed for controller design.
                    </Typography>
                </Grid>
                <Grid sx={{ m: "auto", textAlign: "center" }} xs={12} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_tf_in_out}
                        alt="Image loading failed"
                    />
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default Ch03Intro;
