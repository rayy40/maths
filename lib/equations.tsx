import { Equations } from "./types";

export const equation: Equations[] = [
  {
    id: 1,
    name: "linear",
    renderFormula: `ax + b = c`,
    parameters: {
      ["a"]: "coeffcient_x",
      ["b"]: "constant",
      ["c"]: "constant",
    },
  },
  {
    id: 2,
    name: "quadratic",
    renderFormula: `ax^2 + bx + c = d`,
    parameters: {
      ["a"]: "coeffcient_x^2",
      ["b"]: "coeffcient_x",
      ["c"]: "constant",
      ["d"]: "constant",
    },
  },
  {
    id: 3,
    name: "cubic",
    renderFormula: `ax^3 + bx^2 + cx + d = e`,
    parameters: {
      ["a"]: "coeffcient_x^3",
      ["b"]: "coeffcient_x^2",
      ["c"]: "coeffcient_x",
      ["d"]: "constant",
      ["e"]: "constant",
    },
  },
  {
    id: 4,
    name: "polynomial",
    renderFormula: `a_{n}x^n + a_{n-1}x^{n-1} + ... + a_{2}x^2 + a_{1}x + a_0 = 0`,
    parameters: {
      ["a_n"]: "coeffcient_x^n",
      ["a_{n-1}"]: "coeffcient_x^{n-1}",
      ["a_2"]: "coeffcient_x^2",
      ["a_1"]: "coeffcient_x^1",
      ["a_0"]: "constant",
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
  `\\sqrt{}`,
];
