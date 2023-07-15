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

type CalculatedResultType = { equation: string; result: string };

type EigenValAndVector = {
  [key: string]: { value: string[]; vector: string[][] };
};

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
  { name: "eigen", exp: "Eigen value(A)" },
  { name: "eigen", exp: "Eigen vector(A)" },
];

interface ContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  isCalculatorOn: boolean;
  setIsCalculatorOn: Dispatch<SetStateAction<boolean>>;
  isCalculationVisible: boolean;
  setIsCalculationVisible: Dispatch<SetStateAction<boolean>>;
  exp: string;
  setExp: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  matrixEquation: string;
  setMatrixEquation: Dispatch<SetStateAction<string>>;
  eigenValAndVector: EigenValAndVector;
  setEigenValueAndVector: Dispatch<SetStateAction<EigenValAndVector>>;
  latexCalculatedResult: CalculatedResultType;
  setLatexCalculatedResult: Dispatch<SetStateAction<CalculatedResultType>>;
  matrixHistory: MatrixHistoryType;
  setMatrixHistory: Dispatch<SetStateAction<MatrixHistoryType>>;
  opsArray: OperationsType;
  setOpsArray: Dispatch<SetStateAction<OperationsType>>;
}

const MatrixContext = createContext<ContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  isError: false,
  setIsError: (): boolean => false,
  isCalculatorOn: false,
  setIsCalculatorOn: (): boolean => false,
  isCalculationVisible: false,
  setIsCalculationVisible: (): boolean => false,
  exp: "",
  setExp: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
  matrixEquation: "",
  setMatrixEquation: () => {},
  eigenValAndVector: {},
  setEigenValueAndVector: () => ({
    value: [],
    vector: [[]],
  }),
  latexCalculatedResult: { equation: "", result: "" },
  setLatexCalculatedResult: () => {},
  matrixHistory: {},
  setMatrixHistory: (): MatrixHistoryType => ({}),
  opsArray: [],
  setOpsArray: (): OperationsType => [],
});

export const MatrixContextProvider: React.FC = ({ children }: any) => {
  const [isCalculatorOn, setIsCalculatorOn] = useState<boolean>(false);
  const [isCalculationVisible, setIsCalculationVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [exp, setExp] = useState<string>("A");
  const [errorMessage, setErrorMessage] = useState<string>("A");
  const [matrixEquation, setMatrixEquation] = useState<string>(exp);
  const [eigenValAndVector, setEigenValueAndVector] =
    useState<EigenValAndVector>({});
  const [latexCalculatedResult, setLatexCalculatedResult] =
    useState<CalculatedResultType>({ equation: "", result: "" });
  const [matrixHistory, setMatrixHistory] = useState<MatrixHistoryType>({});
  const [opsArray, setOpsArray] = useState<OperationsType>(operations);

  return (
    <MatrixContext.Provider
      value={{
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        isCalculatorOn,
        setIsCalculatorOn,
        isCalculationVisible,
        setIsCalculationVisible,
        eigenValAndVector,
        setEigenValueAndVector,
        exp,
        setExp,
        errorMessage,
        setErrorMessage,
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
    </MatrixContext.Provider>
  );
};

export const useMatrixContext = (): ContextProps => useContext(MatrixContext);
