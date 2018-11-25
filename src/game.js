import Player from './player'
import Board from './board'

export default class Game {
  constructor() {
    this._playerX = new Player('X', 'x')
    this._playerO = new Player('O', 'o')
    this._board = new Board()
    this._currentPlayer = this.randomPlayerStart([this._playerX, this._playerO])
  }

  get board() {
    return this._board
  }

  get currentPlayer() {
    return this._currentPlayer
  }

  randomPlayerStart(players) {
    const random = () => Math.floor(Math.random() * 2)
    return players[random()]
  }

  switchTurns() {
    this._currentPlayer =
      this._currentPlayer === this._playerO ? this._playerX : this._playerO
  }

  gameOver() {
    return this.victory() || this.draw()
  }

  victory() {
    return this._board.winCombo(this._currentPlayer.marker)
  }

  draw() {
    return this._board.full()
  }
}
