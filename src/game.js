import Player from './player'
import Board from './board'

export default class Game {
  constructor() {
    this._playerX = new Player('X', 'x')
    this._playerO = new Player('O', 'o')
    this._board = new Board()
    this._currentPlayer = this.randomPlayerStart([this._playerX, this._playerO])
  }

  randomPlayerStart(players) {
    const random = () => Math.floor(Math.random() * 2)
    return players[random()]
  }

  start() {
    while (!this.gameOver()) {
      let playerInput = parseInt(alert('Cell to place marker: '))
      this._board.addMarker(playerInput, this._currentPlayer.marker)
      this.switchTurns()
    }
  }

  switchTurns() {
    this._currentPlayer == this._playerO ? this._playerX : this._playerO
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
