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

  const markBoard = (e, index) => {
    if (!game.gameOver()) {
      game.board.addMarker(index, game.currentPlayer.marker)
      e.target.textContent = game.currentPlayer.marker
      if (game.gameOver()) {
        createGameOverMessage()
      } else {
        game.switchTurns()
      }
    } else console.log('game over')
  }

  const createGameOverMessage = () => {
    const messageContainer = createElement('div', 'container')
    const messageEl = createElement('p', 'has-text-centered title is-1')
    if (game.victory())
      messageEl.textContent = `${game.currentPlayer.name} won!`
    else messageEl.textContent = `It's a stalemate!`
    messageContainer.appendChild(messageEl)
    return appendChildren(content, [messageContainer])
  }

  const createBoard = () => {
    const boardCells = []
    game.board.state.forEach((_cell, index) => {
      const boardCell = createElement(
        'div',
        'has-background-link column is-half title is-1 has-text-centered has-text-light'
      )
      boardCell.style.width = '100px'
      boardCell.style.height = '100px'
      boardCell.style.marginRight = '45px'
      boardCell.style.borderRadius = '50%'
      boardCell.style.lineHeight = '65px'
      boardCell.style.cursor = 'pointer'
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
