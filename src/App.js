import React from "react";
import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "x",
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
  play(cell, player) {
    const clicked = cell.getAttribute("clicked");
    if (clicked === "false") {
      cell.setAttribute("clicked", "true");
      cell.innerHTML = `<h1>${player}</h1>`;
      const next = player === "x" ? "o" : "x";
      this.setState({ player: next });
    }
  }
  cellAssign(player) {
    const cells = Array.from(document.getElementsByTagName("td"));
    cells.map((cell, index) => {
      cell.id = String(index);
      cell.setAttribute("clicked", "false");
      cell.addEventListener("click", (e) => {
        this.play(e.target, player);
      });
    });
    return null;
  }
  componentDidMount() {
    this.colorBoard();
    this.cellAssign(this.state.player);
  }
  componentDidUpdate() {
    this.cellAssign(this.state.player);
  }
  render() {
    return (
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <table id="board">
          <tbody>
            <tr>
              <td className="cell"></td>
              <td className="cell"></td>
              <td className="cell"></td>
            </tr>
            <tr>
              <td className="cell"></td>
              <td className="cell"></td>
              <td className="cell"></td>
            </tr>
            <tr>
              <td className="cell"></td>
              <td className="cell"></td>
              <td className="cell"></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
