import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "@/styles/matrix.module.css";
import { useGlobalContext } from "@/context/store";

export default function RenderMatrix() {
  const { matrixHistory, variable } = useGlobalContext();

  return (
    <div className={styles.matrix_display}>
      <div className={styles.matrix_equation}>
        <InlineMath math={variable} />
        <InlineMath math={"="} />
        <div style={{ fontSize: "1.25rem" }}>
          <BlockMath
            math={`\\begin{bmatrix}
            ${matrixHistory?.[variable]
              ?.map((row) =>
                row
                  .map((value) => Math.round(parseFloat(value) * 1000) / 1000)
                  .join(" & ")
              )
              .join(" \\\\ ")}
            \\end{bmatrix}`}
          />
        </div>
      </div>
    </div>
  );
}
