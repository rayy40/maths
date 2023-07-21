import { Equations } from "./types";

export const equation: Equations[] = [
  {
    id: 1,
    name: "linear",
    renderFormula: `ax + b = c`,
    parameters: {
      ["a"]: "",
      ["b"]: "",
      ["c"]: "",
    },
  },
  {
    id: 2,
    name: "quadratic",
    renderFormula: `ax^2 + bx + c = 0`,
    parameters: {
      ["a"]: "",
      ["b"]: "",
      ["c"]: "",
    },
  },
  {
    id: 3,
    name: "cubic",
    renderFormula: `ax^3 + bx^2 + cx + d = 0`,
    parameters: {
      ["a"]: "",
      ["b"]: "",
      ["c"]: "",
      ["d"]: "",
    },
  },
  {
    id: 4,
    name: "polynomial",
    renderFormula: `a_4x^4 + a_3x^3 + a_2x^2 + a_1x + a_0 = 0`,
    parameters: {
      ["a_4"]: "",
      ["a_3"]: "",
      ["a_2"]: "",
      ["a_1"]: "",
      ["a_0"]: "",
    },
  },
];

export const numbers: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
];

export const advancedOperations = [
  "\\sqrt{\\square}",
  "\\sqrt[3]{\\square}",
  "{\\square}^2",
  "{\\square}^3",
  "\\sin({})",
  "\\cos({})",
  "\\tan({})",
  "\\csc({})",
  "\\sec({})",
  "\\cot({})",
  "\\log({})",
  "\\ln({})",
];
