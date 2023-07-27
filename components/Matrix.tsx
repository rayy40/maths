import React from "react";
import styles from "@/styles/matrix.module.css";

type Props = {
  matrix: string[][];
  isMatrixError: boolean;
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
  setIsMatrixError: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<
    React.SetStateAction<{
      row: number;
      column: number;
    }>
  >;
};

export default function Matrix({
  matrix,
  setIndex,
  setMatrix,
  isMatrixError,
  setIsMatrixError,
}: Props) {
  const handleMatrixData = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ) => {
    const { value } = event.target;

    if (!isNaN(Number(value)) || value === "-") {
      setMatrix((prev) => {
        const updatedData = [...prev];
        updatedData[rowIndex][columnIndex] = value;
        return updatedData;
      });
      setIsMatrixError(false);
    } else {
      setIsMatrixError(true);
    }

    setIndex({ row: rowIndex, column: columnIndex });
  };

  return (
    <>
      <div
        className={`${styles.matrix_wrapper} ${
          isMatrixError && styles.matrix_wrapper_error
        }`}
      >
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.matrix_row}>
            {row.map((val, columnIndex) => (
              <input
                key={columnIndex}
                autoFocus={rowIndex === 0 && columnIndex === 0}
                placeholder="0"
                className={`${styles.matrix_input} ${
                  isMatrixError && styles.matrix_input_error
                }`}
                value={val}
                type="text"
                onChange={(e) => handleMatrixData(e, rowIndex, columnIndex)}
                onClick={() => setIndex({ row: rowIndex, column: columnIndex })}
              />
            ))}
          </div>
        ))}
      </div>
      {isMatrixError && (
        <p className={styles.input_error}>Please enter a number</p>
      )}
    </>
  );
}
