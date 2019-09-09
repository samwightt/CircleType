import React from 'react'
import getRandomWord from './words'
import { Input } from './components/Input';
import { Circle } from './components/Circle'
import { ScoreDisplay } from './components/ScoreDisplay'
import { WordsDisplay } from './components/WordsDisplay'

// Values that can be accessed by all instances of the setInterval 'loop' below.
let currentScore = 0
let tickTime = 0
let currentSize = 0
let currentSetScore: React.Dispatch<React.SetStateAction<number>>
let currentSetSize: React.Dispatch<React.SetStateAction<number>>

/**
 * The root game component. Holds all state and all "game logic".
 * Probably needs to be using mobx or redux, but it's small enough so that it doesn't matter.
 */
const Game: React.FC = () => {
  const [score, setScore] = React.useState(0);
  const [size, setSize] = React.useState(0);
  const [combo, setCombo] = React.useState(0);
  // Makes sure we only have two words.
  const [currentWords, setNewWords] = React.useState<[string, string]>([getRandomWord(), getRandomWord()]);
  const [inputValue, setInputValue] = React.useState("")

  // Need values outside the scope of this function because of how clojures and useState work.
  currentScore = score
  currentSize = size
  currentSetScore = setScore
  currentSetSize = setSize

  // Using useMemo so that we only create one function that runs, no matter how many rerenders.
  React.useMemo(() => setInterval(() => {
    // Runs the games "ticks" after the user has been able to get used to the game.
    if (currentScore > 20 && currentSize > 0) {
      tickTime++
      currentSetSize(prev => prev - ((Math.pow(prev, 0.3) + (tickTime * 0.5) + (currentScore * 0.08))))
      currentSetScore(prev => prev + Math.floor(0.2 * currentSize))
    }
  }, 1000), [true])

  // Checks to make sure the input is equal to the current word, and advances if so.
  const checkInputCorrect = (value: string) => {
    if (value.toLowerCase() === currentWords[0].toLowerCase()) {
      setNewWords(prev => [prev[1], getRandomWord()]);
      setScore(prev => prev + 1 + Math.floor((0.17 * combo)))
      setSize(prev => prev * 0.5 + Math.pow(score + 1, 0.35) * (20 / (1 + (tickTime * 0.02))))
      setInputValue("")
    }
  }

  // Handles the form event. Wanted users to be able to press enter to type a word also.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = inputValue
    checkInputCorrect(value)
  }

  // Handles the input event. Has a few wonky checks to make sure that it handles spaces correctly.
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = e
    if (/\s$/.test(value)) {
      checkInputCorrect(value.substring(0, value.length - 1))
    }
    else {
      setInputValue(value)
      if (currentWords[0].search(inputValue.toLowerCase()) > -1) setCombo(prev => prev + 1)
      else setCombo(0)
    }
  }

  return <React.Fragment>
    <ScoreDisplay score={score} combo={combo} />
    {
      (score > 0 && size < 1) && <p>You finished!</p>
    }
    <WordsDisplay isRight={currentWords[0].search(inputValue.toLowerCase()) > -1}>{currentWords.join(" ")}</WordsDisplay>
    <form onSubmit={onSubmit}>
      <Input disabled={score > 0 && size < 1} onChange={onInputChange} value={inputValue} />
    </form>
    <Circle size={size} />
  </React.Fragment>
}

export default Game