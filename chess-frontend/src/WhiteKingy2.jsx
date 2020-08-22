import whiteRook from './unnamed123.png'
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd'
import React, { useState, useEffect } from 'react'
import { ItemTypes } from './ItemTypes'
import Moves from './Moves'


//if Move is possible with a black rook and it is the turn of player 2 or player 0, then onclick, set the piece to be moved as a black rook and increase the playerNo.  
const WhiteKingy2=(i, j)=>{
  const [{ isdragging }, drag, preview] = useDrag({
      canDrag: (Moves.canMov('WK')),
      item: { type: ItemTypes.KNIGHT },
      collect: (monitor) => ({
        isdragging: !!monitor.isDragging(),
        
      }),
    })
    function Hello(){
      Moves.pieceSelected('WK');
    }
  if(isdragging){
  Moves.setStart((i.i*8+i.j));
  Moves.setEnd(-1);
  }
    return (
      <>
        <DragPreviewImage connect={preview} src={whiteRook}/>
        <div
          ref={drag}
          isdragging={isdragging}
          onClick={Hello}
        >
        <img src={whiteRook} style={{position:'relative', opacity: isdragging?0:1}} />
        </div>
      </>
    )
}
export default WhiteKingy2;