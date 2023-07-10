import React from "react";
import styles from "@/styles/matrix.module.css";
import { Operations } from "@/lib/types";
import { InlineMath } from "react-katex";
import useGetResult from "@/lib/useGetResult";
import { useGlobalContext } from "@/context/store";

type Props = {
  title: string;
  operations?: Operations[];
  data?: string[];
};

export default function MatrixOperations({ title, operations, data }: Props) {
  const { getResult } = useGetResult();
  const { matrixHistory, setVariable, variable } = useGlobalContext();

  const handleOperation = (op: { id: number; operation: string }) => {
    if (op.id === 9) {
      setVariable(`${variable}^2`);

      matrixHistory?.[`${variable}^2`] ??
        getResult("^2", {
          matrix: matrixHistory?.[variable],
          operation: "square",
        });
    } else if (op.id === 10) {
      setVariable(`${variable}^{-1}`);

      matrixHistory?.[`${variable}^{-1}`] ??
        getResult("^{-1}", {
          matrix: matrixHistory?.[variable],
          operation: "inverse",
        });
    } else if (op.id === 11) {
      setVariable(`${variable}^T`);

      matrixHistory?.[`${variable}^T`] ??
        getResult("^T", {
          matrix: matrixHistory?.[variable],
          operation: "transpose",
        });
    } else if (op.id === 12) {
      setVariable(`${variable}^2`);

      matrixHistory?.[`${variable}^2`] ??
        getResult("^n", {
          matrix: matrixHistory?.[variable],
          operation: "square",
        });
    }
  };

  return (
    <div className={styles.matrix_operations}>
      <h3 className={styles.sub_title}>{title}: </h3>
      <div className={styles.operations_wrapper}>
        {title === "Operations"
          ? operations?.map((op) => (
              <button
                key={op.id}
                onClick={() => handleOperation(op)}
                className={`${styles.operation} ${
                  op.operation.split("^")[1] === variable.split("^")[1] &&
                  styles.operation_disabled
                }`}
              >
                <InlineMath
                  math={`${variable.split("^")[0]}^${
                    op.operation.split("^")[1]
                  }`}
                />
              </button>
            ))
          : data?.map((key, index) => (
              <button
                key={index}
                onClick={() => setVariable(key)}
                className={`${styles.operation} ${
                  key === variable && styles.operation_disabled
                }`}
              >
                <InlineMath math={key} />
              </button>
            ))}
      </div>
    </div>
  );
}
