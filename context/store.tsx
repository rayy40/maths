"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type MatrixHistoryType = {
  [key: string]: string[][] | string;
};

type OperationsType = { name: string; exp: string }[];

const operations: OperationsType = [
  { name: "square", exp: "A^2" },
  { name: "transpose", exp: "A^T" },
  { name: "inverse", exp: "A^{-1}" },
  { name: "power", exp: "A^n" },
  { name: "addition", exp: "+" },
  { name: "subtraction", exp: "-" },
  { name: "multiplication", exp: "*" },
  { name: "division", exp: "/" },
  { name: "rref", exp: "rref(A)" },
  { name: "determinant", exp: "det(A)" },
  { name: "trace", exp: "trace(A)" },
  { name: "enter", exp: "Enter" },
];

interface ContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  isCalculatorOn: boolean;
  setIsCalculatorOn: Dispatch<SetStateAction<boolean>>;
  exp: string;
  setExp: Dispatch<SetStateAction<string>>;
  matrixEquation: string;
  setMatrixEquation: Dispatch<SetStateAction<string>>;
  latexCalculatedResult: string;
  setLatexCalculatedResult: Dispatch<SetStateAction<string>>;
  matrixHistory: MatrixHistoryType;
  setMatrixHistory: Dispatch<SetStateAction<MatrixHistoryType>>;
  opsArray: OperationsType;
  setOpsArray: Dispatch<SetStateAction<OperationsType>>;
}

const GlobalContext = createContext<ContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  isError: false,
  setIsError: (): boolean => false,
  isCalculatorOn: false,
  setIsCalculatorOn: (): boolean => false,
  exp: "",
  setExp: () => {},
  matrixEquation: "",
  setMatrixEquation: () => {},
  latexCalculatedResult: "",
  setLatexCalculatedResult: () => {},
  matrixHistory: {},
  setMatrixHistory: (): MatrixHistoryType => ({}),
  opsArray: [],
  setOpsArray: (): OperationsType => [],
});

export const GlobalContextProvider: React.FC = ({ children }: any) => {
  const [isCalculatorOn, setIsCalculatorOn] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [exp, setExp] = useState<string>("A");
  const [matrixEquation, setMatrixEquation] = useState(exp);
  const [latexCalculatedResult, setLatexCalculatedResult] = useState("");
  const [matrixHistory, setMatrixHistory] = useState<MatrixHistoryType>({});
  const [opsArray, setOpsArray] = useState<OperationsType>(operations);

  return (
    <GlobalContext.Provider
      value={{
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        isCalculatorOn,
        setIsCalculatorOn,
        exp,
        setExp,
        matrixEquation,
        setMatrixEquation,
        latexCalculatedResult,
        setLatexCalculatedResult,
        matrixHistory,
        setMatrixHistory,
        opsArray,
        setOpsArray,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): ContextProps => useContext(GlobalContext);
