import React from "react";
import styles from "@/styles/shape.module.css";
import "@/styles/globals.css";
import LatexExpression from "./LatexExpression";

type Props = {
  setParameters: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  name: string | undefined;
  variable: string;
};

export default function InputVariable({
  name,
  variable,
  setParameters,
}: Props) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);

    setParameters((prevParameters) => ({
      ...prevParameters,
      [variable]: value,
    }));
  };

  return (
    <div className={styles.variableContainer}>
      <div className={styles.variableDetail}>
        <h2 className={styles.variable}>
          <LatexExpression expression={variable} />
        </h2>
        <p className={styles.variableName}>{name}</p>
      </div>
      <div className={styles.variableInput}>
        <input
          onChange={handleInputChange}
          className={styles.input}
          type="text"
          placeholder="Enter value"
        />
      </div>
    </div>
  );
}
