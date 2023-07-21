"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import styles from "@/styles/shape.module.css";
import { Formulas, formula } from "@/lib/formulas";
import {
  calculateResult,
  countVariables,
  modifyLatexExpression,
  scrollToContainer,
} from "@/lib/Helper";
import DropDown from "@/components/DropDown";
import { BlockMath } from "react-katex";
import ToggleSwtich from "@/components/ToggleSwtich";
import InputValues from "@/components/InputValues";
import NumberPad from "@/components/NumberPad";

type Params = {
  params: { shape: string };
};

export default function ShapePage({ params: { shape } }: Params) {
  let solutionContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeInput, setActiveInput] = useState("");
  const [selectedParam, setSelectedParam] = useState("area");
  const [result, setResult] = useState({ value: 0, exp: "" });
  const [modifiedLatexExp, setModifiedLatexExp] = useState("");
  const [isNumberPadVisible, setIsNumberPadVisible] = useState(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [isInputError, setIsInputError] = useState<{ [key: string]: boolean }>(
    {}
  );

  const selectedShape = formula.find(
    (s) => s.name === decodeURIComponent(shape)
  );

  const filterKeys = (selectedShape: Formulas, selectedParam: string) => {
    const renderFormula = selectedShape?.renderFormula;
    if (!renderFormula) return [];

    return Object.keys(renderFormula).filter(
      (key) => key.toLowerCase() !== selectedParam
    );
  };

  const { variables } = useMemo(() => {
    const renderFormula = selectedShape?.renderFormula?.[selectedParam];
    return countVariables(renderFormula);
  }, [selectedShape, selectedParam]);

  const items = useMemo(
    () => filterKeys(selectedShape as Formulas, selectedParam),
    [selectedShape, selectedParam]
  );

  useEffect(() => {
    const initialInputValues = variables.reduce(
      (acc, variable) => ({ ...acc, [variable]: "" }),
      {}
    );
    setInputValues(initialInputValues);
  }, [variables]);

  const handleSubmit = () => {
    const keysWithEmptyValue = Object.keys(inputValues).filter(
      (key) => inputValues[key] === ""
    );

    if (keysWithEmptyValue.length > 0) {
      keysWithEmptyValue?.map((key) => {
        setIsInputError((prev) => ({
          ...prev,
          [key]: true,
        }));
      });
      return;
    }

    if (solutionContainerRef.current) {
      solutionContainerRef.current.style.display = "block";

      scrollToContainer(solutionContainerRef);
    }

    const { value, exp } = calculateResult(
      variables,
      selectedShape?.calculateFormula?.[selectedParam]!,
      inputValues,
      selectedShape?.renderFormula?.[selectedParam]!
    );

    setResult({ value, exp });

    setModifiedLatexExp(
      modifyLatexExpression(
        inputValues,
        selectedShape?.modifiedFormula?.[selectedParam]!
      )
    );

    const initialInputValues = variables.reduce(
      (acc, variable) => ({ ...acc, [variable]: "" }),
      {}
    );

    setInputValues(initialInputValues);
  };

  return (
    <>
      <div className="page_container">
        <div className="header_container">
          <div className="header_wrapper">
            <h2 className="title">{selectedShape?.name}</h2>
            <DropDown
              selectedParam={selectedParam}
              setSelectedParam={setSelectedParam}
              items={items}
            />
          </div>
          <div className="toggle_switch_wrapper">
            <ToggleSwtich
              label={"Number Pad"}
              setToggle={setIsNumberPadVisible}
            />
          </div>
        </div>
        <div
          style={{ justifyContent: "flex-start" }}
          className="equation_container"
        >
          <BlockMath math={selectedShape?.renderFormula?.[selectedParam]!} />
        </div>
        <div className={styles.section}>
          <div className="input_wrapper">
            <h3 className="sub_title">Input:</h3>
            <div className="input_values_container">
              {variables.map((variable, i) => (
                <InputValues
                  key={i}
                  variable={variable}
                  isInputError={isInputError}
                  inputValue={inputValues}
                  setIsInputError={setIsInputError}
                  setInputValue={setInputValues}
                  setActiveInput={setActiveInput}
                />
              ))}
            </div>
          </div>
          {isNumberPadVisible ? (
            <div>
              <h3 style={{ textAlign: "right" }} className="sub_title">
                Number Pad:
              </h3>
              <NumberPad
                type={"shape"}
                activeInput={activeInput}
                selectedObject={selectedShape?.parameters!}
                setActiveInput={setActiveInput}
                setInputValue={setInputValues}
                setIsInputError={setIsInputError}
              />
            </div>
          ) : (
            <div className={styles.figure}>{selectedShape?.image}</div>
          )}
        </div>
        <div className={styles.submit_button_wrapper}>
          <button
            onClick={handleSubmit}
            className={`submit_button ${styles.submit_btn_modified}`}
          >
            Submit
          </button>
          <button
            onClick={() => setInputValues({})}
            className={`submit_button ${styles.submit_btn_modified}`}
          >
            Reset
          </button>
        </div>
      </div>
      <div ref={solutionContainerRef} className={styles.solution_container}>
        <h2
          style={{ paddingBottom: "1.25em", fontSize: "1.25em" }}
          className="title"
        >
          Solution:
        </h2>
        <div className={styles.solution_content}>
          <h3 style={{ height: "60px" }}>
            <BlockMath math={selectedShape?.renderFormula?.[selectedParam]!} />
          </h3>
          <h3 style={{ height: "60px" }}>
            <BlockMath math={modifiedLatexExp} />
          </h3>
          <h3 style={{ height: "60px" }}>
            <BlockMath math={result?.exp} />
          </h3>
        </div>
      </div>
    </>
  );
}
