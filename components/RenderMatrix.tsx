import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import styles from "@/styles/matrix.module.css";
import { useGlobalContext } from "@/context/store";
import { convertToLatex } from "@/lib/Helper";

export default function RenderMatrix() {
  const { matrixHistory, exp, matrixEquation, isCalculatorOn } =
    useGlobalContext();

  const containsLatexExpression = (exp: string) => {
    const latexPattern = /\\[a-zA-Z]+\{[^\}]+\}|\\\(|\\\)|\\\[|\\\]/;
    return latexPattern.test(exp);
  };

  console.log(typeof matrixHistory?.[exp]);

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
          ) : typeof matrixHistory?.[exp] === "string" ? (
            <BlockMath math={matrixHistory?.[exp] as string} />
          ) : (
            <BlockMath
              math={convertToLatex(matrixHistory?.[exp] as string[][])}
            />
          )}
        </div>
      </div>
    </div>
  );
}
