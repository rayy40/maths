import React, { useState } from "react";
import styles from "@/styles/matrix.module.css";
import { InlineMath } from "react-katex";
import { useGlobalContext } from "@/context/store";
import useGetResult from "@/lib/useGetResult";

type Props = {};

export default function MatrixOperations({}: Props) {
  const { getResult } = useGetResult();
  const {
    matrixHistory,
    setOpsArray,
    opsArray,
    setExp,
    exp,
    setMatrixEquation,
    isCalculatorOn,
    setIsCalculatorOn,
  } = useGlobalContext();
  const [selectedMatrix, setSelectedMatrix] = useState("A");

  const handleMatrixChange = (matrix: string) => {
    setExp(matrix);
    setSelectedMatrix(matrix);
    handleChangeOpsArray(matrix);
  };

  const handleChangeOpsArray = (matrix: string) => {
    setOpsArray((prevOpsArray) => {
      const modifiedArray = prevOpsArray?.map((op) => {
        const modifiedExp = op.exp.replace(/[A-Z]/g, matrix);
        return { ...op, exp: modifiedExp };
      });
      return modifiedArray;
    });
    if (isCalculatorOn) {
      setMatrixEquation((prev) => prev + matrix);
    }
  };

  const handleOperationChange = (op: { name: string; exp: string }) => {
    setExp(op.exp);
    if (!matrixHistory?.[op.exp]) {
      getResult({
        matrix: matrixHistory?.[selectedMatrix],
        operation: op.name,
        expression: op.exp,
      });
    }
  };

  const handleMatrixEquation = (buttonLabel: { name: string; exp: string }) => {
    if (buttonLabel.name === "enter") {
      return setIsCalculatorOn(false);
    }
    setIsCalculatorOn(true);
    setMatrixEquation((prev) => prev + buttonLabel?.exp);
  };

  return (
    <div className={styles.operation_col_wrapper}>
      <div className={styles.operation_col_container}>
        <h3 className={styles.sub_title}>Select Matrix: </h3>
        <div className={styles.operations_wrapper}>
          {Object.keys(matrixHistory)
            .filter((key) => !key.includes("^") && !key.includes("("))
            ?.map((buttonLabel) => (
              <button
                key={buttonLabel}
                onClick={() => handleMatrixChange(buttonLabel)}
                className={`${styles.operation} ${
                  buttonLabel === selectedMatrix && styles.operation_disabled
                }`}
              >
                <InlineMath math={buttonLabel} />
              </button>
            ))}
        </div>
      </div>
      <div className={styles.operation_col_container}>
        <h3 className={styles.sub_title}>Operations: </h3>
        <div className={styles.operations_wrapper}>
          {opsArray?.map((buttonLabel, index) => (
            <button
              key={index}
              onClick={() =>
                [4, 5, 6, 7].includes(index)
                  ? handleMatrixEquation(buttonLabel)
                  : isCalculatorOn
                  ? handleMatrixEquation(buttonLabel)
                  : handleOperationChange(buttonLabel)
              }
              className={`${styles.operation} ${
                buttonLabel?.exp === exp && styles.operation_disabled
              } ${[8, 9, 10, 11].includes(index) && styles.operation_modified}`}
            >
              <InlineMath math={buttonLabel.exp} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
