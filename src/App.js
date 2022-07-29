import React from "react";
import "./App.css";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies,setTenzies]=React.useState(false)
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

  function allNewDice(maxLimit = 7) {
    const randomArray = [];
    for (let i = 0; i < 10; i++) {
      let rand = Math.random() * maxLimit;
      rand = Math.floor(rand); // 99
      let obj = { value: rand, isHeld: false, id: nanoid() };
      randomArray.push(obj);
    }
    return randomArray;
  }
  const diceElements = dice.map((die) => (
    <Die
      holdDice={() => holdDice(die.id)}
      key={die.id}
      isHeld={die.isHeld}
      value={die.value}
    />
  ));
  function rollDice() {
    setDice((dice) =>
      dice.map((obj) => {
        return obj.isHeld === true
          ? obj
          : {
              value: Math.floor(Math.random() * 7),
              isHeld: false,
              id: nanoid(),
            };
      })
    );
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((obj) => {
        return obj.id === id ? { ...obj, isHeld: !obj.isHeld } : obj;
      })
    );
  }
  let button=tenzies===true ? "New Game" : "Roll"

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>

      <div className="dice-container">{diceElements}</div>
      <button
        onClick={rollDice}
        class="bg-transparent mt-6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {button}
      </button>
    </main>
  );
}

export default App;
