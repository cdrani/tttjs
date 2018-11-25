import chunk from 'arr-chunk'
import Game from './game'

const controller = (() => {
  const content = document.getElementById('content')
  const gameBoard = document.getElementById('game-board')
  gameBoard.classList.add(
    'section',
    'columns',
    'is-multiline',
    'is-full',
    'is-mobile'
  )
  const game = new Game()

  const createElement = (el, classes) => {
    const element = document.createElement('div')
    element.classList = classes
    return element
  }

  const appendChildren = (parentEl, children) => {
    children.forEach(child => {
      parentEl.appendChild(child)
    })
    return parentEl
  }

  const markBoard = (e, index) => {
    if (!game.gameOver()) {
      game.board.addMarker(index, game.currentPlayer.marker)
      e.target.textContent = game.currentPlayer.marker
      if (game.board.winCombo(game.currentPlayer.marker)) {
        console.log(`${game.currentPlayer.name} won!`)
      } else {
        game.switchTurns()
      }
    } else console.log('game over')
  }

  const groupColumnElements = columnEls => {
    const threeInARow = chunk(columnEls, 3)
    const parentElArray = []
    threeInARow.forEach(row => {
      const parentColumn = createElement(
        'div',
        'columns column is-full is-offset-4 is-0 is-mobile my-1'
      )
      const parentElGroup = appendChildren(parentColumn, [...row])
      parentElArray.push(parentElGroup)
    })
    return parentElArray
  }

  const createBoard = () => {
    const boardCells = []
    game.board.state.forEach((_cell, index) => {
      const boardCell = createElement(
        'div',
        'has-background-link column is-half has-text-centered is-size-1'
      )
      boardCell.style.width = '100px'
      boardCell.style.height = '100px'
      boardCell.style.marginRight = '25px'
      boardCell.style.borderRadius = '50%'
      boardCell.style.lineHeight = '65px'
      boardCell.addEventListener('click', e => {
        markBoard(e, index)
      })
      boardCells.push(boardCell)
    })

    const parentElArray = groupColumnElements(boardCells)
    return appendChildren(gameBoard, [...parentElArray])
  }

  return { createBoard }
})()

export default controller
