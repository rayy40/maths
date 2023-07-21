import React, { useRef, useState } from "react";
import { useOutsideAlerter } from "@/lib/Helper";
import styles from "@/styles/drop-down.module.css";
import { FaCaretDown } from "react-icons/fa6";

type Props = {
  selectedParam: string;
  setSelectedParam: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
  setInputValue?: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
  setPolynomialExpression?: React.Dispatch<React.SetStateAction<string>>;
};

export default function DropDown({
  setInputValue,
  selectedParam,
  setSelectedParam,
  items,
  setPolynomialExpression,
}: Props) {
  let dropdownRef = useRef(null);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  useOutsideAlerter(dropdownRef, setIsDropDownVisible);

  return (
    <div ref={dropdownRef} style={{ color: "#9aa0a6", position: "relative" }}>
      Solve for :
      <span
        onClick={() => setIsDropDownVisible((v) => !v)}
        className={styles.dropdown_label}
      >
        {selectedParam} <FaCaretDown />
      </span>
      {isDropDownVisible && (
        <div className={styles.dropDown_container}>
          <ul className={styles.dropDown_list}>
            {items.map((name, i) => (
              <li
                onClick={() => {
                  setSelectedParam(name);
                  setIsDropDownVisible((v) => !v);
                  setInputValue?.({});
                  setPolynomialExpression?.("");
                }}
                key={i}
                className={styles.dropDown_list_item}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
