import wordList from "./5-letter-words.txt?raw";

const VALID_WORDS = new Set(
  wordList.split("\n").map((w) => w.trim().toUpperCase()),
);

export function checkIsValidWord(word) {
  return VALID_WORDS.has(word.toUpperCase());
}
