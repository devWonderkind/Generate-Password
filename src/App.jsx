import { useCallback, useEffect, useRef, useState } from "react";

// import "./App.css";
import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const paaswordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+";
    }
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setpassword(pass);
  }, [length, numberAllowed, characterAllowed, setpassword]);

  const copyPassword = useCallback(() => {
    paaswordRef.current?.select();
    paaswordRef.current?.setSelectionRange(0, 15);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, setpassword, passwordGenerator]);

  return (
    <>
      <h1 className="text-5xl text-orange-500 mt-6 text-center ">
        Generate Password
      </h1>
      <div className="w-full max-w-md mx-auto shadow-md p-6 my-8 bg-gray-800 rounded-lg text-orange-500">
        <div className="flex flex-col sm:flex-row items-center shadow rounded-lg overflow-hidden mb-4 p-4 space-y-4 sm:space-y-0">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-900 text-white rounded-lg"
            placeholder="Password"
            readOnly
            ref={paaswordRef}
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0 mt-2 sm:mt-0 sm:ml-4 rounded-lg"
            title="Copy"
          >
            COPY
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 sm:gap-y-0 text-sm">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={15}
              value={length}
              className="cursor-pointer w-full sm:w-auto"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-sm" htmlFor="">
              Length: {length}
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="text-sm" htmlFor="numberInput">
              Number
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label className="text-sm" htmlFor="characterInput">
              Characters
            </label>
          </div>
        </div>
      </div>

      <footer className="text-center py-4 text-white mt-72">
        <p className="text-lg">
          Made by <span className="text-orange-500">Aakanksha</span> with{" "}
          <span className="text-orange-500">&#10084;</span>
        </p>
      </footer>
    </>
  );
}

export default App;
