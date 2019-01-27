import React from 'react';
import './Game.css';

const CELL_SIZE = 40,
    WIDTH = 800, 
    HEIGHT = 600;

class Game extends React.Component {
    constructor() {
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;
        this.board = this.makeBoard();
    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
    }

    makeBoard() {
        // Create a new array of length this.rows
        // For each index in this array, map an array of length this.cols where each value is set to a random bool
        return Array.from(Array(this.rows), _ => Array.from(Array(this.cols), _ => this.getRandomBool()));
    }

    getRandomBool() {
        // Generate "random" number 1-3
        // If the floor of (random number / 2) === 1, return true
        // Else return false
        return Math.floor(Math.floor(Math.random()*3)/2) === 1;
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for ( let x = 0; x < this.cols; x++) {
                if(this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    getElementOffSet() {
        const rect = this.boardRef.getBoundingClientRect(),
            doc = document.documentElement;

            return {
                x: (rect.left + window.pageXOffset) - doc.clientLeft,
                y: (rect.top + window.pageYOffset) - doc.clientTop,
            };
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffSet(),
            offsetX = event.clientX - elemOffset.x,
            offsetY = event.clientY - elemOffset.y,
            x = Math.floor(offsetX / CELL_SIZE),
            y = Math.floor(offsetY / CELL_SIZE);

            if(x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
                this.board[y][x] = !this.board[y][x];
            }

            this.setState({ cells: this.makeCells() });
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame =  () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value});
    }

    runIteration() {
        let newBoard = this.makeBoard();

        for (let y = 0; y < this.rows; y++) {
            for ( let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(x, y);
                if (this.board[y][x] === true) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        if (!this.board[y][x] && neighbors === 3) {
                            newBoard[y][x] = true;
                        }
                    }
                } else {
                    if (neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

    calculateNeighbors(currentCell) {
        let neighbors = 0;

        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

        for (let i = 0; i < dirs.length; i++) {
            let x1 = dirs[i][0],
                y1 = dirs[i][1];

            if (this.state.cells.find(cell => cell.y === currentCell.y + y1 && cell.x === currentCell.x + x1)) {
                neighbors++;
            }
        }

        return neighbors;
    }

    render() {
        const { cells } = this.state;
        return (
            <div>
                <div className="board" 
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}
                >
                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`} />
                    ))}
                </div>
                <div className="controls">
                    Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                </div>
                {this.state.isRunning ?
                    <button className="button" onClick={this.stopGame}>Stop</button>
                :
                    <button className="button" onClick={this.runGame}>Run</button>
                }
            </div>
        );
    }
}

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return (
            <div className="cell"
                style={{
                    left: `${CELL_SIZE * x + 1}px`,
                    top: `${CELL_SIZE * y + 1}px`,
                    width: `${CELL_SIZE - 1}px`,
                    height: `${CELL_SIZE - 1}px`,
                }} />
        );
    }
}

export default Game;