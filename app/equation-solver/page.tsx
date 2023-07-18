"use client";

import React, { useState, useMemo, useRef } from "react";
import styles from "@/styles/equation-solver.module.css";
import DropDown from "@/components/DropDown";
import { equation } from "@/lib/equations";
import { BlockMath, InlineMath } from "react-katex";
import NumberPad from "@/components/NumberPad";
import { FaArrowUpLong, FaArrowDownLong, FaDeleteLeft } from "react-icons/fa6";
import { replaceVariables, scrollToContainer } from "@/lib/Helper";
import useSolveEquation from "@/lib/useSolveEquation";
import RenderEquationSolution from "@/components/RenderEquationSolution";

export default function EquationSolver() {
  const { getRoots } = useSolveEquation();
  let solutionContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeInput, setActiveInput] = useState("");
  const [selectedParam, setSelectedParam] = useState("quadratic");
  const [isInputError, setIsInputError] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({
    a: "",
  });

  let selectedEquation = equation.find(
    (eq) => eq.name.toLowerCase() === selectedParam
  );

  let items = useMemo(
    () =>
      equation
        .filter((eq) => eq.name.toLowerCase() !== selectedParam)
        .map((eq) => eq.name),
    [selectedParam]
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    variable: string
  ) => {
    const { value } = event.target;
    setActiveInput(variable);

    if (
      !isNaN(Number(value)) ||
      value === "-" ||
      value === "." ||
      value === "\\sqrt{}"
    ) {
      setInputValue((prev) => ({
        ...prev,
        [variable]: value,
      }));
      setIsInputError((prev) => ({
        ...prev,
        [variable]: false,
      }));
    } else {
      setIsInputError((prev) => ({
        ...prev,
        [variable]: true,
      }));
    }
  };

  let eq = useMemo(() => {
    return replaceVariables(
      inputValue,
      selectedEquation?.renderFormula!,
      false
    );
  }, [inputValue, selectedEquation]);

  const handleNumberClick = (value: string) => {
    if (
      !isNaN(Number(value)) ||
      value === "-" ||
      value === "." ||
      value === "\\sqrt{}"
    ) {
      if (value === "\\sqrt{}") {
        setInputValue((prev) => ({
          ...prev,
          [activeInput]: prev[activeInput] ? prev[activeInput] + value : value,
        }));
      } else {
        setInputValue((prev) => ({
          ...prev,
          [activeInput]: prev[activeInput] ? prev[activeInput] + value : value,
        }));
      }
      setIsInputError((prev) => ({
        ...prev,
        [activeInput]: false,
      }));
    } else {
      setIsInputError((prev) => ({
        ...prev,
        [activeInput]: true,
      }));
    }
  };

  const handleDeleteClick = () => {
    setInputValue((prev) => ({
      ...prev,
      [activeInput]: prev[activeInput]?.slice(0, -1) || "",
    }));
  };

  const hanldeArrowClick = (direction: string) => {
    const keys = Object.keys(selectedEquation?.parameters!);
    const currentIndex = keys.indexOf(activeInput);
    let newIndex = 0;

    if (direction === "down") {
      newIndex = (currentIndex + 1) % keys.length;
    } else if (direction === "up") {
      newIndex = (currentIndex - 1 + keys.length) % keys.length;
    }

    const newInput = keys[newIndex];
    setActiveInput(newInput);
    // document.getElementById(newInput)?.focus();
  };

  const handleSubmit = () => {
    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";

      scrollToContainer(solutionContainerRef);
    }

    let eq = replaceVariables(
      inputValue,
      selectedEquation?.renderFormula!,
      true
    );

    if (eq) {
      getRoots({ equation: eq });
    }
  };

  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.header_container}>
          <h2 className={styles.title}>Equation Solver</h2>
          <DropDown
            selectedParam={selectedParam}
            setSelectedParam={setSelectedParam}
            items={items}
          />
        </div>
        <div className={styles.equation_container}>
          <BlockMath math={eq ?? selectedEquation?.renderFormula!} />
        </div>
        <div className={styles.input_container}>
          <div className={styles.input_section_wrapper}>
            <h3 className={styles.sub_title}>Input:</h3>
            <div className={styles.input_wrapper}>
              {selectedEquation &&
                Object.keys(selectedEquation?.parameters).map((variable, i) => (
                  <div key={i} className={styles.input_container}>
                    <h2
                      className={`${styles.expression} ${
                        isInputError?.[variable] && styles.expression_error
                      }`}
                    >
                      <InlineMath math={variable} />
                    </h2>
                    <div className={styles.input_field_wrapper}>
                      <input
                        id={activeInput}
                        onClick={() => setActiveInput(variable)}
                        onChange={(e) => handleInputChange(e, variable)}
                        value={inputValue?.[variable]}
                        className={`${styles.input} ${
                          isInputError?.[variable] && styles.input_error
                        }`}
                        type="text"
                        placeholder="Enter value"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.input_section_wrapper}>
            <h3 style={{ textAlign: "right" }} className={styles.sub_title}>
              Number Pad:
            </h3>
            <div className={styles.buttons_wrapper}>
              <NumberPad handleNumberClick={handleNumberClick} />
              <div className={styles.numpad_container}>
                <button
                  onClick={() => hanldeArrowClick("up")}
                  className={styles.numpad}
                >
                  <FaArrowUpLong />
                </button>
                <button
                  onClick={() => hanldeArrowClick("down")}
                  className={styles.numpad}
                >
                  <FaArrowDownLong />
                </button>
                <button onClick={handleDeleteClick} className={styles.numpad}>
                  <FaDeleteLeft />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.submit_button_wrapper}>
          <button
            onClick={handleSubmit}
            className={`submit_button ${styles.btn}`}
          >
            Submit
          </button>
          <button
            onClick={() => setInputValue({})}
            className={`submit_button ${styles.btn}`}
          >
            Reset
          </button>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.page_solution}>
        <h3 style={{ fontSize: "1.15rem" }} className={styles.sub_title}>
          Solution:{" "}
        </h3>
        <div className={styles.solution_wrapper}>
          <RenderEquationSolution />
        </div>
      </div>
    </>
  );
}
