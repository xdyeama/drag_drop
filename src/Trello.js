import React, { useState } from 'react'
import "./Trello.css"

const Trello = () => {
  const [boards, setBoards] = useState([
    {id: 1, title: "❓TO DO", items:[{id:1, title:"wake up"}, {id: 2, title: "take a shower"}, {id: 3, title: "give food to cat"}]},
    {id: 2, title: "📖DOING", items:[{id:4, title:"practice front end"}, {id: 5, title: "practice korean language"}, {id: 6, title: "clean home"}]},
    {id: 3, title: "✔️DONE", items:[{id:7, title:"Go exercise"}, {id: 8, title: "watch a strem"}, {id: 9, title: "Solve some leetcode problems"}]},
  ])
  const [currentBoard, setCurrentBoard] = useState()
  const [currentItem, setCurrentItem] = useState()

  const handleDragStart = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  const handleDragLeave = (e) => {
    e.target.style.boxShadow = "none"
  }

  const handleDragEnd = (e) => {
    e.target.style.boxShadow = "none"
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if(e.target.className === "item"){
      e.target.style.boxShadow = "0 2px 3px gray"
    }
  }

  const handleDrop = (e, board, item) => {
    e.preventDefault()
    const currIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex+1, 0, currentItem)

    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }

  const handleCardDrop = (e, board) => {
    board.items.push(currentItem)
    const currIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currIndex, 1)

    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }
  
  return (
    <div className="trello">
      {boards.map(board => (
        <div 
          className="board" 
          key={board.id}
          onDragOver={e => handleDragOver(e)}
          onDrop={e => handleCardDrop(e, board)}
          >
          <p className="board_title">
            {board.title}
          </p>
          {board.items.map(item => (
            <div 
              className="item" 
              key={item.id}
              onDragStart={e => handleDragStart(e, board, item)}  
              onDragLeave={e => handleDragLeave(e)}
              onDragEnd={e => handleDragEnd(e)}
              onDragOver={e => handleDragOver(e)}
              onDrop={e => handleDrop(e, board, item)}
              draggable={true}
            >
              {item.title}
            </div>
          ))}
        </div>
      ))}

    </div>
  )
}

export default Trello