import React, { useState } from "react";
import styles from "@/styles/matrix.module.css";

type Props = {
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
};

export default function Matrix({ matrix, setMatrix }: Props) {
  const [isInputError, setIsInputError] = useState(false);

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
      setIsInputError(false);
    } else {
      setIsInputError(true);
      // Display an error message or handle the error condition
      console.error("Please enter a number.");
    }
  };

  return (
    <>
      <div
        className={`${styles.matrix_wrapper} ${
          isInputError && styles.matrix_wrapper_error
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
                  isInputError && styles.matrix_input_error
                }`}
                value={val}
                type="text"
                onChange={(e) => handleMatrixData(e, rowIndex, columnIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {isInputError && (
        <p className={styles.input_error}>Please enter a number</p>
      )}
    </>
  );
}
