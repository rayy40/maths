"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type ResultType = any[];

type MatrixHistoryType = {
  [key: string]: string[][];
};

interface ContextProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  matrixHistory: MatrixHistoryType;
  setMatrixHistory: Dispatch<SetStateAction<MatrixHistoryType>>;
  variable: string;
  setVariable: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
  isLoading: false,
  setIsLoading: (): boolean => false,
  isError: false,
  setIsError: (): boolean => false,
  matrixHistory: {},
  setMatrixHistory: (): MatrixHistoryType => ({}),
  variable: "",
  setVariable: () => {},
});

export const GlobalContextProvider: React.FC = ({ children }: any) => {
  const [result, setResult] = useState<ResultType>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [variable, setVariable] = useState<string>("A");
  const [matrixHistory, setMatrixHistory] = useState<MatrixHistoryType>({});

  return (
    <GlobalContext.Provider
      value={{
        isError,
        setIsError,
        isLoading,
        setIsLoading,
        matrixHistory,
        setMatrixHistory,
        variable,
        setVariable,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): ContextProps => useContext(GlobalContext);
