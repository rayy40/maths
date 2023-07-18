import React from "react";
import styles from "@/styles/equation-solver.module.css";
import { numbers } from "@/lib/equations";
import { InlineMath } from "react-katex";

type Props = {
  handleNumberClick: (value: string) => void;
};

export default function NumberPad({ handleNumberClick }: Props) {
  return (
    <div className={styles.numpad_container}>
      {numbers.map((number, i) => (
        <button
          onClick={() => handleNumberClick(number)}
          className={styles.numpad}
          key={i}
        >
          <InlineMath math={number} />
        </button>
      ))}
    </div>
  );
}
