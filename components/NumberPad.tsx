import React, { useState } from "react";
import styles from "@/styles/number-pad.module.css";
import { numbers } from "@/lib/equations";
import { InlineMath } from "react-katex";
import {
  FaArrowDownLong,
  FaArrowLeftLong,
  FaArrowRightLong,
  FaArrowUpLong,
  FaDeleteLeft,
} from "react-icons/fa6";

type Props = {
  type: string;
  activeInput: string;
  selectedObject?: { [key: string]: string };
  setActiveInput: React.Dispatch<React.SetStateAction<string>>;
  setInputValue?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  setIsInputError?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  setIsMatrixError?: React.Dispatch<React.SetStateAction<boolean>>;
  setMatrixValue?: React.Dispatch<React.SetStateAction<string[][]>>;
};

export default function NumberPad({
  type,
  activeInput,
  setInputValue,
  setActiveInput,
  selectedObject,
  setIsInputError,
  setIsMatrixError,
  setMatrixValue,
}: Props) {
  const [rowIndex, setRowIndex] = useState(0);
  const [colIndex, setColIndex] = useState(0);

  const handleNumberClick = (value: string) => {
    if (
      !isNaN(Number(value)) ||
      value === "-" ||
      value === "." ||
      value === "\\sqrt{}"
    ) {
      setInputValue?.((prev) => ({
        ...prev,
        [activeInput]: prev[activeInput] ? prev[activeInput] + value : value,
      }));
      setMatrixValue?.((prev) => {
        const updatedData = [...prev];
        updatedData[rowIndex][colIndex] = value;
        return updatedData;
      });
      setIsMatrixError?.(false);
      setIsInputError?.((prev) => ({
        ...prev,
        [activeInput]: false,
      }));
    } else {
      setIsMatrixError?.(true);
      setIsInputError?.((prev) => ({
        ...prev,
        [activeInput]: true,
      }));
    }
  };

  const hanldeArrowClick = (direction: string) => {
    const keys = Object.keys(selectedObject!);
    const currentIndex = keys.indexOf(activeInput);
    let newIndex = 0;

    if (direction === "down") {
      newIndex = (currentIndex + 1) % keys.length;
    } else if (direction === "up") {
      newIndex = (currentIndex - 1 + keys.length) % keys.length;
    }

    const newInput = keys[newIndex];
    setActiveInput(newInput);
    document.getElementById(newInput)?.focus();
  };

  const handleDeleteClick = () => {
    setInputValue?.((prev) => ({
      ...prev,
      [activeInput]: prev[activeInput]?.slice(0, -1) || "",
    }));
  };

  return (
    <div
      style={{ justifyContent: type === "matrix" ? "flex-start" : "flex-end" }}
      className={styles.numpad_container}
    >
      {numbers.map((number, i) => (
        <button
          onClick={() => handleNumberClick(number)}
          className={styles.numpad}
          key={i}
        >
          <InlineMath math={number} />
        </button>
      ))}
      <div className={styles.numpad_container}>
        <button
          style={{ order: 1 }}
          onClick={() => {
            hanldeArrowClick("up");
            setRowIndex((prev) => prev + 1);
          }}
          className={styles.numpad}
        >
          {type === "matrix" ? <FaArrowLeftLong /> : <FaArrowUpLong />}
        </button>
        <button
          style={{ order: 2 }}
          onClick={() => hanldeArrowClick("down")}
          className={styles.numpad}
        >
          {type === "matrix" ? <FaArrowRightLong /> : <FaArrowDownLong />}
        </button>
        <button
          style={{ order: 0 }}
          onClick={handleDeleteClick}
          className={styles.numpad}
        >
          <FaDeleteLeft />
        </button>
      </div>
    </div>
  );
}
