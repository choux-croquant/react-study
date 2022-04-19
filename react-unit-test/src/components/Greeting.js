import { useState } from "react";
import Output from "./Output";

const Greeting = () => {
  const [changedText, setChangedText] = useState(false);

  const changeTextHandler = () => {
    setChangedText(true)
  }

  return (
    <div>
      <h2>Greeting!</h2>
      {!changedText && <Output>Let`s learn react unit test - 1</Output>}
      {changedText && <Output>Let`s learn react unit test - 2</Output>}
      <button onClick={changeTextHandler}>Change Text!</button>
    </div>
  )
}

export default Greeting;