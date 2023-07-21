import React from "react";
import styles from "@/styles/increase-decrease-count.module.css";
import { FaMinus, FaPlus } from "react-icons/fa6";

type Props = {
  label: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setInputValue?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  handleRenderingEquation?: (number: number) => void;
};

export default function IncreaseDecreaseCount({
  setCount,
  count,
  label,
  handleRenderingEquation,
  setInputValue,
}: Props) {
  const handleButtonClick = (updatedCount: number) => {
    setCount(updatedCount);
    handleRenderingEquation?.(updatedCount);
    setInputValue?.({});
  };

  return (
    <div className={styles.order_container}>
      <p style={{ width: "65px", marginRight: "1.25em" }}>{label}: </p>
      <button
        onClick={() => handleButtonClick(count - 1)}
        className={`${styles.plus_minus_icon} ${
          count <= 2 ? styles.plus_minus_icon_disabled : ""
        } ${label === "Degree" && styles.plus_minus_icon_modified}`}
      >
        <FaMinus />
      </button>
      <input
        readOnly
        className={`${styles.order_input} ${
          label === "Degree" && styles.order_input_modified
        }`}
        value={count}
        type="text"
      />
      <button
        onClick={() => handleButtonClick(count + 1)}
        className={`${styles.plus_minus_icon} ${
          count >= 6 ? styles.plus_minus_icon_disabled : ""
        } ${label === "Degree" && styles.plus_minus_icon_modified}`}
      >
        <FaPlus />
      </button>
    </div>
  );
}
