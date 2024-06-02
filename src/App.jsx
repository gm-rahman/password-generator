import { useState, useMemo, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [symAllowed, setSymAllowed] = useState(false);
  const copyInputRef = useRef(null);

  const password = useMemo(() => {
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let characters = letters;
    if (numAllowed) characters += numbers;
    if (symAllowed) characters += symbols;

    let genPass = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      genPass += characters[randomIndex];
    }
    return genPass;
  }, [length, numAllowed, symAllowed]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    copyInputRef.current.select();
  };

  return (
    <div className="bg-dark-subtle" style={{ height: "100vh" }}>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-5 m-5 bg-dark">
          <div className="text-center">
            <h1 className="mb-4 text-white">Password Generator</h1>
            <div className="input-group mb-4">
              <input
                ref={copyInputRef}
                type="text"
                className="form-control"
                placeholder="Generated Password"
                value={password}
                readOnly
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>

            <div className="flex-container mb-2 text-white">
              <input
                type="range"
                className="custom-range flex-item"
                id="passwordLength"
                max="20"
                min="6"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label className="me-2">Length: {length}</label>
              <div className="form-check flex-item">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="includeNumbers"
                  checked={numAllowed}
                  onChange={(e) => setNumAllowed(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="includeNumbers">
                  Numbers
                </label>
              </div>
              <div className="form-check flex-item">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="includeSymbols"
                  checked={symAllowed}
                  onChange={(e) => setSymAllowed(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="includeSymbols">
                  Symbols
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
