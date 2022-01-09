# Simple Tic-Tac-Toe game using React.Js
### Notes on setState
- setState() is asynchronous so if you need something to happen immediately after a state is set put it as a call back function
  - In this example I want gameUpdate to execute only after the state of the squares have changed so I make it a call back function
    - ``` javascript
        play(cell) {
                ...
                this.setState({squares: ..., this.gameUpdate);
            }
        }
      ```
  - In this example I want to switch players only after the gameOver state has been set. switchPlayer also does a state change however there is no function that I need to execute immediately after
    - ``` javascript
        gameUpdate() {
            ...
            const switchPlayer = () => {
                if (!this.state.gameOver) {
                    this.setState({
                        player: this.state.player === "X" ? "O" : "X"
                    });
                }
            };
            if (boardFull && !win) {
                this.setState({
                    player: "Tie"
                }, switchPlayer);
            }
            this.setState({gameOver: win || boardFull}, switchPlayer)
          }
        ```
- The state is always up to date by the time the JSX renders. This is because when state changes, the component responds by re-rendering.