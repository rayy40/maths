import { create } from "zustand";
import {
  MatrixHistoryType,
  OperationsType,
  EigenValAndVector,
  CalculatedResultType,
} from "@/lib/types";

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
  { name: "clear", exp: "Clear" },
  { name: "clear all", exp: "Clear All" },
  { name: "eigen", exp: "Eigen value(A)" },
  { name: "eigen", exp: "Eigen vector(A)" },
];

interface ApiState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}

interface MatrixState {
  isCalculatorOn: boolean;
  setIsCalculatorOn: (isCalculatorOn: boolean) => void;
  isCalculationVisible: boolean;
  setIsCalculationVisible: (isCalculationVisible: boolean) => void;
  exp: string;
  setExp: (exp: string) => void;
  matrixEquation: string;
  setMatrixEquation: (matrixEquation: string, isCalculatorOn: boolean) => void;
  eigenValAndVector: EigenValAndVector;
  setEigenValueAndVector: (eigenValueAndVector: EigenValAndVector) => void;
  latexCalculatedResult: CalculatedResultType;
  setLatexCalculatedResult: (
    latexCalculatedResult: CalculatedResultType
  ) => void;
  matrixHistory: MatrixHistoryType;
  setMatrixHistory: (matrixHistory: MatrixHistoryType) => void;
  opsArray: OperationsType;
  setOpsArray: (opsArray: OperationsType) => void;
}

const useApiStore = create<ApiState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  isError: false,
  setIsError: (isError) => set({ isError }),
  errorMessage: "Error",
  setErrorMessage: (errorMessage) => set({ errorMessage }),
}));

const useMatrixStore = create<MatrixState>((set) => ({
  isCalculatorOn: false,
  setIsCalculatorOn: (isCalculatorOn) => set({ isCalculatorOn }),
  isCalculationVisible: false,
  setIsCalculationVisible: (isCalculationVisible) =>
    set({ isCalculationVisible }),
  exp: "A",
  setExp: (exp) => set({ exp }),
  matrixEquation: "A",
  setMatrixEquation: (text: string, isCalculatorOn: boolean) =>
    set((state) => ({
      matrixEquation: isCalculatorOn ? state.matrixEquation + text : text,
    })),
  eigenValAndVector: {},
  setEigenValueAndVector: (eigenValueAndVector) =>
    set((state) => ({
      eigenValAndVector: { ...state.eigenValAndVector, ...eigenValueAndVector },
    })),
  latexCalculatedResult: { equation: "", result: "" },
  setLatexCalculatedResult: (latexCalculatedResult) =>
    set({ latexCalculatedResult }),
  matrixHistory: {},
  setMatrixHistory: (matrixHistory: MatrixHistoryType) =>
    set((state) => ({
      matrixHistory: {
        ...state.matrixHistory,
        ...matrixHistory,
      },
    })),
  opsArray: operations,
  setOpsArray: (opsArray) => set({ opsArray }),
}));

export const useMatrixContext = useMatrixStore;
export const useApiContext = useApiStore;
