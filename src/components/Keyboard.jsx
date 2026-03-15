import { FaBackspace } from "react-icons/fa";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
];

export default function Keyboard({
  guesses,
  addLetter,
  removeLetter,
  submitGuess,
}) {
  const letterStates = guesses.reduce((acc, guess) => {
    guess.forEach(({ letter, state }) => {
      if (acc[letter] === "correct") return;
      acc[letter] = state;
    });
    return acc;
  }, {});

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const state = letterStates[key];
            return (
              <button
                key={key}
                className={`key ${state ?? ""} ${key === "Back" || key === "Enter" ? "special" : ""}`}
                onClick={() => {
                  if (key === "Back") removeLetter();
                  else if (key === "Enter") submitGuess();
                  else addLetter(key);
                }}
              >
                {key === "Back" ? <FaBackspace /> : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
