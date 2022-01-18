import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { random, range, uniq, without } from "lodash";
import React from "react";
import "./App.css";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: [true, false][random(0, 1, false)], //true = X, false = O
      player: "",
      squares: Array(9).fill(""),
      gameOver: false,
      win_line: [],
      audio_play: false,
      points: {
        X: 0,
        O: 0,
      },
    };
    this.audio = new Audio("https://mp3.chillhop.com/serve.php/?mp3=9272");
    this.audio.loop = true;
  }
  /**
   * Update the state of the game after every input
   */
  gameUpdate = () => {
    /**
     * Cells which indicate a vertical, horizontal, or diagonal line
     */
    const lines = [range(0, 9, 4), range(2, 8, 2)];
    [0, 3, 6].forEach((num) => lines.push(range(num, num + 3)));
    [0, 1, 2].forEach((num) => lines.push(range(num, 9, 3)));
    /**
     * Board is full when none of the 9 squares are ""
     */

    const boardFull = without(this.state.squares, "").length === 9;
    /**
     *  A player has won if they get the same character to fill an entire line
     */
    const winner = lines.find((indices) => {
      const [a, b, c] = indices;
      const line = [
        this.state.squares[a],
        this.state.squares[b],
        this.state.squares[c],
      ];
      const noDup = uniq(line);
      return noDup.length === 1 && noDup[0] !== "";
    });
    const win = winner !== undefined;
    /**
     * The winning player is "Tie" if the board is full and no one has won
     * Game end when someone has won or the board is full
     * The next player gets picked as the opposite player if the game isn't over yet
     */
    this.setState(
      {
        player: boardFull && !win ? "Tie" : this.state.player,
        gameOver: win || boardFull,
        win_line: win ? winner : this.state.win_line,
      },
      () => {
        if (!this.state.gameOver) {
          this.setState({ player: this.state.player === "X" ? "O" : "X" }); //Only switch player after state of game set
        } else {
          this.updatePoint();
        }
      }
    );
  };
  /**
   * Handle the user clicking on a cell to input their move
   * @param  {"event"} e The onClick event
   */
  play = (e) => {
    const cell = e.target;
    const cell_id = parseInt(cell.id);
    const clicked = cell.getAttribute("clicked");
    if (clicked === "false" && this.state.gameOver !== true) {
      cell.setAttribute("clicked", "true");
      this.setState(
        {
          squares: this.state.squares
            .slice(0, cell_id)
            .concat(this.state.player) //Replace selected cell with player character
            .concat(this.state.squares.slice(cell_id + 1)),
        },
        this.gameUpdate
      );
    }
  };
  /**
   * Create the table data for the board
   * @param  {int} start - Cell # to start from
   * @param  {int} end - Cell # to end (exclusive)
   * @returns JSX elements of specified cell numbers
   */
  rows_fill = (start, end) => {
    const colors = [
      "green",
      "red",
      "red",
      "blue",
      "green",
      "red",
      "blue",
      "blue",
      "green",
    ];
    return range(start, end).map((num) => {
      return (
        <td
          key={num}
          className={this.state.win_line.includes(num) ? "win" : colors[num]}
          onClick={this.play}
          clicked={this.state.squares[num] === "" ? "false" : "true"}
          id={String(num)}
        >
          <h1>{this.state.squares[num]}</h1>
        </td>
      );
    });
  };
  /**
   * Play and pause background music
   */
  playAudio = () => {
    if (this.audio.paused) {
      this.audio.volume = 0.2;
      this.audio.play();
      this.setState({ audio_play: true });
    } else {
      this.audio.pause();
      this.setState({ audio_play: false });
    }
  };
  newGame = () => {
    this.setState({
      player: !this.state.first ? "X" : "O",
      first: !this.state.first,
      squares: Array(9).fill(""),
      gameOver: false,
      win_line: [],
    });
  };
  updatePoint = () => {
    this.setState({
      points: {
        X:
          this.state.player == "X"
            ? this.state.points.X + 1
            : this.state.points.X,
        O:
          this.state.player == "O"
            ? this.state.points.O + 1
            : this.state.points.O,
      },
    });
  };
  componentDidMount = () => {
    this.setState({ player: this.state.first ? "X" : "O" });
  };
  render = () => {
    const gameOverMsg =
      this.state.player === "Tie" ? "Tie" : `Winner:  ${this.state.player}`;
    const end = (
      <div id="end">
        <h1>{gameOverMsg}</h1>
        <button onClick={this.newGame}>Play Again</button>
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
          <p
            id="audio-msg"
            className={this.state.audio_play ? "invisible" : "mono"}
          >
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
        <div id="bottom" className="gc">
          <div id="x-point" className="gi">
            <h1>Player-X: {this.state.points.X}</h1>
          </div>
          <div id="player" className="gi">
            {this.state.gameOver ? end : <h1>Current: {this.state.player}</h1>}
          </div>
          <div id="o-point" className="gi">
            <h1>Player-O: {this.state.points.O}</h1>
          </div>
        </div>
        <h3 className="mono">
          Made by
          <a
            href="https://github.com/akamran2001/Tic-Tac-Toe"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" Ahmed Kamran "}
          </a>
          {"Music: "}
          <a
            href="https://chll.to/0ac21dd1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Aiguille - Day and Night
          </a>
        </h3>
      </div>
    );
  };
}
