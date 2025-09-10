import { useState } from "react";
import axios from "axios";

const Sum = () => {
  const [firstNumber, setFirstNumber] = useState(null);
  const [secondNumber, setSecondNumber] = useState(null);
  const [result, setResult] = useState(null);

  const handleSum = async () => {
    try {
      // Send a POST request to your Express backend
      const response = await axios.post("http://localhost:5000/sum", {
        firstNumber,
        secondNumber,
      });
      setResult(response.data.sum); // Assuming backend sends back a 'sum' property
    } catch (error) {
      console.error("Error calculating sum:", error);
    }
  };

  return (
    <div className="border border-slate-800 mt-4 mx-auto my-auto bg-white p-9 w-[600px] rounded-md">
      <h1 className="text-center text-3xl font-semibold">Sum Calculator</h1>
      <div>
        <label htmlFor="firstNo">First Number:</label>
        <input
          type="number"
          placeholder="Enter first number"
          className="border border-black-100 w-full rounded-sm mb-4"
          id="firstNo"
          value={firstNumber}
          onChange={(e) => setFirstNumber(Number(e.target.value))}
        />
      </div>
      <div>
        <label htmlFor="secondNo">Second Number:</label>
        <input
          type="number"
          placeholder="Enter second number"
          id="secondNo"
          className="border border-black-100 w-full rounded-sm mb-4"
          value={secondNumber}
          onChange={(e) => setSecondNumber(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={handleSum}
          className="border bg-blue-600 mt-2 px-3 py-1 rounded-md w-full text-white hover:bg-blue-400"
        >
          Sum
        </button>
      </div>
      {result !== null && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">Result: {result}</h2>
        </div>
      )}
    </div>
  );
};

export default Sum;
