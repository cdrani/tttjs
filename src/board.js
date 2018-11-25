import chunk from 'arr-chunk'
import transpose from 'flip-array'

export default class Board {
  constructor(board = null) {
    this._board = board || Array(9).fill('')
  }

  get state() {
    return this._board
  }

  reset() {
    this._board = Array(9).fill('')
  }

  cellAvailable(cell) {
    return this._board[cell] === ''
  }

  addMarker(cell, marker) {
    if (this.cellAvailable(cell)) {
      this._board[cell] = marker
      return true
    } else return false
  }

  availableCells() {
    return this._board.filter(cell => cell === '')
  }

  full() {
    return this._board.every(cell => cell !== '')
  }

  winCombo(marker) {
    const rows = chunk(this._board, 3)
    return (
      this.winHorizontal(rows, marker) ||
      this.winVertical(rows, marker) ||
      this.winDiagonal(rows, marker)
    )
  }

  winHorizontal(rows, marker) {
    return rows.some(row => row.every(cell => cell === marker))
  }

  winDiagonal(rows, marker) {
    return (
      rows.every((row, index) => row[index] === marker) ||
      rows.every((row, index) => row[3 - index - 1] === marker)
    )
  }

  winVertical(rows, marker) {
    return transpose(rows).some(row => row.every(cell => cell === marker))
  }
}
