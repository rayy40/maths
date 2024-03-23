import React, { useRef, useState } from "react";
import styles from "@/styles/matrix.module.css";
import { InlineMath } from "react-katex";
import { useApiContext, useMatrixContext } from "@/context/MatrixContext";
import useGetResult from "@/lib/useGetResult";
import useOutsideClick from "@/lib/useOutsideClick";

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
  const [showInputPower, setShowInputPower] = useState(false);
  const [power, setPower] = useState(1);
  const prevMatrixEquationRef = useRef("");
  const inputPowerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(inputPowerRef, () => {
    setShowInputPower(false);
  });

  const getButtonClassName = (
    buttonLabel: { name: string; exp: string },
    index: number
  ) => {
    const isButtonDisabled = buttonLabel?.exp === exp;
    const isButtonModified = index > 7 && index < 14;

    let className = "select_button";

    if (isButtonDisabled) {
      className += " select_button_disabled";
    }

    if (isButtonModified) {
      className += " select_button_modified";
    }

    return className;
  };

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
      opsArray.map((op) => {
        if (op.name.includes("clear") || op.name.includes("clear all")) {
          return op;
        } else {
          return {
            ...op,
            exp: op.exp.replace(/(?![TE])[A-Z]/g, matrix),
          };
        }
      })
    );
  };

  const handleOperationsClick = (label: { name: string; exp: string }) => {
    const operations = [
      "addition",
      "subtraction",
      "multiplication",
      "division",
    ];

    console.log(matrixEquation);
    console.log(exp);

    if (label.name === "power") {
      setShowInputPower(true);
    } else {
      setShowInputPower(false);
      if (label.name === "clear all") {
        setExp("");
        setIsCalculatorOn(false);
        setMatrixEquation("", false);
      } else if (label.name === "clear") {
      } else if (isCalculatorOn || operations.includes(label.name)) {
        return handleMatrixEquation(label);
      } else {
        return handleOperationChange(label);
      }
    }
  };

  const handleOperationChange = (op: { name: string; exp: string }) => {
    setIsError(false);
    let exp = op.exp;

    if (op.name !== "enter") {
      if (op.name === "power") {
        const variable = op.exp.split("^")[0];
        exp = `${variable}^${power}`;
      }
      setExp(exp);
      if (!matrixHistory?.[exp] && !eigenValAndVector?.[exp]) {
        getResult({
          matrix: matrixHistory?.[selectedMatrix] as string[][],
          operation: op.name,
          expression: exp,
          power: op.name === "power" ? power : undefined,
        });
      }
    }
    prevMatrixEquationRef.current = exp;
    setMatrixEquation(exp, isCalculatorOn);
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
    if (buttonLabel.name === "power") {
      const variable = buttonLabel.exp.split("^")[0];
      copy = `${variable}^${power}`;
    }
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
                className={`select_button ${
                  buttonLabel === exp && "select_button_disabled"
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
            ?.filter((_, index) => index < 14)
            .map((buttonLabel, index) => (
              <>
                <button
                  key={index}
                  onClick={() => handleOperationsClick(buttonLabel)}
                  className={getButtonClassName(buttonLabel, index)}
                >
                  <InlineMath math={buttonLabel.exp} />
                </button>
                {showInputPower && index === 3 && (
                  <div ref={inputPowerRef} className="select_button_power">
                    <p>Power</p>
                    <input
                      onChange={(e) => setPower(parseInt(e.target.value))}
                      id="power"
                      type="number"
                    />
                    <button
                      type="submit"
                      onClick={() => {
                        setShowInputPower(false);
                        isCalculatorOn
                          ? handleMatrixEquation(buttonLabel)
                          : handleOperationChange(buttonLabel);
                      }}
                      className="submit_button submit_button_modified"
                    >
                      Done
                    </button>
                  </div>
                )}
              </>
            ))}
        </div>
      </div>
      <div className={styles.operation_col_container}>
        <h3 className={styles.sub_title}>Advanced Operations: </h3>
        <div className={styles.operations_wrapper}>
          {opsArray
            ?.filter((_, index) => index > 13)
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
                className={`select_button select_button_modified ${
                  buttonLabel?.exp === exp && "select_button_disabled"
                }`}
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
