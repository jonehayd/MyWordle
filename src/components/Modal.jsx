export default function Modal({ status, word, onPlayAgain }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{status === "won" ? "You won!" : "You lost!"}</h2>
        <p>
          The word was <strong>{word}</strong>
        </p>
        <button onClick={onPlayAgain}>Play Again</button>
      </div>
    </div>
  );
}
