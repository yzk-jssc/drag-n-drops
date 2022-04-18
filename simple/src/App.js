import React,{ useState } from 'react';
import './App.css';

function App() {

    const [cardList, setCardList] = useState([
        {id: 1, order:4, text:'4th card'},
        {id: 2, order:2, text:'2nd card'},
        {id: 3, order:3, text:'3rd card'},
        {id: 4, order:1, text:'1st card'},
    ])

    const [currentCard, setCurrentCard] = useState(null)

    const dragStartHandler =(e,card)=>{
        console.log('drag',card)
        setCurrentCard(card)
    }

    const dragLeaveHandler =(e)=>{
        e.target.style.background = 'white'
        
    }

    const dragOverHandler =(e)=>{
        e.preventDefault()   
        e.target.style.background = 'lightgray'        
    }

    const dropHandler =(e,card)=>{
        e.preventDefault()
        console.log('drop',card)

        setCardList(cardList.map(cd=>{
            if(cd.id === card.id){
                return {...cd, order:currentCard.order}//swith card orders
            }
            if(cd.id === currentCard.id){
                return {...cd, order:card.order}
            }
            return cd
        }))

        e.target.style.background = 'white'

    }

    const sortCards = (a,b)=>{

        if(a.order > b.order ){
            return 1
        }else return -1


    }

    return (
        <div className="App">

            {cardList.sort(sortCards).map(card=>
                <div

                    draggable= 'true'

                    onDragStart={e => dragStartHandler(e,card)} /* when take card */
                    onDragLeave={e => dragLeaveHandler(e)} /* if card beyond other card */
                    onDragEnd={e => dragLeaveHandler(e)}  /* when card over smth object */
                    onDragOver={e => dragOverHandler(e)} /* when we'll released card */
                    onDrop={e => dropHandler(e,card)} /* when drop card */

                    className='card'
                >
                    {card.text}
                </div>
            )}
        
        </div>
    );
}

export default App;
