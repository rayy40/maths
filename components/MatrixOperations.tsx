import React from "react";
import "katex/dist/katex.min.css";
import { operations } from "@/lib/types";
import { InlineMath } from "react-katex";
import styles from "@/styles/matrix.module.css";
import { AiOutlineEnter } from "react-icons/ai";

type Props = {
  handleSubmit: () => void;
  declaration: string;
  setDeclaration: React.Dispatch<React.SetStateAction<string>>;
};

export default function MatrixOperations({
  handleSubmit,
  declaration,
  setDeclaration,
}: Props) {
  const selectedId = operations.find((o) => o.operation === declaration);

  const handleClick = (id: number): void => {
    const selectedOperation = operations.find((o) => o.id === id);

    if ([1, 2, 3, 4].includes(id)) {
      setDeclaration(selectedOperation?.operation!);
    }
  };

  return (
    <div className={styles.operations_wrapper}>
      {operations.map((operation) => (
        <button
          key={operation.id}
          onClick={() => handleClick(operation.id)}
          className={`${styles.operation} ${
            operation.id === selectedId?.id && styles.operation_disabled
          }`}
        >
          <InlineMath math={operation.operation} />
        </button>
      ))}
      <button onClick={handleSubmit} className={styles.operation}>
        <AiOutlineEnter style={{ fontSize: "1.15rem" }} />
      </button>
    </div>
  );
}
