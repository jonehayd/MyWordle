const ROWS = 6;
const COLS = 5;

export default function Grid({ guesses, currentGuess, shaking }) {
  const rows = Array.from({ length: ROWS }, (_, i) => {
    if (i < guesses.length) {
      // Completed guess row
      return Array.from({ length: COLS }, (_, j) => guesses[i][j] ?? "");
    }
    if (i === guesses.length) {
      // Active row being typed
      return Array.from({ length: COLS }, (_, j) => currentGuess[j] ?? "");
    }
    // Empty future rows
    return Array(COLS).fill("");
  });

  return (
    <div className="grid">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={`grid-row ${rowIndex === guesses.length && shaking ? "shake" : ""}`}
        >
          {row.map((cell, colIndex) => {
            const letter = cell?.letter ?? cell;
            return (
              <div
                key={`${colIndex}-${letter}`}
                className={`grid-item ${cell?.state ?? ""} ${letter ? "filled" : ""}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
