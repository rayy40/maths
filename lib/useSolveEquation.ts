import { useEquationSolverContext } from "@/context/EquationSolverContext";
import { useApiContext } from "@/context/MatrixContext";

const useSolveEquation = () => {
  const { setIsError, setIsLoading, setErrorMessage } = useApiContext();
  const { setReults, setSimultaneousResult } = useEquationSolverContext();

  const getRoots = async (data: { equation: string }) => {
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
        `${process.env.NEXT_PUBLIC_URL}/api/roots/equation-solver`,
        options
      );
      if (response.ok) {
        const res = await response.json();
        setReults({ roots: res.roots, factors: res.factors });
        setIsLoading(false);
        setIsError(false);
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

  const getSimultaneousRoots = async (data: {
    equation: { [key: string]: string };
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
        `${process.env.NEXT_PUBLIC_URL}/api/roots/simultaneous-equation`,
        options
      );
      if (response.ok) {
        const res = await response.json();
        setSimultaneousResult(res.result);
        setIsLoading(false);
        setIsError(false);
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

  return { getRoots, getSimultaneousRoots };
};

export default useSolveEquation;
