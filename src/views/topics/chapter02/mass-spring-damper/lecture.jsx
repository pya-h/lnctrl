import SubCard from "../../../ui-component/cards/SubCard";
import { Grid, Typography } from "@mui/material";
import mass_spring_damper_image from "./images/mass-spring-damper.jpg.webp";
import mechanic_system_elements from "./images/mechanic-system-elements.jpg";

import "views/topics/topics.css";

import { MathJax } from "better-react-mathjax";

const formulaDisplacementDifferentialEquation =
    "$$m\\frac{d^2x(t)}{dt^2} + c\\frac{dx(t)}{dt} + kx(t) = F(t)$$";

const MassSpringDamperLecture = () => {
    return (
        <SubCard
            title="سیستم جرم فنر دمپر"
            darkBorder={true}
            sx={{ direction: "rtl" }}
        >
            <Typography>
                <Grid className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; همانطور که در سیستم های
                        الکتریکی با یک مدار الکتریکی سروکار داشتیم که شامل ۳
                        المان اصلی بود،در سیستم های مکانیکی و هیدرولیکی هم عموما
                        سه المان اصلی داریم:
                    </p>
                    <img
                        className="lecture-image"
                        src={mass_spring_damper_image}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <span className="lecture-text-titr">۱)‌ فنر: </span>
                        اولین المان فنر هست که با اعمال یک نیرو می توانیم میزان
                        کشش یا جمع شدگی یا فشردگی فنر را بدست آوریم. K ضریب ثابت
                        فنر است
                    </p>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <span className="lecture-text-titr">۲)‌ دمپر: </span>
                        دومین المانی که در سیستم های مکانیکی و هیدرولیکی وجود
                        دارد دمپر هست که با اعمال نیروی F می‌توان آن را باز یا
                        بسته کرد.
                    </p>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <span className="lecture-text-titr">۳)‌ جرم: </span>
                        المان سوم، جرم است که اینرسی را در خود ذخیره می کند و با
                        اعمال یک نیرو F می توان آن را جابه جا کرد. در سیستم های
                        مکانیکی به طور معمول بین نیرو و جابه جایی المان یک رابطه
                        برقرار است. در واقع نیرو به عنوان عامل محرک و جابه جایی
                        به عنوان عامل متحرک عمل می‌کند.
                    </p>
                    <img
                        className="lecture-image"
                        src={mechanic_system_elements}
                        alt="بارگذاری تصویر با مشکل مواجه شد"
                    />
                </Grid>
                <Grid className="lecture-text" item>
                    <p>
                        &nbsp; &nbsp; &nbsp; &nbsp; پس از تحلیل این سیستم به
                        معادله دیفرانسیل مرتبه دوم زیر می رسیم که پاسخ پاسخ آن
                        در واقع میزان جابه جایی جرم m طی مدت زمان t خواهد بود.
                    </p>
                </Grid>
                <Grid item>
                    <MathJax>{formulaDisplacementDifferentialEquation}</MathJax>
                </Grid>
            </Typography>
        </SubCard>
    );
};

export default MassSpringDamperLecture;
