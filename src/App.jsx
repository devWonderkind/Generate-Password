import { useCallback, useEffect, useRef, useState } from "react";

// import "./App.css";
import "./index.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const paaswordRef = useRef(null)

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

  const copyPassword = useCallback(()=> {
    paaswordRef.current?.select();
    paaswordRef.current?.setSelectionRange(0,15);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  },
  [length, numberAllowed, characterAllowed, setpassword, passwordGenerator])
  
  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md px-4 my-8 bg-gray-800 rounded-lg text-orange-500">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 p-4">
          <input 
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={paaswordRef}
          />
          <button 
          onClick={copyPassword}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" title="Copy">COPY</button>
          </div>
          <div className="flex text-sm gap-x-2">
              <div className="flex items-center gap-x-1">
                <input type="range"
                min={6}
                max={15}
                value={length}
                className="cursor-pointer"
                name="" id=""
                onChange={(e) =>{setLength(e.target.value)}}
                />
                <label className="text-sm" htmlFor="">Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input 
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>{
                  setNumberAllowed((prev) => !prev);
                }}
                />
                <label className="text-sm" htmlFor="numberInut">Number</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input 
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                onChange={()=>{
                  setCharacterAllowed((prev) => !prev);
                }}
                />
                <label className="text-sm" htmlFor="characterInput">Characters</label>
              </div>
          </div>
        
      </div>
    </>
  );
}

export default App;
