const stepByStepFormulas = [
    "",
    "$$F_1(s) = G_1(s) + G_2(s)$$",
    `$$F_2(s) = G_3(s)G_4(s) \\\\ \\\\\
      F_3(s) = G_4(s)G_5(s)$$`,
    "$$F_4(s) = \\frac{F_2(s)}{1 - F_3(s)} = \\frac{G_3(s)G_4(s)}{1 - G_4(s)G_5(s)}$$",
    `$$F_5(s) = F_1(s)G_6(s) = G_6(s)[G_1(s) + G_2(s)] \\\\ \\\\\
      F_6(s) = F_4(s)G_7(s) = G_7(s)\\frac{G_3(s)G_4(s)}{1 - G_4(s)G_5(s)}$$`,
    `$$F_7(s) = F_5(s)G_8(s) = G_6(s)G_8(s)[G_1(s) + G_2(s)] \\\\ \\\\\
      F_8(s) = F_6(s)G_8(s) = G_7(s)G_8(s)\\frac{G_3(s)G_4(s)}{1 - G_4(s)G_5(s)} \\\\ \\\\\
      x_7 = F_7(s)x_1(s) + F_8(s)x_3(s) \\\\ \\\\
      x_7 = G_6(s)G_8(s)[G_1(s) + G_2(s)]x_1 + G_7(s)G_8(s)\\frac{G_3(s)G_4(s)}{1 - G_4(s)G_5(s)}x_3$$`,
    `$$x_8(s) = G_9(s)x_7 = G_6(s)G_8(s)G_9(s)[G_1(s) + G_2(s)]x_1 + G_7(s)G_8(s)G_9(s)\\frac{G_3(s)G_4(s)}{1 - G_4(s)G_5(s)}x_3 \\\\ \\\\\
      x_9(s) = G_{10}(s)x_7 = G_6(s)G_8(s)G_{10}(s)[G_1(s) + G_2(s)]x_1 + G_7(s)G_8(s)G_{10}(s)\\frac{G_3(s)G_4(s)}{1 - G_4(s)G_5(s)}x_3$$`,
];

export default stepByStepFormulas;
