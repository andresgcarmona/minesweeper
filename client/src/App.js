import styled from '@emotion/styled'
import Config from './components/Config'
import Board from './components/Board'

const Container = styled.div`
  padding: 2rem;
  background-color: white;
  font-size: 1rem;
`

function App () {
  return (
    <Container>
      <Config/>
      
      <div className="App">
        <h1 className="font-semibold text-4xl mb-4">Minesweeper</h1>
        
        <Board />
      </div>
    </Container>
  )
}

export default App
