import React from "react";
import styles from "@/styles/input.module.css";
import "@/styles/globals.css";
import LatexExpression from "./LatexExpression";

type Props = {
  variable: string;
  inputValue: string;
  name: string | undefined;
  setParameters: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  setInputValue: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
};

export default function InputVariable({
  inputValue,
  setInputValue,
  name,
  variable,
  setParameters,
}: Props) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [variable]: event.target.value,
    }));

    setParameters((prev) => ({
      ...prev,
      [variable]: parseFloat(event.target.value),
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.expression}>
          <LatexExpression expression={variable} />
        </h2>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.inputWrapper}>
        <input
          onChange={handleInputChange}
          value={inputValue}
          className={styles.input}
          type="text"
          placeholder="Enter value"
        />
      </div>
    </div>
  );
}
