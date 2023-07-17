import React, { useRef, useState } from "react";
import styles from "@/styles/matrix.module.css";
import { InlineMath } from "react-katex";
import { useApiContext, useMatrixContext } from "@/context/MatrixContext";
import useGetResult from "@/lib/useGetResult";

type Props = {
  handleScroll: () => void;
};

export default function MatrixOperations({ handleScroll }: Props) {
  const { getResult, getEquation } = useGetResult();
  const {
    eigenValAndVector,
    matrixHistory,
    setOpsArray,
    opsArray,
    setExp,
    exp,
    matrixEquation,
    setMatrixEquation,
    isCalculatorOn,
    setIsCalculatorOn,
  } = useMatrixContext();
  const { setIsError } = useApiContext();
  const [selectedMatrix, setSelectedMatrix] = useState(exp);
  const prevMatrixEquationRef = useRef("");

  const handleMatrixChange = (matrix: string) => {
    setExp(matrix);
    setIsError(false);
    setSelectedMatrix(matrix);
    handleChangeOpsArray(matrix);
    prevMatrixEquationRef.current = matrix;
    setMatrixEquation(matrix, isCalculatorOn);
  };

  const handleChangeOpsArray = (matrix: string) => {
    setOpsArray(
      opsArray.map((op) => ({
        ...op,
        exp: op.exp.replace(/(?![TE])[A-Z]/g, matrix),
      }))
    );
  };

  const handleOperationChange = (op: { name: string; exp: string }) => {
    setIsError(false);
    if (op.name !== "enter") {
      setExp(op.exp);
      if (!matrixHistory?.[op.exp] && !eigenValAndVector?.[op.exp]) {
        getResult({
          matrix: matrixHistory?.[selectedMatrix] as string[][],
          operation: op.name,
          expression: op.exp,
        });
      }
    }
    prevMatrixEquationRef.current = op.exp;
    setMatrixEquation(op.exp, isCalculatorOn);
  };

  const handleMatrixEquation = (buttonLabel: { name: string; exp: string }) => {
    if (buttonLabel.name === "enter") {
      handleScroll();
      getEquation({
        matrixHistory: matrixHistory as { [key: string]: string[][] },
        equation: matrixEquation,
      });
      return setIsCalculatorOn(false);
    }
    let copy = buttonLabel?.exp;
    setIsCalculatorOn(true);
    if (prevMatrixEquationRef.current === matrixEquation) {
      copy = prevMatrixEquationRef.current + copy;
    }
    setMatrixEquation(copy, isCalculatorOn);
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
                  buttonLabel === exp && styles.operation_disabled
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
          {opsArray
            ?.filter((_, index) => index < 12)
            .map((buttonLabel, index) => (
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
                } ${
                  [8, 9, 10, 11].includes(index) && styles.operation_modified
                }`}
              >
                <InlineMath math={buttonLabel.exp} />
              </button>
            ))}
        </div>
      </div>
      <div className={styles.operation_col_container}>
        <h3 className={styles.sub_title}>Advanced Operations: </h3>
        <div className={styles.operations_wrapper}>
          {opsArray
            ?.filter((_, index) => index > 11)
            .map((buttonLabel, index) => (
              <button
                onClick={() => handleOperationChange(buttonLabel)}
                key={index}
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontWeight: "500",
                  fontSize: "0.925rem",
                  lineHeight: "1.5",
                  height: "60px",
                }}
                className={`${styles.operation} ${
                  buttonLabel?.exp === exp && styles.operation_disabled
                } ${styles.operation_modified}`}
              >
                {buttonLabel.exp.split(" ").map((word, i) => (
                  <React.Fragment key={i}>
                    {word}
                    {i !== buttonLabel.exp.split(" ").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
