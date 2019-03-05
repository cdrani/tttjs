import chunk from 'arr-chunk'
import Game from './game'

const controller = (() => {
  const content = document.getElementById('content')
  const gameBoard = document.getElementById('game-board')
  const game = new Game()

  const createElement = (el, classes) => {
    const element = document.createElement(el)
    if (classes) element.classList = classes
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
      const parentColumn = createElement('div', 'columns')
      parentColumn.style.justifyContent = 'center'
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
    }
  }

  const createGameOverMessage = () => {
    const messageContainer = createElement('div', 'column')
    messageContainer.style.justifyContent = 'center'
    const messageEl = createElement('p', 'has-text-centered title is-1')

    if (game.victory())
      messageEl.textContent = `${game.currentPlayer.name} won!`
    else messageEl.textContent = `It's a stalemate!`
    messageContainer.appendChild(messageEl)
    return appendChildren(gameBoard, [messageContainer])
  }

  const createTitle = () => {
    const ttt = createElement('h1', 'title is-1 has-text-centered')
    ttt.textContent = 'TTT'
    ttt.style.margin = '50px 0'
    content.prepend(ttt)
  }

  const createFooter = () => {
    const columnsContainer = createElement('div', 'columns')
    const column = createElement('div')
    column.style.margin = '0 auto'
    const ttt = createElement('p', 'title is-3 has-text-centered')
    const anchor = createElement('a', 'is-link')
    anchor.textContent = 'cdrani'
    anchor.href = 'https://github.com/tttjs'
    ttt.innerHTML = '&copy; 2019 by '
    ttt.appendChild(anchor)
    column.appendChild(ttt)
    columnsContainer.appendChild(column)
    content.appendChild(columnsContainer)
  }

  const createResetGameButton = () => {
    const btn = createElement('button', 'button is-link is-large')
    btn.style.margin = '50px auto'
    btn.textContent = 'Reset'
    btn.addEventListener('click', () => {
      removeChildren(gameBoard)
      game.board.reset()
      createBoard()
    })

    content.appendChild(btn)
  }

  const removeChildren = parentEl => {
    while (parentEl.firstChild) {
      parentEl.removeChild(parentEl.firstChild)
    }
  }

  const createBoard = () => {
    const boardCells = []
    game.board.state.forEach((_cell, index) => {
      const boardCell = createElement(
        'div',
        'has-background-link title has-text-light'
      )
      boardCell.style.width = '100px'
      boardCell.style.height = '100px'
      boardCell.style.marginRight = '10px'
      boardCell.style.borderRadius = '50%'
      boardCell.style.lineHeight = '70px'
      boardCell.style.cursor = 'pointer'
      boardCell.style.fontSize = '8rem'
      boardCell.addEventListener('click', e => {
        markBoard(e, index)
      })
      boardCells.push(boardCell)
    })

    const parentElArray = groupColumnElements(boardCells)
    return appendChildren(gameBoard, [...parentElArray])
  }

  const init = () => {
    createTitle()
    createResetGameButton()
    createFooter()
    createBoard()
  }

  return { init }
})()

export default controller
