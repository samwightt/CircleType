import React from 'react'
import styled from 'styled-components'

const ScoreHolder = styled.div`
  padding: 20px;
  border: 1px solid grey;
  border-radius: 5px;
  max-width: 300px;
`

interface ScoreDisplayProps {
  score: number
  combo: number
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = (props) => {
  return <ScoreHolder>
    <h1>Your score: {props.score}</h1>
    <h1>Your combo: {props.combo}</h1>
  </ScoreHolder>
}

export { ScoreDisplay }