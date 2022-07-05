const routes = {
    root: "/",
    git_root: "/lnctrl",
    chapter: "ch",
    intro: "intro",
    hydraulic_systems_modeling: "hydraulics",
    mechanic_systems_modeling: "mechanics",
    space_state_equations: "space_states",
    block_diagrams_algebra: "block_diagrams_algebra",
    sfg_algebra: "sfg_algebra",
    fst_order_tf: "1st_order_tf",
    snd_order_tf: "2st_order_tf",
    design_by_characteristics: "design_by_char",
    hurwitz_criterion: "hurwitz_criterion",
    routh_hurwitz_criterion: "routh_hurwitz_criterion",
    root_locus: "root_locus",
    circuit_frequency_response: "circuit_freq_res",
};

const error_codes = {
    not_scalar: 431,
    dimension_mismatch: 432,
};

module.exports = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: "/",
    defaultPath: "/dashboard/default",
    fontFamily: `'Vazir-Bold', sans-serif`,
    borderRadius: 12,
    routes,
    error_codes,
};
