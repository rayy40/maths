import React from "react";
import styles from "@/styles/matrix.module.css";
import { BlockMath, InlineMath } from "react-katex";
import { useGlobalContext } from "@/context/store";

type Props = {
  title: string;
};

export default function RenderCalculation({ title }: Props) {
  const { matrixEquation, matrixHistory } = useGlobalContext();

  console.log(matrixEquation);

  const substitutedEquation = matrixEquation
    .replace(/[{()}]/g, "")
    .split(/(?=[+\-*/])/)
    .map((term) => term.replace(/^[+\-]|(?<=\^)[+\-]$/g, ""));

  console.log(substitutedEquation);

  return (
    <div className={styles.matrix_calculation_display}>
      {title === "equation" && (
        <div className={styles.matrix_equation}>
          <InlineMath math={"Eq^n: "} />
          <InlineMath math={matrixEquation} />
        </div>
      )}
      {title === "values" && <div className={styles.matrix_equation}></div>}
    </div>
  );
}
