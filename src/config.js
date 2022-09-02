const routes = {
    root: "/",
    git_root: "/lnctrl",
    chapter: "ch",
    intro01: "intro02",
    hydraulic_systems_modeling: "hydraulics",
    mechanic_systems_modeling: "mechanics",
    space_state_equations: "space_states",
    block_diagrams_algebra: "block_diagrams_algebra",
    sfg_algebra: "sfg_algebra",
    intro02: "intro03",
    fst_order_tf: "1st_order_tf",
    snd_order_tf: "2st_order_tf",
    design_by_characteristics: "design_by_char",
    intro04: "intro04",
    hurwitz_criterion: "hurwitz_criterion",
    routh_hurwitz_criterion: "routh_hurwitz_criterion",
    intro05: "intro05",
    root_locus: "root_locus",
    sketching_root_locus: "rl_sketch",
    intro06: "intro06",
    rc_filter_frequency_response: "rc_filter_freq_res",
    frequency_response: "freq_res",
    bode_plot: 'bode_plot',
    bode_example: 'bode_example',
    delayed_systems: 'delayed_systems',
    nyquist_plot: 'nyquist_plot',
    nicoles_chart: 'nicoles_chart',
    m_circle: 'm_circle',
    n_circle: 'n_circle',
    intro07: "intro07",
    pid: 'pid'
};

const error_codes = {
    not_scalar: 431,
    dimension_mismatch: 432,
};

module.exports = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: "/",
    defaultPath: "/",
    fontFamily: `'Vazir-Bold', sans-serif`,
    borderRadius: 12,
    routes,
    error_codes,
};
