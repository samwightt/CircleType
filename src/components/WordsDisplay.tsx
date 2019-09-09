import styled from 'styled-components'

interface WordsDisplayProps {
  isRight: boolean
}

const WordsDisplay = styled.h2`
  background-color: ${(props: WordsDisplayProps) => props.isRight ? "white" : "red"};
  display: inline-block;
`

export { WordsDisplay }