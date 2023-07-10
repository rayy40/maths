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
  parameters: { [key: string]: number },
  expression: string
): { value: number; exp: string } => {
  const params: { [key: string]: number } = {};

  for (const variable of variables) {
    params[variable] = parameters[variable];
  }

  const result = formula(params);

  const exp = handleResultLatexExp(parseFloat(result.toFixed(3)), expression);

  return { value: parseFloat(result.toFixed(3)), exp: exp };
};

export const modifyLatexExpression = (
  parameters: { [key: string]: number },
  expression: string
): string => {
  const pattern: RegExp = /(?<==.*)(?<!\\)\b[a-zA-Z]+/g;

  expression = expression.replace(pattern, (match: string) => {
    if (!match.startsWith("\\")) {
      switch (match) {
        case "l":
          return parameters?.["l"].toString();
        case "w":
          return parameters?.["w"].toString();
        case "h":
          return parameters?.["h"].toString();
        case "a":
          return parameters?.["a"].toString();
        case "b":
          return parameters?.["b"].toString();
        case "c":
          return parameters?.["c"].toString();
        case "p":
          return parameters?.["p"].toString();
        case "q":
          return parameters?.["q"].toString();
        case "r":
          return parameters?.["r"].toString();
        case "d":
          return parameters?.["d"].toString();
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
