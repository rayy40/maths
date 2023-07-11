import { useGlobalContext } from "@/context/store";

const useGetResult = () => {
  const { setIsLoading, setIsError, setMatrixHistory } = useGlobalContext();

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
        setMatrixHistory((prev) => ({
          ...prev,
          [data.expression]: [...res.result],
        }));
        setIsLoading(false);
      } else {
        console.log("Error:", response.status);
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return { getResult };
};

export default useGetResult;
