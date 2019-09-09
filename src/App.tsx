import React from 'react';
import Game from './Game'
import styled from 'styled-components'

const RootStyles = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  color: #1f1f1f;
  padding: 30px;
`

/**
 * A REALLY hacky game that I made in a few hours. This just takes care of some root styles so that I
 * don't have to redo them later down in the tree.
 */
const App: React.FC = () => {
  return (
    <RootStyles>
      <h1>Circle Type</h1>
      <p>Type the words to display a circle. The size of the circle grows the higher your score is.
        Grow your score by typing more words, having a high combo, and staying in the game longer.
      </p>
      <Game />
    </RootStyles>
  );
}

export default App;
