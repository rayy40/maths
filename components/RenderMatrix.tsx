import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "@/styles/matrix.module.css";
import { useGlobalContext } from "@/context/store";

export default function RenderMatrix() {
  const { matrixHistory, exp, matrixEquation, isCalculatorOn } =
    useGlobalContext();

  return (
    <div className={styles.matrix_display}>
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
          ) : (
            <BlockMath
              math={`\\begin{bmatrix}
            ${matrixHistory?.[exp]
              ?.map((row) =>
                row
                  .map((value) => Math.round(parseFloat(value) * 1000) / 1000)
                  .join(" & ")
              )
              .join(" \\\\ ")}
            \\end{bmatrix}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
