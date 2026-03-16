import { useState, useEffect } from "react";
import "./App.css";
import getRandomWord from "./words";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import { checkIsValidWord } from "./validWords";

const words = [];

function App() {
  const [currentGuess, setCurrentGuess] = useState("");

  // guess { letter, state: "absent" | "correct" | "present" }
  const [guesses, setGuesses] = useState([]);

  // The word to be guessed
  const [word, setWord] = useState(getRandomWord());

  // "playing" | "won" | "lost"
  const [status, setStatus] = useState("playing");

  const [invalidGuess, setInvalidGuess] = useState(false);
  const [shaking, setShaking] = useState(false);

  function addLetter(key) {
    if (status !== "playing") return;
    setCurrentGuess((prev) => (prev.length < 5 ? prev + key : prev));
  }

  function removeLetter() {
    if (status !== "playing" || currentGuess.length <= 0) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
    setInvalidGuess(false);
  }

  function evaluateGuess(guess, word) {
    return guess.split("").map((letter, i) => {
      if (letter === word[i]) return { letter, state: "correct" };
      if (word.includes(letter)) return { letter, state: "present" };
      return { letter, state: "absent" };
    });
  }

  function initGame() {
    setCurrentGuess("");
    setGuesses([]);
    setWord(getRandomWord());
    setStatus("playing");
  }

  function submitGuess() {
    if (status !== "playing" || currentGuess.length < 5 || guesses.length > 6)
      return;
    if (!checkIsValidWord(currentGuess)) {
      setInvalidGuess(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      return;
    }
    const result = evaluateGuess(currentGuess, word);
    setGuesses([...guesses, result]);
    setCurrentGuess("");

    if (currentGuess === word) {
      winGame();
    } else if (guesses.length + 1 >= 6) {
      loseGame();
    }
  }

  function winGame() {
    setStatus("won");
  }

  function loseGame() {
    setStatus("lost");
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Backspace") {
        removeLetter();
      } else if (e.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
        addLetter(e.key.toUpperCase());
      } else if (e.key === "Enter") {
        submitGuess();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentGuess, guesses]);

  return (
    <>
      <h1 className="title">Wordle</h1>
      <div style={{ position: "relative" }}>
        <Grid guesses={guesses} currentGuess={currentGuess} shaking={shaking} />
        {invalidGuess && (
          <p className="valid-word-warning">That is not a valid word!</p>
        )}
      </div>
      <Keyboard
        guesses={guesses}
        addLetter={addLetter}
        removeLetter={removeLetter}
        submitGuess={submitGuess}
      />
      {status !== "playing" && (
        <Modal status={status} word={word} onPlayAgain={initGame} />
      )}
    </>
  );
}

export default App;
