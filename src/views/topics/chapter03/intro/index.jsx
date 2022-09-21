import {Grid, Typography } from "@mui/material";
import "views/topics/topics.css";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";
import img_closed_loop_system_standard_model from './img/closed_loop_system_standard_model.jpg';
import img_tf_in_out from './img/tf_in_out.jpg';


const Ch03Intro = () => {
    return (
        <PinchPanCard
            title="مقدمه"
            border={true}
        >
            <Grid container>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        مدل حلقه بسته ی یک سیستم کنترلی استاندارد به صورت زیر است:
                        <br />
                    </Typography>
                </Grid>
                <Grid sx={{ m: "auto", textAlign: "center" }} xs={12} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_closed_loop_system_standard_model}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid xs={12} item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                    جهت مدل سازی سیستم به شکل تابع تبدیل، به دنبال شناخت رفتارهای تابع تبدیل‌های مربوطه هستیم. این کار برای ایجاد ابزارها و معیارهای لازم جهت طراحی کنترل کننده انجام می‌شود.
                    </Typography>
                </Grid>
                <Grid sx={{ m: "auto", textAlign: "center" }} xs={12} item>
                    <img
                        className="lecture-image"
                        style={{ maxWidth: "30rem", height: "auto" }}
                        src={img_tf_in_out}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default Ch03Intro;
