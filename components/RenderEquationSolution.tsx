import { useApiContext } from "@/context/MatrixContext";
import { displayDifferentErrorMessage } from "@/lib/Helper";
import styles from "@/styles/equation-solver.module.css";
import React from "react";
import Loading from "./Loading";
import { useEquationSolverContext } from "@/context/EquationSolverContext";
import { BlockMath, InlineMath } from "react-katex";

type Props = {};

export default function RenderEquationSolution({}: Props) {
  const { isLoading, isError, errorMessage } = useApiContext();
  const { result } = useEquationSolverContext();

  return (
    <>
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
        <div className={styles.equation_wrapper}>
          <div className={styles.equation_section}>
            <p>Roots: </p>
            <div className={styles.display_equation}>
              {result.roots.map((root, i) => (
                <div key={i} className={styles.roots_wrapper}>
                  <BlockMath math={`x_${i + 1}`} />
                  <BlockMath math={"="} />
                  <BlockMath math={root} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.equation_section}>
            <p>Factors: </p>
            <div
              style={{ fontSize: "1.15rem" }}
              className={styles.display_equation}
            >
              <InlineMath math={result.factors} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
