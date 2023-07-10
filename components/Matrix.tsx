import React from "react";
import styles from "@/styles/matrix.module.css";

type Props = {
  matrix: string[][];
  setMatrix: React.Dispatch<React.SetStateAction<string[][]>>;
};

export default function Matrix({ matrix, setMatrix }: Props) {
  const handleMatrixData = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number
  ) => {
    const { value } = event.target;

    setMatrix((prev) => {
      const updatedData = [...prev];
      updatedData[rowIndex][columnIndex] = value;
      return updatedData;
    });
  };

  return (
    <div className={styles.matrix_wrapper}>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.matrix_row}>
          {row.map((val, columnIndex) => (
            <input
              key={columnIndex}
              autoFocus={rowIndex === 0 && columnIndex === 0}
              placeholder="0"
              className={styles.matrix_input}
              value={val}
              type="text"
              onChange={(e) => handleMatrixData(e, rowIndex, columnIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
