import { useState } from 'react';
import './App.css';

function App() {

    const [boards,setBoards]= useState([
        {id:1, title:'Monday', items :[{id: 1, title :'art'},{id: 2, title :'math'},{id: 3, title :'coding'}]},
        {id:2, title:'tuesday', items :[{id: 1, title :'PE'},{id: 2, title :'physics'},{id: 3, title :'literature'}]},
        {id:3, title:'thirsday', items :[{id: 1, title :'project'},{id: 2, title :'eng lang'},{id: 3, title :'deustch lang'}]},
    ])

    const [currBoard, setCurrBoard] = useState(null)
    const [currItem, setCurrItem] = useState(null)

    const dragOverHandle = (e) =>{
        e.preventDefault()
        e.target.style.boxShadow = '0 4px 3px gray'
        
    }

    const dragLeaveHandle = (e) =>{
        e.target.style.boxShadow = 'none'

    }

    const dragStartHandle = (e,board,item) =>{
        setCurrBoard(board)
        setCurrItem(item)
    }

    const dragEndHandle = (e) =>{
        e.target.style.boxShadow = 'none'

    }

    const dropHandle = (e,board,item) =>{
        e.preventDefault()

        const currIndex = currBoard.items.indexOf(currItem);
        currBoard.items.splice(currIndex, 1)//search item which we take and delete from past board

        
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0 , currItem)//search item in 'drop's' table and drop this item after onOver item
        
        setBoards(boards.map(b=>{
            if(b.id === board.id){
                return board
            }
            if(b.id === currBoard.id){
                return currBoard
            }
            return b
        }))

        e.target.style.boxShadow = 'none'

    }

    const dropCardHandler =(e,board) =>{
        if (board.items.length !==0)
            return;

        board.items.push(currItem)
        


        const currIndex = currBoard.items.indexOf(currItem);
        currBoard.items.splice(currIndex, 1)


        setBoards(boards.map(b=>{
            if(b.id === board.id){
                return board
            }
            if(b.id === currBoard.id){
                return currBoard
            }
            return b
        }))

        e.target.style.boxShadow = 'none'

    }



    return (
        <div className="App">
            {boards.map(board=>
                <div 
                    className='board'
                    onDragOver={(e) => dragOverHandle(e)}
                    onDrop={(e) => dropCardHandler(e,board)}


                >
                    <div className="board__title">{board.title}</div>
                    
                    {board.items.map(item=>
                        <div 
                            draggable ={true}

                            onDragOver={(e) => dragOverHandle(e)}
                            onDragLeave={e => dragLeaveHandle(e)}
                            onDragStart={e => dragStartHandle(e,board,item)}
                            onDragEnd={e => dragEndHandle(e)}
                            onDrop={(e) => dropHandle(e,board,item)}

                            className="item">
                                {item.title}

                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
