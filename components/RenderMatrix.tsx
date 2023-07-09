import React from "react";
import { BlockMath } from "react-katex";
import styles from "@/styles/matrix.module.css";

type Props = {
  matrix: string[][];
};

export default function RenderMatrix({ matrix }: Props) {
  console.log(matrix);

  return (
    <div className={styles.matrix_display}>
      <BlockMath
        math={`\\begin{bmatrix}
        ${matrix.map((row) => row.join(" & ")).join(" \\\\ ")}
  \\end{bmatrix}`}
      />
    </div>
  );
}
