import React, { useState } from "react";
import "../App.css";

const Game = () => {
  const [random, setRandom] = useState(Math.floor(Math.random() * 101));
  const [alertMsg, setAlertMsg] = useState("");
  const [count, setCount] = useState(10);
  const [numbers, setNumbers] = useState([]);
  const [gameNumber, setGameNumber] = useState({
    // id: new Date().getTime(),
    gameNumber: 0,
  });
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    setGameNumber("");
    e.preventDefault();
    if (gameNumber !== "") {
      if (gameNumber % 1 !== 0 || gameNumber > 100 || gameNumber < 1) {
        return setAlertMsg(
          <div className="bg-info" style={{ color: "red" }}>
            The number must be an integrer between 1 and 100 !
          </div>
        );
      } else if (gameNumber == random && count >= 0) {
        // setNumbers([...numbers, gameNumber]);
        setNumbers([...numbers].concat(gameNumber));
        setCount(count - 1);
        setDisabled(!disabled);
        setShow(!show);
        return setAlertMsg(
          <div className="bg-success">Congratulations! You got it right!</div>
        );
      } else if (
        gameNumber != random &&
        count < 2 &&
        !numbers.includes(gameNumber)
      ) {
        //setNumbers([...numbers, gameNumber])
        setNumbers([...numbers].concat(gameNumber));
        setCount(count - 1);
        setDisabled(!disabled);
        setShow(!show);
        return setAlertMsg(<div className="bg-warning">GAME OVER</div>);
      } else if (numbers.includes(gameNumber)) {
        return setAlertMsg(
          <div className="bg-info" style={{ color: "red" }}>
            You have already entered this number! Try again!
          </div>
        );
      } else if (gameNumber < random && count > 0) {
        // setNumbers([...numbers, gameNumber]);
        setNumbers([...numbers].concat(gameNumber));
        setCount(count - 1);
        return setAlertMsg(
          <div className="bg-info">UPS! The last quess was too low!</div>
        );
      } else if (gameNumber > random && count > 0) {
        //setNumbers([...numbers, gameNumber]);
        setNumbers([...numbers].concat(gameNumber));
        setCount(count - 1);
        return setAlertMsg(
          <div className="bg-danger">UPS! The last guess was too high!</div>
        );
      }
    }
  };

  const clear = (e) => {
    setGameNumber("");
    e.preventDefault();
  };

  //<p> Radnom br: {random} </p>
  return (
    <div className="form">
      <p style={{ color: "black" }}>Enter a number:</p>
      <header>
        <form>
          <input
            min={1}
            max="100"
            disabled={disabled}
            type="number"
            name="number"
            value={gameNumber}
            onChange={(e) => setGameNumber(e.target.value)}
          ></input>

          <button
            type="submit"
            disabled={disabled}
            onClick={(e) => handleSubmit(e)}
          >
            Submit Number
          </button>

          <button onClick={(e) => clear(e)} disabled={disabled}>
            Clear
          </button>

          <button
            onClick={() => {
              setGameNumber("");
              setRandom(random);
            }}
            disabled={disabled}
          >
            Reset
          </button>

          <div className="count">
            <div>Remaining attempts: {count}</div>
          </div>

          <div>
            {count <= 9 && (
              <div style={{ color: "black" }} className="guess">
                Previous guesses:
                {numbers.map((gameNumber) => {
                  return (
                    <span key={gameNumber}>
                      <span> {gameNumber}, </span>
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div>{alertMsg}</div>
          {show ? (
            <button
              show="true" /* show={show} */
              onClick={() => setRandom(random)}
            >
              Start new game
            </button>
          ) : null}
        </form>
      </header>
    </div>
  );
};

export default Game;
