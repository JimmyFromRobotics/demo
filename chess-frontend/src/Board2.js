
import React, { useState, useEffect } from 'react'
import WhiteQueeny2 from './WhiteQueeny2'
import WhiteRooky2 from './WhiteRooky2'
import WhiteBishopy2 from './WhiteBishopy2'
import WhiteKingy2 from './WhiteKingy2'
import WhitePawny2 from './WhitePawny2'
import WhiteKnighty2 from './WhiteKnighty2'
import BlackQueeny2 from './BlackQueeny2'
import BlackRooky2 from './BlackRooky2'
import BlackBishopy2 from './BlackBishopy2'
import BlackKingy2 from './BlackKingy2'
import BlackPawny2 from './BlackPawny2'
import BlackKnighty2 from './BlackKnighty2'
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import Moves from './Moves'
let b=false;
let abc=false;
let arr2=[];
for(let i=0; i<8; i++)
for(let j=0; j<8; j++)
if(i===1)
arr2.push(<WhitePawny2 i={i} j={j}></WhitePawny2>)
else if(i===0 && (j===0 || j===7))
arr2.push(<WhiteRooky2 i={i} j={j}></WhiteRooky2>)
else if(i===0 && (j===1 || j===6))
arr2.push(<WhiteKnighty2 i={i} j={j}></WhiteKnighty2>)
else if(i===0 && (j===2 || j===5))
arr2.push(<WhiteBishopy2 i={i} j={j}></WhiteBishopy2>)
else if(i===0 && j===4)
arr2.push(<WhiteQueeny2 i={i} j={j}></WhiteQueeny2>)
else if(i===0 && j===3)
arr2.push(<WhiteKingy2 i={i} j={j}></WhiteKingy2>)
else if(i===6)
arr2.push(<BlackPawny2 i={6} j={j}></BlackPawny2>)
else if(i===7 && (j===0 || j===7))
arr2.push(<BlackRooky2 i={7} j={j}></BlackRooky2>)
else if(i===7 && (j===1 || j===6))
arr2.push(<BlackKnighty2 i={7} j={j}></BlackKnighty2>)
else if(i===7 && (j===2 || j===5))
arr2.push(<BlackBishopy2 i={7} j={j}></BlackBishopy2>)
else if(i===7 && j===4)
arr2.push(<BlackQueeny2 i={7} j={j}></BlackQueeny2>)
else if(i===7 && j===3)
arr2.push(<BlackKingy2 i={7} j={j}></BlackKingy2>)
else
arr2.push('');
export const Board2=()=>{
const[arrTwo, setArr2]=useState([]);
let ar=[];
const [validMoveArray, setValidMoveArray]=useState(['1020', '1030', '1121', '1131', '1222', '1232', '1323', '1333','1424', '1434', '1525', '1535', '1626', '1636', '1727', '1737','0120','0122','0625', '0627' ]);
for(let i=0;  i<validMoveArray.length; i++)
      ar.push(parseInt(validMoveArray[i].substring(0,1))*8+parseInt(validMoveArray[i].substring(1,2))%8);
    Moves.setPossibleStarts(ar);
//hardcode the moves valid for white on move 1
//then after that, the makeFuncCall method will take care of sending moves to the backend and determining what moves are valid for the next player
const isValidMove=()=>{
   let p=(Moves.narrowDownMoves().includes((parseInt(Moves.getStart()))));
   let p2=validMoveArray.includes(''+Math.trunc(Moves.getStart()/8)+Math.trunc(Moves.getStart()%8)+Math.trunc(Moves.getEnd()/8)+Math.trunc(Moves.getEnd()%8));
console.log(p)
console.log(p2)
console.log(Moves.getStart())
console.log(Moves.narrowDownMoves())
   return p&&p2;
  }

  const makeFuncCall=async()=>{
    setArr2(Moves.resetBoards())
  fetch('/api/makeMove?position='+Math.trunc(Moves.getStart()/8)+Math.trunc(Moves.getStart()%8)+Math.trunc(Moves.getEnd()/8)+Math.trunc(Moves.getEnd()%8)+'&gameNumber='+Moves.getGameNumber())
  .then(response => response.text())
  .then(message => {
    setValidMoveArray(message.split(" "));
    Moves.setPossibleStarts(message);
    b=false;
  })

 //make fetch here, passing the move played and getting all valid moves for the next player's turn
}

function fun(a){
setValidMoveArray(a);
}

const [{ hover }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(0); if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) && isValidMove()) {arr2[Moves.getEnd()]=Moves.getPieceType(); makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover1 }, drop1] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(1);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover1: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover2 }, drop2] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(2);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover2: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover3 }, drop3] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(3);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover3: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover4 }, drop4] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(4);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
   collect: monitor => ({
      hover4: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover5 }, drop5] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(5);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover5: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover6 }, drop6] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(6);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover6: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover7 }, drop7] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(7);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover7: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover8 }, drop8] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(8);console.log(10);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover8: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover9 }, drop9] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(9);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover9: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover10 }, drop10] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(10);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover10: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover11 }, drop11] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(11);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover11: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover12 }, drop12] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(12);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null;Moves.setStart(-1); }},
    collect: monitor => ({
      hover12: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover13 }, drop13] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(13);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover13: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover14 }, drop14] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(14);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover14: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover15 }, drop15] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(15);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover15: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover16 }, drop16] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{console.log(isValidMove());Moves.setEnd(16); if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){arr2[Moves.getEnd()]=Moves.getPieceType(); makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover16: !!monitor.isOver({shallow: true}),
    }),
  })
    
  const [{ hover17 }, drop17] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(17);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover17: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover18 }, drop18] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(18);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover18: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover19 }, drop19] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(19);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover19: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover20 }, drop20] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(20);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover20: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover21 }, drop21] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(21);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover21: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover22 }, drop22] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(22);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover22: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover23 }, drop23] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(23);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover23: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover24 }, drop24] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(24);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover24: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover25 }, drop25] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(25);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover25: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover26 }, drop26] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(26);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover26: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover27 }, drop27] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(27);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover27: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover28 }, drop28] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(28);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover28: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover29 }, drop29] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(29);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover29: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover30 }, drop30] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(30);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover30: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover31 }, drop31] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(31);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover31: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover32 }, drop32] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(32);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover32: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover33 }, drop33] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(33);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover33: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover34 }, drop34] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(34);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover34: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover35 }, drop35] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(35);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover35: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover36 }, drop36] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(36);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover36: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover37 }, drop37] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(37);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover37: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover38 }, drop38] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(38);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover48: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover39 }, drop39] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(39);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover39: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover40 }, drop40] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(40);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover40: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover41 }, drop41] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(41);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover41: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover42 }, drop42] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(42);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover42: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover43 }, drop43] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(43);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover43: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover44 }, drop44] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(44);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover44: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover45 }, drop45] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(45);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover45: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover46 }, drop46] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(46);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover46: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover47 }, drop47] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(47);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover47: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover48 }, drop48] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(48);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover48: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover49 }, drop49] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(49);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover49: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover50 }, drop50] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(50);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover50: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover51 }, drop51] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(51);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover51: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover52 }, drop52] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(52);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover52: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover53 }, drop53] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(53);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover53: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover54 }, drop54] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(54);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover54: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover55 }, drop55] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(55);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover55: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover56 }, drop56] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(16);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover56: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover57 }, drop57] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(57);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover57: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover58 }, drop58] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(58);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover58: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover59 }, drop59] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(59);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover59: !!monitor.isOver({shallow: true}),
    }),
  })


  const [{ hover60 }, drop60] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(60);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover60: !!monitor.isOver({shallow: true}),
    }),
  })
    

  const [{ hover61 }, drop61] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(61);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover61: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover62 }, drop62] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(62);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover62: !!monitor.isOver({shallow: true}),
    }),
  })

  const [{ hover63 }, drop63] = useDrop({
    accept: ItemTypes.KNIGHT,
   // drop: () => moveKnight(x, y),
   drop:()=>{Moves.setEnd(63);if((Moves.getPlayerNo()===1 || Moves.getPlayerNo()===3) &&isValidMove()){ arr2[Moves.getEnd()]=Moves.getPieceType();makeFuncCall(); arr2[Moves.getStart()]=null; Moves.setStart(-1); }},
    collect: monitor => ({
      hover63: !!monitor.isOver({shallow: true}),
    }),
  })

  function p(i, j){
    console.log(i)
    console.log(j)
  }

  const squareStyle = {
    width: '12%',
    height: '13%',
  
    }


    function Func(){
      console.log(arr2)
      setArr2(Moves.resetBoards())
      console.log(arr2)

    }
  



if(arrTwo.length===0)
  setArr2(arr2);
  


 if(Moves.getPlayerNo()%2===1 && !b){
  b=true;
  setArr2(Moves.resetBoards());
}


    
   const boardStyle = {
  width: '130%',
  height: '130%',
  display: 'flex',
  flexWrap: 'wrap',
    }
var f=function(){
    let arr=[];
    for(let i=0; i<8; i++)
        for(let j=0; j<8; j++){
            if((i+j)%2===0){
                if(i===0 && j===0)
            arr.push(
                        <div
                            key={i*8+j}
                            ref={drop}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'white',
                        position:'relative',
                      }}
                    >
                      {hover && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                );
                else if(i===0 && j===2){
                    arr.push(
                        <div
                            key={i*8+j}
                            ref={drop2}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'white',
                        position:'relative',
                      }}
                    >
                      {hover2 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                );
                }
                else if(i===0 && j===4){
                    arr.push(
                        <div
                            key={i*8+j}
                            ref={drop4}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'white',
                        position:'relative',
                      }}
                    >
                      {hover4 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                );
                }
    
                else if(i===0 && j===6){
                    arr.push(
                        <div
                            key={i*8+j}
                            ref={drop6}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'white',
                        position:'relative',
                      }}
                    >
                      {hover6 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                );
                }
                
    
                else if(i===1 && j===1)
                arr.push(
                            <div
                                key={i*8+j}
                                ref={drop9}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover9 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    else if(i===1 && j===3){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop11}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover11 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
                    else if(i===1 && j===5){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop13}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover13 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
        
                    else if(i===1 && j===7){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop15}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover15 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
    
    
                   else if(i===2 && j===0)
                arr.push(
                            <div
                                key={i*8+j}
                                ref={drop16}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover16 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    else if(i===2 && j===2){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop18}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover18 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
                    else if(i===2 && j===4){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop20}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover20 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
        
                    else if(i===2 && j===6){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop22}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover22 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
    
                    else if(i===3 && j===1)
                arr.push(
                            <div
                                key={i*8+j}
                                ref={drop25}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover25 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    else if(i===3 && j===3){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop27}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover27 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
                    else if(i===3 && j===5){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop29}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover29 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
        
                    else if(i===3 && j===7){
                        arr.push(
                            <div
                                key={i*8+j}
                                ref={drop31}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'white',
                            position:'relative',
                          }}
                        >
                          {hover31 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    );
                    }
                    
    
    
    
    
    
    
    
    
                   else if(i===4 && j===0)
                    arr.push(
                                <div
                                    key={i*8+j}
                                    ref={drop32}
                              style={{
                                  
                                ...squareStyle,
                                backgroundColor:'white',
                                position:'relative',
                              }}
                            >
                              {hover32 && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    zIndex: 1,
                                    opacity: 0.5,
                                    backgroundColor: 'yellow',
                                  }}
                                />
                              )}
                              {arrTwo[i*8+j]}
                            </div>
                        );
                        else if(i===4 && j===2){
                            arr.push(
                                <div
                                    key={i*8+j}
                                    ref={drop34}
                              style={{
                                  
                                ...squareStyle,
                                backgroundColor:'white',
                                position:'relative',
                              }}
                            >
                              {hover34 && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    zIndex: 1,
                                    opacity: 0.5,
                                    backgroundColor: 'yellow',
                                  }}
                                />
                              )}
                              {arrTwo[i*8+j]}
                            </div>
                        );
                        }
                        else if(i===4 && j===4){
                            arr.push(
                                <div
                                    key={i*8+j}
                                    ref={drop36}
                              style={{
                                  
                                ...squareStyle,
                                backgroundColor:'white',
                                position:'relative',
                              }}
                            >
                              {hover36 && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    zIndex: 1,
                                    opacity: 0.5,
                                    backgroundColor: 'yellow',
                                  }}
                                />
                              )}
                              {arrTwo[i*8+j]}
                            </div>
                        );
                        }
            
                        else if(i===4 && j===6){
                            arr.push(
                                <div
                                    key={i*8+j}
                                    ref={drop38}
                              style={{
                                  
                                ...squareStyle,
                                backgroundColor:'white',
                                position:'relative',
                              }}
                            >
                              {hover38 && (
                                <div
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: '100%',
                                    zIndex: 1,
                                    opacity: 0.5,
                                    backgroundColor: 'yellow',
                                  }}
                                />
                              )}
                              {arrTwo[i*8+j]}
                            </div>
                        );
                        }
                        
            
                        else if(i===5 && j===1)
                        arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop41}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover41 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            else if(i===5 && j===3){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop43}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover43 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                            else if(i===5 && j===5){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop45}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover45 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                
                            else if(i===5 && j===7){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop47}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover47 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
            
            
                           else if(i===6 && j===0)
                        arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop48}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover48 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            else if(i===6 && j===2){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop50}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover50 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                            else if(i===6 && j===4){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop52}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover52 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                
                            else if(i===6 && j===6){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop54}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover54 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
            
                            else if(i===7 && j===1)
                        arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop57}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover57 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            else if(i===7 && j===3){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop59}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover59 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                            else if(i===7 && j===5){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop61}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover61 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                
                            else if(i===7 && j===7){
                                arr.push(
                                    <div
                                        key={i*8+j}
                                        ref={drop63}
                                  style={{
                                      
                                    ...squareStyle,
                                    backgroundColor:'white',
                                    position:'relative',
                                  }}
                                >
                                  {hover63 && (
                                    <div
                                      style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        height: '100%',
                                        width: '100%',
                                        zIndex: 1,
                                        opacity: 0.5,
                                        backgroundColor: 'yellow',
                                      }}
                                    />
                                  )}
                                  {arrTwo[i*8+j]}
                                </div>
                            );
                            }
                            
              
            
        }
            else{
                if(i===0 && j===1)
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop1}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover1 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            else if(i===0 && j===3){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop3}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover3 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            }
    
            else if(i===0 && j===5){
                    arr.push(
                        <div
                                key={i*8+j}
                                ref={drop5}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'brown',
                            position:'relative',
                          }}
                        >
                          {hover5 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    
                    );
            }
            else if(i===0 && j===7){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop7}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover7 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
        }
        else if(i===1 && j===0)
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop8}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover8 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    else if(i===1 && j===2){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop10}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover10 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    
    else if(i===1 && j===4){
            arr.push(
                <div
                        key={i*8+j}
                        ref={drop12}
                  style={{
                      
                    ...squareStyle,
                    backgroundColor:'brown',
                    position:'relative',
                  }}
                >
                  {hover12 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                      }}
                    />
                  )}
                  {arrTwo[i*8+j]}
                </div>
            
            );
    }
    else if(i===1 && j===6){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop14}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover14 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    else if(i===2 && j===1)
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop17}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover17 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            else if(i===2 && j===3){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop19}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover19 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            }
    
            else if(i===2 && j===5){
                    arr.push(
                        <div
                                key={i*8+j}
                                ref={drop21}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'brown',
                            position:'relative',
                          }}
                        >
                          {hover21 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    
                    );
            }
            else if(i===2 && j===7){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop23}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover23 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
        }
    
    
        else if(i===3 && j===0)
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop24}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover24 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    else if(i===3 && j===2){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop26}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover26 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    
    else if(i===3 && j===4){
            arr.push(
                <div
                        key={i*8+j}
                        ref={drop28}
                  style={{
                      
                    ...squareStyle,
                    backgroundColor:'brown',
                    position:'relative',
                  }}
                >
                  {hover28 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                      }}
                    />
                  )}
                  {arrTwo[i*8+j]}
                </div>
            
            );
    }
    else if(i===3 && j===6){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop30}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover30 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    if(i===4 && j===1)
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop33}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover33 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            else if(i===4 && j===3){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop35}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover35 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            }
    
            else if(i===4 && j===5){
                    arr.push(
                        <div
                                key={i*8+j}
                                ref={drop37}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'brown',
                            position:'relative',
                          }}
                        >
                          {hover37 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    
                    );
            }
            else if(i===4 && j===7){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop39}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover39 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
        }
        else if(i===5 && j===0)
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop40}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover40 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    else if(i===5 && j===2){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop42}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover42 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    
    else if(i===5 && j===4){
            arr.push(
                <div
                        key={i*8+j}
                        ref={drop44}
                  style={{
                      
                    ...squareStyle,
                    backgroundColor:'brown',
                    position:'relative',
                  }}
                >
                  {hover44 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                      }}
                    />
                  )}
                  {arrTwo[i*8+j]}
                </div>
            
            );
    }
    else if(i===5 && j===6){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop46}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover46 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    else if(i===6 && j===1)
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop49}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover49 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            else if(i===6 && j===3){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop51}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover51 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
            }
    
            else if(i===6 && j===5){
                    arr.push(
                        <div
                                key={i*8+j}
                                ref={drop53}
                          style={{
                              
                            ...squareStyle,
                            backgroundColor:'brown',
                            position:'relative',
                          }}
                        >
                          {hover53 && (
                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                zIndex: 1,
                                opacity: 0.5,
                                backgroundColor: 'yellow',
                              }}
                            />
                          )}
                          {arrTwo[i*8+j]}
                        </div>
                    
                    );
            }
            else if(i===6 && j===7){
                arr.push(
                    <div
                            key={i*8+j}
                            ref={drop55}
                      style={{
                          
                        ...squareStyle,
                        backgroundColor:'brown',
                        position:'relative',
                      }}
                    >
                      {hover55 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            width: '100%',
                            zIndex: 1,
                            opacity: 0.5,
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {arrTwo[i*8+j]}
                    </div>
                
                );
        }
    
    
        else if(i===7 && j===0)
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop56}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover56 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    else if(i===7 && j===2){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop58}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover58 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    
    else if(i===7 && j===4){
            arr.push(
                <div
                        key={i*8+j}
                        ref={drop60}
                  style={{
                      
                    ...squareStyle,
                    backgroundColor:'brown',
                    position:'relative',
                  }}
                >
                  {hover60 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 1,
                        opacity: 0.5,
                        backgroundColor: 'yellow',
                      }}
                    />
                  )}
                  {arrTwo[i*8+j]}
                </div>
            
            );
    }
    else if(i===7 && j===6){
        arr.push(
            <div
                    key={i*8+j}
                    ref={drop62}
              style={{
                  
                ...squareStyle,
                backgroundColor:'brown',
                position:'relative',
              }}
            >
              {hover62 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    zIndex: 1,
                    opacity: 0.5,
                    backgroundColor: 'yellow',
                  }}
                />
              )}
              {arrTwo[i*8+j]}
            </div>
        
        );
    }
    
        }
      }
      
        return <div style={boardStyle}>{arr}</div>;
    }
  return{f:f, Func:Func, fun:fun}
}










  

