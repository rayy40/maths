import React from "react";
import styles from "@/styles/matrix.module.css";
import { BlockMath, InlineMath } from "react-katex";
import { useMatrixContext } from "@/context/MatrixContext";
import Loading from "./Loading";
import { displayDifferentErrorMessage } from "@/lib/Helper";

export default function RenderCalculation() {
  const { isLoading, isError, errorMessage, latexCalculatedResult } =
    useMatrixContext();

  return (
    <div className={styles.calculation_wrapper}>
      <h3 style={{ fontSize: "1.15rem" }} className={styles.sub_title}>
        Calculation:
      </h3>
      {isError && (
        <div className={styles.error_wrapper}>
          <h3 style={{ fontWeight: 400, color: "#B43A4E", padding: "2em 0" }}>
            {displayDifferentErrorMessage(errorMessage)}
          </h3>
        </div>
      )}
      {isLoading && (
        <div className={styles.loading_wrapper}>
          <Loading />
        </div>
      )}
      {!isError && !isLoading && (
        <div className={styles.matrix_equation}>
          <InlineMath math={latexCalculatedResult.equation} />
          <InlineMath math={"="} />
          <BlockMath math={latexCalculatedResult.result} />
        </div>
      )}
    </div>
  );
}
