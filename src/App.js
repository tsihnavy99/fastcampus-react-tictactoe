import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [history, setHistory] = useState([ {squares: Array(9).fill(null)} ]);
  const [status, setStatus] = useState(false);
  const [stepNumber, setStepNumber] = useState(0)

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for(let line of lines) {
      const [a, b, c] = line;
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber+1);
    const newCurrent = newHistory[newHistory.length-1];
    const newSquares = newCurrent.squares.slice();

    if(calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = status?'O':'X';
    setHistory([...newHistory, { squares: newSquares }]);
    setStatus(prev=>!prev);

    setStepNumber(newHistory.length);
  }

  const moves = history.map((step, move) => {
    const desc = move ?
    'Go to move #' + move :
    'Go to game start';
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    )
  })

  const jumpTo = (step) => {
    setStepNumber(step);
    setStatus((step%2)!==0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares}
              onClick={(i)=>{handleClick(i)}}/>
      </div>
      <div className="status">{winner?`Winner: ${winner}`:`Next Player: ${status?'O':'X'}`}</div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
