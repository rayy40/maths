import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "@/styles/matrix.module.css";
import { useApiContext, useMatrixContext } from "@/context/MatrixContext";
import { convertToLatex, displayDifferentErrorMessage } from "@/lib/Helper";
import Loading from "./Loading";

export default function RenderMatrix() {
  const {
    matrixHistory,
    exp,
    matrixEquation,
    isCalculatorOn,
    eigenValAndVector,
  } = useMatrixContext();
  const { isError, isLoading, errorMessage } = useApiContext();

  const convertToMatrix = (matrix: string[]) => {
    const latex = matrix.map((value) => String(value)).join(" & ");

    return `\\begin{bmatrix}${latex}\\end{bmatrix}`;
  };

  return (
    <div className={styles.matrix_display}>
      {isError && (
        <div className={styles.error_wrapper}>
          <h3 style={{ fontWeight: 400, color: "#B43A4E" }}>
            {displayDifferentErrorMessage(errorMessage)}
          </h3>
        </div>
      )}
      {isLoading && (
        <div className={styles.loading_wrapper}>
          <Loading />
        </div>
      )}
      {!isError &&
        !isLoading &&
        (exp.includes("Eigen") ? (
          <div className={styles.eigen_wrapper}>
            {eigenValAndVector?.[exp] &&
              (exp?.split(" ")[1].split("(")[0] === "value"
                ? Object.values(eigenValAndVector?.[exp]?.value).map(
                    (val, index) => (
                      <div key={index} className={styles.eigen_child_wrapper}>
                        <InlineMath math={`\\lambda_${index + 1}`} />
                        <InlineMath math="=" />
                        <InlineMath math={val.toString()} />
                      </div>
                    )
                  )
                : Object.values(eigenValAndVector?.[exp]?.vector).map(
                    (val, index) => (
                      <div key={index} className={styles.eigen_child_wrapper}>
                        <InlineMath math={`X_${index + 1}`} />
                        <InlineMath math="=" />
                        <InlineMath math={convertToMatrix(val)} />
                      </div>
                    )
                  ))}
          </div>
        ) : (
          <div className={styles.matrix_equation}>
            {!isCalculatorOn && (
              <>
                <InlineMath math={exp} />
                <InlineMath math={"="} />
              </>
            )}
            <div style={{ fontSize: "1.25rem" }}>
              {isCalculatorOn ? (
                <BlockMath math={matrixEquation} />
              ) : typeof matrixHistory?.[exp] === "string" ? (
                <BlockMath math={matrixHistory?.[exp] as string} />
              ) : (
                <BlockMath
                  math={convertToLatex(matrixHistory?.[exp] as string[][])}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
