const stepByStepFormulas = [
    '',
    "$$F_1(s) = G_1(s) + H_1(s)$$",
    "$$F_2(s) = \\frac{G_2(s)}{1 - G_2(s)H_2(s)}$$",
    `$$F_1(s) = G_1(s) + H_1(s) \\\\ \\\\\
     F_2(s) = \\frac{G_2(s)}{1 - G_2(s)H_2(s)} \\\\ \\\\\
      G(s) = F_1(s)F_2(s) = \\frac{(G_1(s) + H_1(s))G_2(s)}{1 - G_2(s)H_2(s)}$$`,
    "$$G(s) = \\frac{(G_1(s) + H_1(s))G_2(s)}{1 - G_2(s)H_2(s)}$$",
    `$$G(s) = \\frac{(G_1(s) + H_1(s))G_2(s)}{1 - G_2(s)H_2(s)} \\\\ \\\\\
    F(s) = \\frac{1}{G(s)} = \\frac{1 - G_2(s)H_2(s)}{(G_1(s) + H_1(s))G_2(s)}$$`,
]

export default stepByStepFormulas;