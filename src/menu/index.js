// assets
import { IconBike, IconPalette, IconShadow, IconWindmill } from "@tabler/icons";
import { routes } from "config";
import {path} from "toolshed";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import DataArrayIcon from "@mui/icons-material/DataArray";
import HubIcon from "@mui/icons-material/Hub";
import ShowerIcon from "@mui/icons-material/Shower";
import WebhookIcon from "@mui/icons-material/Webhook";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
// constant
const icons = {
    BubbleChartIcon,
    IconBike,
    IconPalette,
    IconShadow,
    IconWindmill,
    CropLandscapeIcon,
    DataArrayIcon,
    HubIcon,
    ShowerIcon,
    WebhookIcon,
};

const load = (pathname) => {
    let topics = {
        id: "topics",
        title: "فصل مورد نظر را انتخاب کنید",
        type: "group",
        children: [],
        load,
    };
    const hierarchy = path.hierarchy(pathname);
    if (hierarchy[0] === `${routes.chapter}02`)
        topics = {
            id: "topics",
            title: "مباحث",
            type: "group",
            children: [
                {
                    id: `${routes.chapter}02`,
                    title: "مقدمه",
                    type: "item",
                    url: `${routes.chapter}02`,
                    icon: icons.BubbleChartIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.hydraulic_systems_modeling,
                    title: "سیستم هیدرولیکی",
                    type: "item",
                    url: `${routes.chapter}02/${routes.hydraulic_systems_modeling}`,
                    icon: icons.ShowerIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.mechanic_systems_modeling,
                    title: "سیستم مکانیکی",
                    type: "item",
                    url: `${routes.chapter}02/${routes.mechanic_systems_modeling}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.space_state_equations,
                    title: "معادلات فضای حالت",
                    type: "item",
                    url: `${routes.chapter}02/${routes.space_state_equations}`,
                    icon: icons.DataArrayIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.block_diagrams_algebra,
                    title: "عملیات جبری دیاگرام بلوکی",
                    type: "item",
                    url: `${routes.chapter}02/${routes.block_diagrams_algebra}`,
                    icon: icons.CropLandscapeIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.sfg_algebra,
                    title: "عملیات جبری نمودار گذر سیگنال",
                    type: "item",
                    url: `${routes.chapter}02/${routes.sfg_algebra}`,
                    icon: icons.WebhookIcon,
                    breadcrumbs: false,
                },
            ],
        };
    else if (hierarchy[0] === `${routes.chapter}03`)
        topics = {
            id: "topics",
            title: "مباحث",
            type: "group",
            children: [
                {
                    id: `${routes.chapter}03`,
                    title: "مقدمه",
                    type: "item",
                    url: `${routes.chapter}03`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.fst_order_tf,
                    title: "بررسی توابع تبدیل مرتبه اول",
                    type: "item",
                    url: `${routes.chapter}03/${routes.fst_order_tf}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.snd_order_tf,
                    title: "بررسی توابع تبدیل مرتبه دوم",
                    type: "item",
                    url: `${routes.chapter}03/${routes.snd_order_tf}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.design_by_characteristics,
                    title: "طراحی سیستم از طریق مشخصات",
                    type: "item",
                    url: `${routes.chapter}03/${routes.design_by_characteristics}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
            ],
        };
    else if (hierarchy[0] === `${routes.chapter}04`)
        topics = {
            id: "topics",
            title: "مباحث",
            type: "group",
            children: [
                {
                    id: `${routes.chapter}04`,
                    title: "مقدمه",
                    type: "item",
                    url: `${routes.chapter}04`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.hurwitz_criterion,
                    title: "معیار پایداری هرویتز",
                    type: "item",
                    url: `${routes.chapter}04/${routes.hurwitz_criterion}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.routh_hurwitz_criterion,
                    title: "معیار پایداری روث-هرویتز",
                    type: "item",
                    url: `${routes.chapter}04/${routes.routh_hurwitz_criterion}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
            ],
        };
        else if (hierarchy[0] === `${routes.chapter}05`)
            topics = {
                id: "topics",
                title: "مباحث",
                type: "group",
                children: [
                    {
                        id: `${routes.chapter}05`,
                        title: "مقدمه",
                        type: "item",
                        url: `${routes.chapter}05`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.root_locus,
                        title: "مکان هندسی",
                        type: "item",
                        url: `${routes.chapter}05/${routes.root_locus}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    
                ],
            };
        else if (hierarchy[0] === `${routes.chapter}06`)
            topics = {
                id: "topics",
                title: "مباحث",
                type: "group",
                children: [
                    {
                        id: `${routes.chapter}06`,
                        title: "مقدمه",
                        type: "item",
                        url: `${routes.chapter}06`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.rc_filter_frequency_response,
                        title: "پاسخ فرکانسی فیلتر RC",
                        type: "item",
                        url: `${routes.chapter}06/${routes.rc_filter_frequency_response}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.frequency_response,
                        title: "پاسخ فرکانسی",
                        type: "item",
                        url: `${routes.chapter}06/${routes.frequency_response}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.bode_plot,
                        title: "نمودار بود",
                        type: "item",
                        url: `${routes.chapter}06/${routes.bode_plot}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.bode_example,
                        title: "مثالی از نمودار بود",
                        type: "item",
                        url: `${routes.chapter}06/${routes.bode_example}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.delayed_systems,
                        title: "سیستم های تاخیردار",
                        type: "item",
                        url: `${routes.chapter}06/${routes.delayed_systems}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.nyquist_plot,
                        title: "نمودار نایکوئیست",
                        type: "item",
                        url: `${routes.chapter}06/${routes.nyquist_plot}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.nicoles_chart,
                        title: "نمودار اندازه و فاز نیکولز",
                        type: "item",
                        url: `${routes.chapter}06/${routes.nicoles_chart}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.m_circle,
                        title: "مکان هندسی اندازه ثابت",
                        type: "item",
                        url: `${routes.chapter}06/${routes.m_circle}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.n_circle,
                        title: "مکان هندسی فاز ثابت",
                        type: "item",
                        url: `${routes.chapter}06/${routes.n_circle}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                ],
            };
    return {
        items: [topics],
        load,
    };
};

// ==============================|| MENU ITEMS ||============================== //
const chapterRelatedMenuHandler = {
    items: [
        {
            id: "none",
            title: "فصل مورد نظر را انتخاب کنید",
            type: "group",
            children: [],
        },
    ],
    load,
};

export default chapterRelatedMenuHandler;
