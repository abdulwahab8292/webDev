function Increase({ setCount }) {
  return (
    <div>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="bg-blue-500 p-2 text-white border rounded-md hover:bg-blue-600"
      >
        Increase
      </button>
    </div>
  );
}
export default Increase;
