import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "X",
      squares: Array(9).fill(""),
      gameOver: false,
    };
  }
  gameUpdate() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let win = false;
    let boardFull =
      this.state.squares.filter((item) => {
        return item === "";
      }).length === 0;
    lines.find((indices) => {
      const [a, b, c] = indices;
      const line = [
        this.state.squares[a],
        this.state.squares[b],
        this.state.squares[c],
      ];
      win = line.every((item) => {
        return item === line[0] && line[0] !== "";
      });
      return win;
    });
    const switchPlayer = () => {
      if (!this.state.gameOver) {
        this.setState({ player: this.state.player === "X" ? "O" : "X" });
      }
    };
    if (boardFull && !win) {
      this.setState({ player: "Tie" }, switchPlayer);
    }
    this.setState({ gameOver: win || boardFull }, switchPlayer);
  }

  play(cell) {
    const clicked = cell.getAttribute("clicked");
    if (clicked === "false" && this.state.gameOver !== true) {
      cell.setAttribute("clicked", "true");
      this.setState(
        {
          squares: this.state.squares.map((item, index) => {
            return index === parseInt(cell.id) ? this.state.player : item;
          }),
        },
        this.gameUpdate
      );
    }
  }

  playAudio() {
    const audio = document.querySelector("audio");
    if (audio.paused) {
      audio.volume = 0.2;
      audio.play();
      document.getElementById("audio-msg").className = "invisible";
    } else {
      audio.pause();
      document.getElementById("audio-msg").className = "mono";
    }
  }
  gameOverMsg() {
    return this.state.player === "Tie"
      ? "Tie"
      : `Winner:  ${this.state.player}`;
  }
  rows_fill(start, end) {
    const colors = [
      "red",
      "green",
      "blue",
      "green",
      "blue",
      "red",
      "blue",
      "red",
      "green",
    ];
    return Array.from(Array(10).keys())
      .slice(start, end)
      .map((num) => {
        return (
          <td
            key={num}
            className={colors[num]}
            onClick={(e) => {
              this.play(e.target);
            }}
            clicked={this.state.squares[num] === "" ? "false" : "true"}
            id={String(num)}
          >
            <h1>{this.state.squares[num]}</h1>
          </td>
        );
      });
  }

  render() {
    const end = (
      <div id="end">
        <h1>{this.gameOverMsg()}</h1>
        <button
          onClick={() => {
            this.setState({
              player: "X",
              squares: Array(9).fill(""),
              gameOver: false,
            });
          }}
        >
          Play Again
        </button>
      </div>
    );
    return (
      <div className="App">
        <div onClick={this.playAudio}>
          <div className="header">
            <h1>Tic Tac Toe</h1>
            <p>
              <FontAwesomeIcon icon={faMusic} />
            </p>
          </div>
          <p id="audio-msg" className="mono">
            Click here to play music
          </p>
        </div>
        <table id="board">
          <tbody>
            <tr>{this.rows_fill(0, 3)}</tr>
            <tr>{this.rows_fill(3, 6)}</tr>
            <tr>{this.rows_fill(6, 9)}</tr>
          </tbody>
        </table>
        {this.state.gameOver ? end : ""}
        <h3 className="mono">
          Made by{" "}
          <a href="https://github.com/akamran2001/Tic-Tac-Toe">Ahmed Kamran</a>
        </h3>
      </div>
    );
  }
}
