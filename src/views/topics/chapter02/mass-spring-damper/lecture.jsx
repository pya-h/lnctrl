import { Grid, Typography } from "@mui/material";
import mass_spring_damper_image from "./images/mass-spring-damper.jpg.webp";
import mechanic_system_elements from "./images/mechanic-system-elements.jpg";

import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";
import PinchPanCard from "views/ui-component/cards/PinchPanCard";

const MassSpringDamperLecture = () => {
    return (
        <PinchPanCard title="سیستم جرم فنر دمپر" border={true}>
            <Grid container>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        همانطور که در سیستم های الکتریکی با یک مدار الکتریکی
                        سروکار داشتیم که شامل ۳ المان اصلی بود،در سیستم های
                        مکانیکی و هیدرولیکی هم عموما سه المان اصلی داریم:
                    </Typography>
                </Grid>

                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={mass_spring_damper_image}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        <span className="lecture-text-titr">۱)‌ فنر: </span>
                        اولین المان فنر هست که با اعمال یک نیرو می توانیم میزان
                        کشش یا جمع شدگی یا فشردگی فنر را بدست آوریم. K ضریب ثابت
                        فنر است
                        <br />
                        <span className="lecture-text-titr">۲)‌ دمپر: </span>
                        دومین المانی که در سیستم های مکانیکی و هیدرولیکی وجود
                        دارد دمپر هست که با اعمال نیروی F می‌توان آن را باز یا
                        بسته کرد.
                        <br />
                        <span className="lecture-text-titr">۳)‌ جرم: </span>
                        المان سوم، جرم است که اینرسی را در خود ذخیره می کند و با
                        اعمال یک نیرو F می توان آن را جابه جا کرد. در سیستم های
                        مکانیکی به طور معمول بین نیرو و جابه جایی المان یک رابطه
                        برقرار است. در واقع نیرو به عنوان عامل محرک و جابه جایی
                        به عنوان عامل متحرک عمل می‌کند.
                    </Typography>
                </Grid>
                <Grid xs={12} sx={{ m: "auto" }} item>
                    <img
                        className="lecture-image"
                        src={mechanic_system_elements}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid item>
                    <Typography sx={{ px: 2 }} style={{ lineHeight: "2.5" }}>
                        پس از تحلیل این سیستم به معادله دیفرانسیل مرتبه دوم زیر
                        می رسیم که پاسخ پاسخ آن در واقع میزان جابه جایی جرم m طی
                        مدت زمان t خواهد بود.
                        <MathJax>
                            {"$$m\\frac{d^2x(t)}{dt^2} + c\\frac{dx(t)}{dt} + kx(t) = F(t)$$"}
                        </MathJax>
                    </Typography>
                </Grid>
            </Grid>
        </PinchPanCard>
    );
};

export default MassSpringDamperLecture;
