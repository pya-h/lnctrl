const routes = {
    root: '/',
    git_root: '/lnctrl',
    chapter: 'ch',
    hydraulic_systems_modeling: 'hydraulics',
    mechanic_systems_modeling: 'mechanics',
    space_state_equations: 'space-states',
    block_diagrams_algebra: 'block-diagrams-algebra',
    sfg_algebra: 'sfg-algebra',
    fst_order_tf: '1st-order-tf',
    snd_order_tf: '2st-order-tf',
    design_by_characteristics: 'design-bychar',
    hurwitz_criterion: 'hurwitz',
    routh_hurwitz_criterion: 'routh-hurwitz',
    root_locus: 'root-locus'

}

const error_codes = {
    not_scalar: 431,
    dimension_mismatch: 432
}

module.exports = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '/',
    defaultPath: '/dashboard/default',
    fontFamily: `'Vazir-Bold', sans-serif`,
    borderRadius: 12,
    routes,
    error_codes
};

