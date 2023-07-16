import { useMatrixContext } from "@/context/MatrixContext";

const useGetResult = () => {
  const {
    setIsLoading,
    setIsError,
    setMatrixHistory,
    setLatexCalculatedResult,
    setEigenValueAndVector,
    setIsCalculationVisible,
    setMatrixEquation,
    setErrorMessage,
    exp,
  } = useMatrixContext();

  const getResult = async (data: {
    matrix: { [key: string]: [][] } | string[][];
    operation: string;
    expression: string;
  }) => {
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/matrix/${data.operation}`,
        options
      );
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        if (data.operation === "eigen") {
          setEigenValueAndVector((prev) => ({
            ...prev,
            [`Eigen value(${data.expression.split("(")[1].split(")")[0]})`]: {
              value: res.value,
              vector: res.vector,
            },
          }));
          setEigenValueAndVector((prev) => ({
            ...prev,
            [`Eigen vector(${data.expression.split("(")[1].split(")")[0]})`]: {
              value: res.value,
              vector: res.vector,
            },
          }));
        } else {
          setMatrixHistory((prev) => ({
            ...prev,
            [data.expression]: res.result,
          }));
        }
        setIsLoading(false);
      } else {
        const err = await response.json();
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(err.detail);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage((error as Error).message);
      setIsLoading(false);
    }
  };

  const getEquation = async (data: {
    matrixHistory: { [key: string]: string[][] };
    equation: string;
  }) => {
    setIsLoading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/matrix/equation`,
        options
      );
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        setIsCalculationVisible(true);
        setLatexCalculatedResult({
          equation: data.equation,
          result: res.latex,
        });
        setMatrixEquation(exp);
        setIsLoading(false);
      } else {
        const err = await response.json();
        setIsError(true);
        setIsLoading(false);
        setErrorMessage(err.detail);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { getResult, getEquation };
};

export default useGetResult;
