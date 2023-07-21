import React from "react";
import { InlineMath } from "react-katex";

type Props = {
  variable: string;
  isInputError: { [key: string]: boolean };
  inputValue: { [key: string]: string };
  setActiveInput: React.Dispatch<React.SetStateAction<string>>;
  setIsInputError: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
  setInputValue: React.Dispatch<
    React.SetStateAction<{ [key: string]: string }>
  >;
};

export default function InputValues({
  variable,
  inputValue,
  isInputError,
  setActiveInput,
  setIsInputError,
  setInputValue,
}: Props) {
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

  return (
    <div className="input_values_wrapper">
      <h2
        className={`expression ${
          isInputError?.[variable] && "expression_error"
        }`}
      >
        <InlineMath math={variable} />
      </h2>
      <input
        id={variable}
        autoComplete={"off"}
        onClick={() => setActiveInput(variable)}
        onChange={(e) => handleInputChange(e, variable)}
        value={inputValue?.[variable] ?? ""}
        className={isInputError?.[variable] ? "input_error" : ""}
        type="text"
        placeholder="Enter value"
      />
    </div>
  );
}
