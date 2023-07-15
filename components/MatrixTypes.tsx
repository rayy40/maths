import React from "react";
import styles from "@/styles/matrix.module.css";
import { isSquareMatrix } from "@/lib/Helper";
import { useMatrixContext } from "@/context/MatrixContext";

type Props = {
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
  setDeclaration: React.Dispatch<React.SetStateAction<string>>;
};

export default function MatrixTypes({
  matrix,
  setMatrix,
  setDeclaration,
}: Props) {
  const { setExp } = useMatrixContext();

  const fillInWithZeros = (): void => {
    const fillWithZero = matrix.map((row) => row.map((_) => "0"));
    setDeclaration("O");
    setExp("O");

    setMatrix(fillWithZero);
  };

  const fillDiagnollywithOnes = (): void => {
    if (!isSquareMatrix(matrix)) {
      return;
    }
    const fillDiagnolly = matrix.map((row, rowIndex) =>
      row.map((_, colIndex) => (rowIndex === colIndex ? "1" : "0"))
    );
    setDeclaration("I");
    setExp("I");
    setMatrix(fillDiagnolly);
  };

  const fillWithRandomNumbers = (): void => {
    const fillRandomly = matrix.map((row) =>
      row.map((col) => Math.floor(Math.random() * 100).toString())
    );
    setMatrix(fillRandomly);
  };

  return (
    <div className={styles.operations_wrapper}>
      <button
        onClick={fillInWithZeros}
        style={{ width: "50%" }}
        className={styles.operation}
      >
        Fill in with 0s
      </button>
      <button
        onClick={fillDiagnollywithOnes}
        style={{ width: "50%" }}
        className={styles.operation}
      >
        Identity matrix
      </button>
      <button
        onClick={fillWithRandomNumbers}
        style={{ width: "50%" }}
        className={styles.operation}
      >
        Random matrix
      </button>
    </div>
  );
}
