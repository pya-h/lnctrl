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
        title: "Select a chapter",
        type: "group",
        children: [],
        load,
    };
    const hierarchy = path.hierarchy(pathname);
    if (hierarchy[0] === `${routes.chapter}02`)
        topics = {
            id: "topics",
            title: "Topics",
            type: "group",
            children: [
                {
                    id: `${routes.chapter}02`,
                    title: "Introduction",
                    type: "item",
                    url: `${routes.chapter}02`,
                    icon: icons.BubbleChartIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.hydraulic_systems_modeling,
                    title: "Hydraulic system",
                    type: "item",
                    url: `${routes.chapter}02/${routes.hydraulic_systems_modeling}`,
                    icon: icons.ShowerIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.mechanic_systems_modeling,
                    title: "Mechanical system",
                    type: "item",
                    url: `${routes.chapter}02/${routes.mechanic_systems_modeling}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.space_state_equations,
                    title: "State-space equations",
                    type: "item",
                    url: `${routes.chapter}02/${routes.space_state_equations}`,
                    icon: icons.DataArrayIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.block_diagrams_algebra,
                    title: "Block Diagram Algebra",
                    type: "item",
                    url: `${routes.chapter}02/${routes.block_diagrams_algebra}`,
                    icon: icons.CropLandscapeIcon,
                    breadcrumbs: false,
                },
                {
                    id: routes.sfg_algebra,
                    title: "Signal flow graph algebra",
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
            title: "Topics",
            type: "group",
            children: [
                {
                    id: `${routes.chapter}03`,
                    title: "Introduction",
                    type: "item",
                    url: `${routes.chapter}03`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.fst_order_tf,
                    title: "Study of First-Order Transfer Functions",
                    type: "item",
                    url: `${routes.chapter}03/${routes.fst_order_tf}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.snd_order_tf,
                    title: "Study of Second-Order Transfer Functions",
                    type: "item",
                    url: `${routes.chapter}03/${routes.snd_order_tf}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.design_by_characteristics,
                    title: "System Design via Specifications",
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
            title: "Topics",
            type: "group",
            children: [
                {
                    id: `${routes.chapter}04`,
                    title: "Introduction",
                    type: "item",
                    url: `${routes.chapter}04`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.hurwitz_criterion,
                    title: "Hurwitz stability criterion",
                    type: "item",
                    url: `${routes.chapter}04/${routes.hurwitz_criterion}`,
                    icon: icons.IconBike,
                    breadcrumbs: false,
                },
                {
                    id: routes.routh_hurwitz_criterion,
                    title: "Routh-Hurwitz Stability Criterion",
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
                title: "Topics",
                type: "group",
                children: [
                    {
                        id: `${routes.chapter}05`,
                        title: "Introduction",
                        type: "item",
                        url: `${routes.chapter}05`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.root_locus,
                        title: "Root locus",
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
                title: "Topics",
                type: "group",
                children: [
                    {
                        id: `${routes.chapter}06`,
                        title: "Introduction",
                        type: "item",
                        url: `${routes.chapter}06`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.rc_filter_frequency_response,
                        title: "Frequency response of the RC filter",
                        type: "item",
                        url: `${routes.chapter}06/${routes.rc_filter_frequency_response}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.frequency_response,
                        title: "Frequency response",
                        type: "item",
                        url: `${routes.chapter}06/${routes.frequency_response}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.bode_plot,
                        title: "Bode plot",
                        type: "item",
                        url: `${routes.chapter}06/${routes.bode_plot}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.bode_example,
                        title: "An example of a Bode plot",
                        type: "item",
                        url: `${routes.chapter}06/${routes.bode_example}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.delayed_systems,
                        title: "Time-delay systems",
                        type: "item",
                        url: `${routes.chapter}06/${routes.delayed_systems}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.nyquist_plot,
                        title: "Nyquist plot",
                        type: "item",
                        url: `${routes.chapter}06/${routes.nyquist_plot}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.nicoles_chart,
                        title: "Nichols Magnitude and Phase Chart",
                        type: "item",
                        url: `${routes.chapter}06/${routes.nicoles_chart}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.m_circle,
                        title: "Constant-Magnitude Locus (M-circle)",
                        type: "item",
                        url: `${routes.chapter}06/${routes.m_circle}`,
                        icon: icons.IconBike,
                        breadcrumbs: false,
                    },
                    {
                        id: routes.n_circle,
                        title: "Constant-phase locus (N-circle)",
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
            title: "Select a chapter",
            type: "group",
            children: [],
        },
    ],
    load,
};

export default chapterRelatedMenuHandler;
