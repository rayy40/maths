import { create } from "zustand";
import { ResultType } from "@/lib/types";

interface EquationSolverState {
  result: ResultType;
  setReults: (results: ResultType) => void;
  simultaneousResult: { [key: string]: number };
  setSimultaneousResult: (results: { [key: string]: number }) => void;
}

const useEquationSolverStore = create<EquationSolverState>((set) => ({
  result: { roots: [], factors: "" },
  setReults: (result) => set({ result }),
  simultaneousResult: {},
  setSimultaneousResult: (simultaneousResult) => set({ simultaneousResult }),
}));

export const useEquationSolverContext = useEquationSolverStore;
