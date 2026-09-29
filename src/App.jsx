import { useState } from "react";
import { SERVICES } from "./config/apiConfig";
import { calculate } from "./services/calculatorApi";

// Keep only an optional leading minus and digits (backend accepts whole numbers).
const cleanInput = (v) => v.replace(/(?!^-)[^0-9]/g, "");

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOperation = async (key) => {
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const value = await calculate(key, num1, num2);
      setResult(`${num1} ${SERVICES[key].symbol} ${num2} = ${value}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-6">Calculator</h1>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            value={num1}
            onChange={(e) => setNum1(cleanInput(e.target.value))}
            inputMode="numeric"
            placeholder="Number 1"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xl font-mono focus:outline-none focus:border-cyan-400"
          />
          <input
            value={num2}
            onChange={(e) => setNum2(cleanInput(e.target.value))}
            inputMode="numeric"
            placeholder="Number 2"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-xl font-mono focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {Object.entries(SERVICES).map(([key, svc]) => (
            <button
              key={key}
              onClick={() => handleOperation(key)}
              disabled={loading}
              title={`${svc.name} (port ${svc.port})`}
              className="py-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-2xl font-bold transition-colors disabled:opacity-50"
            >
              {svc.symbol}
            </button>
          ))}
        </div>

        <div className="min-h-16 flex items-center justify-center rounded-xl bg-slate-950 border border-white/10 px-4 py-3 text-center mb-4">
          {loading ? (
            <span className="text-slate-400">Calculating...</span>
          ) : error ? (
            <span className="text-rose-400 text-sm">{error}</span>
          ) : result ? (
            <span className="text-2xl font-mono font-bold break-all">{result}</span>
          ) : (
            <span className="text-slate-500">Result will appear here</span>
          )}
        </div>

        <button
          onClick={handleClear}
          className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
