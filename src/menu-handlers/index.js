// assets
import { IconBike, IconPalette, IconShadow, IconWindmill } from "@tabler/icons";
import { routes } from "config";
import tools from 'tools';
// constant
const icons = {
    IconBike,
    IconPalette,
    IconShadow,
    IconWindmill,
};

const load = (pathname) => {
    let topics = {
        id: "topics",
        title: "فصل مورد نظر را انتخاب کنید",
        type: "group",
        children: [],
        load,
    };
    const hierarchy = tools.path.hierarchy(pathname);
    if (hierarchy[0] === `${routes.chapter}02`)
        topics = {
            id: "topics",
            title: "مباحث",
            type: "group",
            children: [
                {
                    id: "ch02intro",
                    title: "مقدمه",
                    type: "item",
                    url: `${routes.chapter}02`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "hydraulics",
                    title: "سیستم هیدرولیکی",
                    type: "item",
                    url: `${routes.chapter}02/${routes.hydraulic_systems_modeling}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "mechanics",
                    title: "سیستم مکانیکی",
                    type: "item",
                    url: `${routes.chapter}02/${routes.mechanic_systems_modeling}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "space_state",
                    title: "معادلات فضای حالت",
                    type: "item",
                    url: `${routes.chapter}02/${routes.space_state_equations}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "block_diagrams_algebra",
                    title: "عملیات جبری دیاگرام بلوکی",
                    type: "item",
                    url: `${routes.chapter}02/${routes.block_diagrams_algebra}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "sfg_algebra",
                    title: "عملیات جبری نمودار گذر سیگنال",
                    type: "item",
                    url: `${routes.chapter}02/${routes.sfg_algebra}`,
                    icon: icons.IconBike,
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
                    id: "ch03intro",
                    title: "مقدمه",
                    type: "item",
                    url: `${routes.chapter}03`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "fst_order_tf",
                    title: "بررسی توابع تبدیل مرتبه اول",
                    type: "item",
                    url: `${routes.chapter}03/${routes.fst_order_tf}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: "snd_order_tf",
                    title: "بررسی توابع تبدیل مرتبه دوم",
                    type: "item",
                    url: `${routes.chapter}03/${routes.snd_order_tf}`,
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
