function Decrease({ setCount }) {
  return (
    <div>
      <button
        onClick={() => setCount((c) => c - 1)}
        className="bg-blue-500 p-2 text-white border rounded-md hover:bg-blue-600"
      >
        Decrease
      </button>
    </div>
  );
}
export default Decrease;
