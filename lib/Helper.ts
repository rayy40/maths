import { useEffect } from "react";

export const countVariables = (
  formula: string | undefined
): { count: number; variables: string[] } => {
  const matches = formula?.match(/(?<==.*)(?<!\\)\b[a-zA-Z]+/g);
  const uniqueVariables = matches ? Array.from(new Set(matches)) : [];
  const variableCount = uniqueVariables.length;

  return {
    count: variableCount,
    variables: uniqueVariables,
  };
};

export const calculateResult = (
  variables: string[],
  formula: (params: { [key: string]: number }) => number,
  parameters: { [key: string]: string },
  expression: string
): { value: number; exp: string } => {
  const params: { [key: string]: number } = {};

  for (const variable of variables) {
    params[variable] = parseFloat(parameters[variable]);
  }

  const result = formula(params);

  const exp = handleResultLatexExp(parseFloat(result.toFixed(3)), expression);

  return { value: parseFloat(result.toFixed(3)), exp: exp };
};

export const modifyLatexExpression = (
  parameters: { [key: string]: string },
  expression: string
): string => {
  const pattern: RegExp = /(?<==.*)(?<!\\)\b[a-zA-Z]+/g;

  expression = expression.replace(pattern, (match: string) => {
    if (!match.startsWith("\\")) {
      switch (match) {
        case "l":
          return parameters?.["l"];
        case "w":
          return parameters?.["w"];
        case "h":
          return parameters?.["h"];
        case "a":
          return parameters?.["a"];
        case "b":
          return parameters?.["b"];
        case "c":
          return parameters?.["c"];
        case "p":
          return parameters?.["p"];
        case "q":
          return parameters?.["q"];
        case "r":
          return parameters?.["r"];
        case "d":
          return parameters?.["d"];
        default:
          return match;
      }
    }
    return match;
  });

  return expression;
};

export const handleResultLatexExp = (
  result: number,
  expression: string
): string => {
  const pattern: RegExp = /=.*/;

  expression = expression.replace(pattern, `= ${result}`);

  return expression;
};

export const scrollToContainer = (container: any): void => {
  window.scrollTo({
    top: container.current.offsetTop,
    behavior: "smooth",
  });
};

export const useOutsideAlerter = (ref: any, setDropDown: any): void => {
  useEffect(() => {
    const handleOutsideClick = () => {
      if (ref.current && !ref.current.contains(event?.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref, setDropDown]);
};

export const isSquareMatrix = (matrix: string[][]): boolean => {
  const rows = matrix.length;
  for (let i = 0; i < rows; i++) {
    if (matrix[i].length !== rows) {
      return false;
    }
  }
  return true;
};

export const convertToLatex = (matrix: string[][]) => {
  let latex_expr = matrix
    ?.map((row) =>
      row
        .map((value) => Math.round(parseFloat(value) * 1000) / 1000)
        .join(" & ")
    )
    .join(" \\\\ ");

  return `\\begin{bmatrix}${latex_expr}\\end{bmatrix}`;
};

export const displayDifferentErrorMessage = (err: string) => {
  if (err === "Last 2 dimensions of the array must be square") {
    return "It must be a square matrix";
  } else if (err === "Matrix det == 0; not invertible.") {
    return "Singular matrix";
  }
  return err;
};

export const replaceVariables = (
  parameters: { [key: string]: string },
  equation: string
) => {
  let pattern: RegExp = /([a-f])(?![^=]*\b[x|y]\b)/g;

  if (equation.includes("a_0")) {
    pattern = /a_\d+(?![^=]*\b[x|y]\b)/g;
  }

  if (equation.includes("y")) {
    pattern = /([abcde]_[1-6])/g;
  }

  equation = equation.replace(pattern, (match: string) => {
    if (!match.startsWith("\\")) {
      switch (match) {
        case "a_0":
          if (parameters?.["a_0"] === "") return "a_0";
          return parameters?.["a_0"]?.toString() ?? "a_0";
        case "a_1":
          if (parameters?.["a_1"] === "") return "a_1";
          return parameters?.["a_1"]?.toString() ?? "a_1";
        case "a_2":
          if (parameters?.["a_2"] === "") return "a_2";
          return parameters?.["a_2"]?.toString() ?? "a_2";
        case "a_3":
          if (parameters?.["a_3"] === "") return "a_3";
          return parameters?.["a_3"]?.toString() ?? "a_3";
        case "a_4":
          if (parameters?.["a_4"] === "") return "a_4";
          return parameters?.["a_4"]?.toString() ?? "a_4";
        case "a_5":
          if (parameters?.["a_5"] === "") return "a_5";
          return parameters?.["a_5"]?.toString() ?? "a_5";
        case "a_6":
          if (parameters?.["a_6"] === "") return "a_6";
          return parameters?.["a_6"]?.toString() ?? "a_6";
        case "a_2":
          if (parameters?.["a_2"] === "") return "a_2";
          return parameters?.["a_2"]?.toString() ?? "a_2";
        case "a_3":
          if (parameters?.["a_3"] === "") return "a_3";
          return parameters?.["a_3"]?.toString() ?? "a_3";
        case "a_4":
          if (parameters?.["a_4"] === "") return "a_4";
          return parameters?.["a_4"]?.toString() ?? "a_4";
        case "b_1":
          if (parameters?.["b_1"] === "") return "b_1";
          return parameters?.["b_1"]?.toString() ?? "b_1";
        case "b_2":
          if (parameters?.["b_2"] === "") return "b_2";
          return parameters?.["b_2"]?.toString() ?? "b_2";
        case "b_3":
          if (parameters?.["b_3"] === "") return "b_3";
          return parameters?.["b_3"]?.toString() ?? "b_3";
        case "b_4":
          if (parameters?.["b_4"] === "") return "b_4";
          return parameters?.["b_4"]?.toString() ?? "b_4";
        case "c_1":
          if (parameters?.["c_1"] === "") return "c_1";
          return parameters?.["c_1"]?.toString() ?? "c_1";
        case "c_2":
          if (parameters?.["c_2"] === "") return "c_2";
          return parameters?.["c_2"]?.toString() ?? "c_2";
        case "c_3":
          if (parameters?.["c_3"] === "") return "c_3";
          return parameters?.["c_3"]?.toString() ?? "c_3";
        case "c_4":
          if (parameters?.["c_4"] === "") return "c_4";
          return parameters?.["c_4"]?.toString() ?? "c_4";
        case "d_1":
          if (parameters?.["d_1"] === "") return "d_1";
          return parameters?.["d_1"]?.toString() ?? "d_1";
        case "d_2":
          if (parameters?.["d_2"] === "") return "d_2";
          return parameters?.["d_2"]?.toString() ?? "d_2";
        case "d_3":
          if (parameters?.["d_3"] === "") return "d_3";
          return parameters?.["d_3"]?.toString() ?? "d_3";
        case "d_4":
          if (parameters?.["d_4"] === "") return "d_4";
          return parameters?.["d_4"]?.toString() ?? "d_4";
        case "e_1":
          if (parameters?.["e_1"] === "") return "e_1";
          return parameters?.["e_1"]?.toString() ?? "e_1";
        case "e_2":
          if (parameters?.["e_2"] === "") return "e_2";
          return parameters?.["e_2"]?.toString() ?? "e_2";
        case "e_3":
          if (parameters?.["e_3"] === "") return "e_3";
          return parameters?.["e_3"]?.toString() ?? "e_3";
        case "e_4":
          if (parameters?.["e_4"] === "") return "e_4";
          return parameters?.["e_4"]?.toString() ?? "e_4";
        case "a":
          if (parameters?.["a"] === "") return "a";
          return parameters?.["a"]?.toString() ?? "a";
        case "b":
          if (parameters?.["b"] === "") return "b";
          return parameters?.["b"]?.toString() ?? "b";
        case "c":
          if (parameters?.["c"] === "") return "c";
          return parameters?.["c"]?.toString() ?? "c";
        case "d":
          if (parameters?.["d"] === "") return "d";
          return parameters?.["d"]?.toString() ?? "d";
        case "e":
          if (parameters?.["e"] === "") return "e";
          return parameters?.["e"]?.toString() ?? "e";
        case "f":
          if (parameters?.["f"] === "") return "f";
          return parameters?.["f"]?.toString() ?? "f";
        default:
          return match;
      }
    }
    return match;
  });

  return equation;
};
