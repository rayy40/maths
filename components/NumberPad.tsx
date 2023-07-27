import React from "react";
import styles from "@/styles/number-pad.module.css";
import { numbers } from "@/lib/equations";
import { MultiInputValues } from "@/lib/types";
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
  maxRow?: number;
  maxColumn?: number;
  activeInput?: string;
  activeChildKey?: string;
  selectedObject?: { [key: string]: string };
  index?: {
    row: number;
    column: number;
  };
  setIndex?: React.Dispatch<
    React.SetStateAction<{
      row: number;
      column: number;
    }>
  >;
  setActiveInput?: React.Dispatch<React.SetStateAction<string>>;
  setActiveChildKey?: React.Dispatch<React.SetStateAction<string>>;
  setInputValue?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  setMultiInputValue?: React.Dispatch<React.SetStateAction<MultiInputValues>>;
  setIsInputError?: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  setIsMatrixError?: React.Dispatch<React.SetStateAction<boolean>>;
  setMatrixValue?: React.Dispatch<React.SetStateAction<string[][]>>;
};

export default function NumberPad({
  type,
  index,
  maxRow,
  setIndex,
  maxColumn,
  activeInput,
  setInputValue,
  activeChildKey,
  selectedObject,
  setMatrixValue,
  setActiveInput,
  setIsInputError,
  setIsMatrixError,
  setActiveChildKey,
  setMultiInputValue,
}: Props) {
  const handleNumberClick = (value: string) => {
    if (
      !isNaN(Number(value)) ||
      value === "-" ||
      value === "." ||
      value === "\\sqrt{}"
    ) {
      setInputValue?.((prev) => ({
        ...prev,
        [activeInput as string]: prev[activeInput as string]
          ? prev[activeInput as string] + value
          : value,
      }));
      // setMultiInputValue?.((prev) => {
      //   const newKeyValues = [...prev[activeInput as string]];
      //   newKeyValues[activeIndex as number] += value;

      //   return {
      //     ...prev,
      //     [activeInput as string]: newKeyValues,
      //   };
      // });
      setMultiInputValue?.((prev) => {
        const newKeyValues = { ...prev[activeInput as string] };
        newKeyValues[activeChildKey as string] += value;

        return {
          ...prev,
          [activeInput as string]: newKeyValues,
        };
      });
      setMatrixValue?.((prev) => {
        const updatedData = [...prev];
        updatedData[index?.row ?? 0] = [...prev[index?.row ?? 0]];
        updatedData[index?.row ?? 0][index?.column ?? 0] += value;
        return updatedData;
      });

      setIsMatrixError?.(false);
      setIsInputError?.((prev) => ({
        ...prev,
        [activeInput as string]: false,
      }));
    } else {
      setIsMatrixError?.(true);
      setIsInputError?.((prev) => ({
        ...prev,
        [activeInput as string]: true,
      }));
    }
  };

  const hanldeArrowClick = (direction: string) => {
    if (type === "matrix") {
      if (direction === "up") {
        setIndex?.((prevIndex) => ({
          row: prevIndex.row === 0 ? prevIndex.row : prevIndex.row - 1,
          column: prevIndex.row === 0 ? prevIndex.column - 1 : prevIndex.column,
        }));
      } else {
        setIndex?.((prevIndex) => ({
          row:
            prevIndex.column === maxColumn
              ? prevIndex.row === maxRow
                ? 0
                : prevIndex.row + 1
              : prevIndex.row,
          column: prevIndex.column === maxColumn ? 0 : prevIndex.column + 1,
        }));
      }
    } else if (type === "simultaneous") {
      let index = activeInput?.split("_")[1];
      let key: string = activeChildKey?.split("_")[0] as string;
      let updatedKey = "a";
      if (direction === "up") {
        if (updatedKey !== "a") {
          updatedKey = String.fromCharCode(key?.charCodeAt(0) - 1);
        }

        setActiveChildKey?.(`${updatedKey}_${index}`);
        document
          .getElementById(`${activeInput}_${updatedKey}_${index}`)
          ?.focus();
      } else {
        const lastKey = String.fromCharCode(
          updatedKey?.charCodeAt(0) + maxColumn!
        );

        if (key !== lastKey) {
          updatedKey = String.fromCharCode(key?.charCodeAt(0) + 1);
        }

        setActiveChildKey?.(`${updatedKey}_${index}`);
        document
          .getElementById(`${activeInput}_${updatedKey}_${index}`)
          ?.focus();
      }
    } else {
      const keys = Object.keys(selectedObject!);
      const currentIndex = keys.indexOf(activeInput as string);
      let newIndex = 0;

      if (direction === "down") {
        newIndex = (currentIndex + 1) % keys.length;
      } else if (direction === "up") {
        newIndex = (currentIndex - 1 + keys.length) % keys.length;
      }

      const newInput = keys[newIndex];
      setActiveInput?.(newInput);
      document.getElementById(newInput)?.focus();
    }
  };

  const handleDeleteClick = () => {
    setInputValue?.((prev) => ({
      ...prev,
      [activeInput as string]: prev[activeInput as string]?.slice(0, -1) || "",
    }));

    setMatrixValue?.((prev) => {
      const updatedData = [...prev];
      updatedData[index?.row ?? 0] = [...prev[index?.row ?? 0]];
      updatedData[index?.row ?? 0][index?.column ?? 0] = updatedData[
        index?.row ?? 0
      ][index?.column ?? 0].slice(0, -1);
      return updatedData;
    });

    setMultiInputValue?.((prev) => {
      const newKeyValues = { ...prev[activeInput as string] };
      newKeyValues[activeChildKey as string] = newKeyValues[
        activeChildKey as string
      ].slice(0, -1);

      return {
        ...prev,
        [activeInput as string]: newKeyValues,
      };
    });
  };

  return (
    <div
      style={{
        justifyContent: ["matrix", "simultaneous"].includes(type)
          ? "flex-start"
          : "flex-end",
      }}
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
          onClick={() => hanldeArrowClick("up")}
          className={styles.numpad}
        >
          {["matrix", "simultaneous"].includes(type) ? (
            <FaArrowLeftLong />
          ) : (
            <FaArrowUpLong />
          )}
        </button>
        <button
          style={{ order: 2 }}
          onClick={() => hanldeArrowClick("down")}
          className={styles.numpad}
        >
          {["matrix", "simultaneous"].includes(type) ? (
            <FaArrowRightLong />
          ) : (
            <FaArrowDownLong />
          )}
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
