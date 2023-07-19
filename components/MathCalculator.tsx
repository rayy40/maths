import React from "react";
import styles from "@/styles/math-calculator.module.css";
import { advancedOperations } from "@/lib/equations";
import { InlineMath } from "react-katex";
import {
  FaDeleteLeft,
  FaArrowLeftLong,
  FaArrowRightLong,
} from "react-icons/fa6";

type Props = {
  setAdvancedExp: React.Dispatch<React.SetStateAction<string>>;
};

export default function MathCalculator({ setAdvancedExp }: Props) {
  const numbers: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    ".",
    "0",
    "9",
  ];

  const handleBackSpace = () => {
    setAdvancedExp((prev) => prev?.slice(0, -1) || "");
    document.getElementById("advanced_input")?.focus();
  };

  const handleButtonClick = (exp: string) => {
    setAdvancedExp((prev) => prev + exp);
    document.getElementById("advanced_input")?.focus();
  };

  const handleOperationsClick = (exp: string) => {
    const openingBraceIndex = exp.indexOf("{");
    const closingBraceIndex = exp.indexOf("}");
    const inputElement = document.getElementById(
      "advanced_input"
    ) as HTMLInputElement;

    if (openingBraceIndex !== -1 && closingBraceIndex !== -1) {
      setAdvancedExp(
        (prev) =>
          prev +
          exp.substring(0, openingBraceIndex + 1) +
          exp.substring(closingBraceIndex)
      );
    } else {
      setAdvancedExp((prev) => prev + exp);
    }
    inputElement.focus();
  };

  return (
    <div className={styles.calculator_wrapper}>
      <div className={styles.calculator_section}>
        {advancedOperations.map((label, i) => (
          <button
            onClick={() => handleOperationsClick(label)}
            className={styles.calculator_button}
            key={i}
          >
            <InlineMath math={label} />
          </button>
        ))}
        <button
          onClick={() => handleButtonClick("x")}
          className={styles.calculator_button}
        >
          <InlineMath math="x" />
        </button>
        <button
          onClick={() => handleButtonClick("y")}
          className={styles.calculator_button}
        >
          <InlineMath math="y" />
        </button>
        <button
          onClick={() => handleButtonClick("z")}
          className={styles.calculator_button}
        >
          <InlineMath math="z" />
        </button>
      </div>
      <div className={styles.calculator_section}>
        {numbers.map((label, i) => (
          <button
            onClick={() => handleButtonClick(label)}
            className={styles.calculator_button}
            key={i}
          >
            <InlineMath math={label} />
          </button>
        ))}
        <button onClick={handleBackSpace} className={styles.calculator_button}>
          <FaDeleteLeft />
        </button>
        <button
          onClick={() => handleButtonClick(" = ")}
          className={styles.calculator_button}
        >
          <InlineMath math="=" />
        </button>
        <button className={styles.calculator_button}>
          <FaArrowLeftLong />
        </button>
        <button className={styles.calculator_button}>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}
