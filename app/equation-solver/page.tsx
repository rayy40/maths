"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "@/styles/equation-solver.module.css";
import DropDown from "@/components/DropDown";
import { equation } from "@/lib/equations";
import { BlockMath } from "react-katex";
import NumberPad from "@/components/NumberPad";
import { replaceVariables, scrollToContainer } from "@/lib/Helper";
import useSolveEquation from "@/lib/useSolveEquation";
import RenderEquationSolution from "@/components/RenderEquationSolution";
import MathCalculator from "@/components/MathCalculator";
import ToggleSwtich from "@/components/ToggleSwtich";
import { FaRegCircleQuestion } from "react-icons/fa6";
import Help from "@/components/Help";
import IncreaseDecreaseCount from "@/components/IncreaseDecreaseCount";
import InputValues from "@/components/InputValues";

export default function EquationSolver() {
  let solutionContainerRef = useRef<HTMLDivElement | null>(null);
  const { getRoots } = useSolveEquation();
  const [variables, setVariables] = useState(4);
  const [activeInput, setActiveInput] = useState("");
  const [advancedExp, setAdvancedExp] = useState("");
  const [equations, setEquations] = useState([...equation]);
  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const [selectedParam, setSelectedParam] = useState("quadratic");
  const [polynomialExpression, setPolynomialExpression] = useState("");
  const [isAdvancedCalcVisible, setIsAdvancedCalcVisible] = useState(false);
  const [inputValue, setInputValue] = useState<{ [key: string]: string }>({});
  const [isInputError, setIsInputError] = useState<{ [key: string]: boolean }>(
    {}
  );

  let selectedEquation = equations.find(
    (eq) => eq.name.toLowerCase() === selectedParam
  );

  useEffect(() => {
    setInputValue(selectedEquation?.parameters!);
  }, [selectedEquation]);

  let items = useMemo(
    () =>
      equation
        .filter((eq) => eq.name.toLowerCase() !== selectedParam)
        .map((eq) => eq.name),
    [selectedParam]
  );

  let eq = useMemo(() => {
    return replaceVariables(
      inputValue,
      polynomialExpression.length > 0
        ? polynomialExpression
        : selectedEquation?.renderFormula!
    );
  }, [inputValue, selectedEquation, polynomialExpression]);

  const handleChangedExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdvancedExp(value);
  };

  const handleSubmit = () => {
    const keysWithEmptyValue = Object.keys(inputValue).filter(
      (key) => inputValue[key] === ""
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

    if (!isAdvancedCalcVisible) {
      if (eq) {
        getRoots({ equation: eq });
      }
    } else {
      if (advancedExp) {
        getRoots({ equation: advancedExp });
      }
    }

    setInputValue(selectedEquation?.parameters!);
  };

  const renderEquation = (degree: number) => {
    let expression = "";
    let newParameters: { [key: string]: string } = {};

    for (let i = degree; i >= 0; i--) {
      if (i === degree) {
        expression += `a_${i}x^${i}`;
      } else {
        if (i === 0) {
          expression += ` + a_${i}`;
        } else if (i === 1) {
          expression += ` + a_${i}x`;
        } else {
          expression += ` + a_${i}x^${i}`;
        }
      }
      newParameters[`a_${i}`] = "";
    }

    expression += ` = 0`;

    setPolynomialExpression(expression);

    updatePolynomialParameters(newParameters);
  };

  const updatePolynomialParameters = (newParameters: {
    [key: string]: string;
  }) => {
    const updatedEquation = equation.map((eq) =>
      eq.name === "polynomial" ? { ...eq, parameters: newParameters } : eq
    );

    setEquations(updatedEquation);
  };

  return (
    <>
      <div className="page_container">
        <div className="header_container">
          <div className="header_wrapper">
            <h2 className="title">Equation Solver</h2>
            <DropDown
              selectedParam={selectedParam}
              setSelectedParam={setSelectedParam}
              items={items}
              setInputValue={setInputValue}
              setPolynomialExpression={setPolynomialExpression}
            />
            <div
              style={{
                paddingTop: "1.25em",
                visibility:
                  selectedParam !== "polynomial" ? "hidden" : "visible",
              }}
            >
              <IncreaseDecreaseCount
                label={"Degree"}
                setCount={setVariables}
                setInputValue={setInputValue}
                maxCount={6}
                count={variables}
                handleRenderingEquation={renderEquation}
              />
            </div>
          </div>
          <div className="toggle_switch_wrapper">
            <ToggleSwtich
              label={"Advanced"}
              setToggle={setIsAdvancedCalcVisible}
            />
          </div>
        </div>
        <div className="equation_container">
          {isAdvancedCalcVisible ? (
            <BlockMath>{advancedExp}</BlockMath>
          ) : (
            <BlockMath>
              {eq ??
                (polynomialExpression.length > 0
                  ? polynomialExpression
                  : selectedEquation?.renderFormula!)}
            </BlockMath>
          )}
        </div>
        <div
          style={{
            flexDirection: isAdvancedCalcVisible ? "column" : "row",
            alignItems: isAdvancedCalcVisible ? "center" : "flex-start",
          }}
          className={styles.section}
        >
          {isAdvancedCalcVisible ? (
            <>
              <div>
                <input
                  id="advanced_input"
                  value={advancedExp}
                  onChange={handleChangedExp}
                  className={styles.input_advanced_exp}
                  type="text"
                />
              </div>
              <MathCalculator setAdvancedExp={setAdvancedExp} />
            </>
          ) : (
            <>
              <div className="input_wrapper">
                <h3 className="sub_title">Input:</h3>
                <div className="input_values_container">
                  {selectedEquation &&
                    Object.keys(selectedEquation?.parameters).map(
                      (variable, i) => (
                        <InputValues
                          key={i}
                          variable={variable}
                          inputValue={inputValue}
                          isInputError={isInputError}
                          setIsInputError={setIsInputError}
                          setInputValue={setInputValue}
                          setActiveInput={setActiveInput}
                        />
                      )
                    )}
                </div>
              </div>
              <div>
                <h3 style={{ textAlign: "right" }} className="sub_title">
                  Number Pad:
                </h3>
                <NumberPad
                  type={"equation"}
                  activeInput={activeInput}
                  selectedObject={selectedEquation?.parameters!}
                  setActiveInput={setActiveInput}
                  setInputValue={setInputValue}
                  setIsInputError={setIsInputError}
                />
              </div>
            </>
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
            onClick={() => {
              setInputValue({});
              setAdvancedExp("");
            }}
            className={`submit_button ${styles.submit_btn_modified}`}
          >
            Reset
          </button>
        </div>
        {isAdvancedCalcVisible && (
          <div className={styles.help_container}>
            <FaRegCircleQuestion
              onClick={() => setIsHelpVisible(true)}
              className={styles.help_icon}
            />
          </div>
        )}
        {isHelpVisible && (
          <div className={styles.help_section_wrapper}>
            <Help setIsHelpVisible={setIsHelpVisible} />
          </div>
        )}
      </div>
      <div ref={solutionContainerRef} className={styles.page_solution}>
        <h3 style={{ fontSize: "1.15rem" }} className="sub_title">
          Solution:
        </h3>
        <div className={styles.solution_wrapper}>
          <RenderEquationSolution />
        </div>
      </div>
    </>
  );
}
