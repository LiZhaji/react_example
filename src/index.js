// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import "./App.css";

// class Square extends React.Component {
//   // constructor(props){
//   //   super(props)
//   //   this.state = {
//   //     value: 1
//   //   }
//   // }

//   render() {
//     return (
//       <button className="square" onClick={()=> {this.props.oonClick(this.props.value)}}>
//         {this.props.value}
//       </button>
//     );
//   }
// }


function Square(props) {
  const [state, setState] = useState(12)
  console.log(state, setState, useEffect);
  

  return  <button className="square" onClick={()=>props.oonClick()}>
      {props.value}
    </button> ;
}

class Board extends React.Component {
  
  renderSquare(i) {
    return (
      <Square value={this.props.square[i]} oonClick={()=> this.props.ooonClick(i)} />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
      history: [
        {
          square: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      value: 'aaa'
    };
  }

  handleClick(i) {
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.square.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    history.push({square: squares})
    this.setState({
      history: history,
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length - 1
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleChange(e){
    console.log(this,111);
    this.setState({value: e.target.value})
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.square);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
      
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            square={current.square}
          ooonClick={(i)=> this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <input value={this.state.value} onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

