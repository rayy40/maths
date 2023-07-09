export interface Operations {
  id: number;
  operation: string;
}

export const operations: Operations[] = [
  { id: 1, operation: "A" },
  { id: 2, operation: "B" },
  { id: 3, operation: "C" },
  { id: 4, operation: "D" },
  { id: 5, operation: `+` },
  { id: 6, operation: "-" },
  { id: 7, operation: "*" },
  { id: 8, operation: "/" },
  { id: 9, operation: "A^2" },
  { id: 10, operation: "A^{-1}" },
  { id: 11, operation: "A^T" },
  { id: 12, operation: "A^n" },
  { id: 13, operation: "rref" },
  { id: 14, operation: "det" },
  { id: 15, operation: "trace" },
];
