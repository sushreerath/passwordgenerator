import { useState, useCallback,useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setpassword] = useState("");
  //ref hook
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmonpqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (character) str += "!@#%^&*()[]{}<>:?;'/.,|'`~";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberAllowed, character, setpassword ]);

  useEffect(()=>{
    passwordgenerator()},[length,numberAllowed,character,passwordgenerator])

    const copypasswordToClipboard=useCallback(()=> {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0,100)
      window.navigator.clipboard.writeText(password)
    },[password])
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-red-950 bg-blue-900">
        <h1 className="text-black text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copypasswordToClipboard}
            className="outline-none bg-red-500 text-black px-3 py-0.5"
            shrink-0
          >
            Copy
          </button>
        </div>
        <div className="flex flex-sm gap-x-2"></div>
        <div className="flex items-center gap-x-1 text-orange-300 ">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1 text-orange-300">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 text-orange-300">
          <input
            type="checkbox"
            defaultChecked={character}
            id="characterInput"
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
