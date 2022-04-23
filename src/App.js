import React, {useState} from 'react'
import './App.css';

function App() {
  const [cards, setCards] = useState([
    {id: 1, order: 1, title: "Card 1"},
    {id: 2, order: 2, title: "Card 2"},
    {id: 3, order: 3, title: "Card 3"},
    {id: 4, order: 4, title: "Card 4"}
  ])
  const [currentCard, setCurrentCard] = useState(null)

  const handleDragStart = (e, card) => {
    setCurrentCard(card)
  }


  const handleDragEnd = (e) => {
    e.target.style.background = 'white'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.target.style.background = 'red'
  }

  const handleDrop = (e, card) => {
    e.preventDefault()
    setCards(cards.map(c => {
      if(c.id === card.id){
        return {...c, order: currentCard.order}
      }
      if(c.id === currentCard.id){
        return {...c, order: card.order}
      }
      return c
    }))
    e.target.style.background = "white  "
  }

  const sortCards = (a, b) => {
    if(a?.order > b?.order){
      return 1
    }else{
      return -1
    }
  }

  return (
      <div className="app">
      { cards.sort(sortCards).map((card) => (
        <div 
          key={card.id} 
          className="card"
          onDragStart={(e) => {handleDragStart(e, card)}}
          onDragLeave={(e) => {handleDragEnd(e)}}
          onDragEnd={(e) => {handleDragEnd(e)}}
          onDragOver={(e) => {handleDragOver(e)}}
          onDrop={(e) => {handleDrop(e, card)}}
          draggable={true}
        >
          {card.title}
        </div>
      ))}
    </div>
  );
}

export default App;
