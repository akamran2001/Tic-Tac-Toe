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
  colorBoard() {
    const board = document.getElementById("board");
    const rows = Array.from(board.rows);
    const colorMap = [
      ["red", "green", "blue"],
      ["green", "blue", "red"],
      ["blue", "red", "green"],
    ];
    rows.map((tr, i) => {
      const cols = Array.from(tr.cells);
      cols.map((cell, j) => {
        cell.className = colorMap[i][j];
        return null;
      });
      return null;
    });
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
    if (boardFull && !win) {
      this.setState({ player: "Tie" });
    }
    this.setState({ gameOver: win || boardFull });
  }
  play(cell) {
    const clicked = cell.getAttribute("clicked");
    if (clicked === "false" && this.state.gameOver !== true) {
      cell.setAttribute("clicked", "true");
      this.setState({
        squares: this.state.squares.map((item, index) => {
          return index === parseInt(cell.id) ? this.state.player : item;
        }),
      });
      this.gameUpdate();
      if (!this.state.gameOver) {
        this.setState({ player: this.state.player === "X" ? "O" : "X" });
      }
    }
  }
  cellAssign() {
    const cells = Array.from(document.getElementsByTagName("td"));
    cells.forEach((cell, index) => {
      cell.id = String(index);
      cell.setAttribute("clicked", "false");
      cell.addEventListener(
        "click",
        (e) => {
          this.play(e.target);
        },
        false
      );
    });
    return null;
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
  componentDidMount() {
    this.colorBoard();
    this.cellAssign();
  }
  render() {
    const end = (
      <div id="end">
        <h1>{this.gameOverMsg()}</h1>
        <button
          onClick={() => {
            window.location.reload();
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
            <tr>
              <td>
                <h1>{this.state.squares[0]}</h1>
              </td>
              <td>
                <h1>{this.state.squares[1]}</h1>
              </td>
              <td>
                <h1>{this.state.squares[2]}</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1>{this.state.squares[3]}</h1>
              </td>
              <td>
                <h1>{this.state.squares[4]}</h1>
              </td>
              <td>
                <h1>{this.state.squares[5]}</h1>
              </td>
            </tr>
            <tr>
              <td>
                <h1>{this.state.squares[6]}</h1>
              </td>
              <td>
                <h1>{this.state.squares[7]}</h1>
              </td>
              <td>
                <h1>{this.state.squares[8]}</h1>
              </td>
            </tr>
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
