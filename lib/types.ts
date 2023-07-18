export type MatrixHistoryType = {
  [key: string]: string[][] | string;
};

export type OperationsType = { name: string; exp: string }[];

export type CalculatedResultType = { equation: string; result: string };

export type EigenValAndVector = {
  [key: string]: { value: string[]; vector: string[][] };
};

export type ResultType = { roots: string[]; factors: string };

export interface Equations {
  id: number;
  name: string;
  renderFormula: string;
  parameters: { [key: string]: string };
}
