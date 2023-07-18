import { create } from "zustand";
import { ResultType } from "@/lib/types";

interface EquationSolverState {
  result: ResultType;
  setReults: (results: ResultType) => void;
}

const useEquationSolverStore = create<EquationSolverState>((set) => ({
  result: { roots: [], factors: "" },
  setReults: (result) => set({ result }),
}));

export const useEquationSolverContext = useEquationSolverStore;
