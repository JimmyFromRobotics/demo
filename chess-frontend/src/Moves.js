import React, {useState, useEffect, Component} from 'react';
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
import {Board2 as Board2}from './Board2'

let Bo=''
let white=true;
let black=true;
let possibleStarts=[];
let playerNo=0;
let array=[];
array[0]='WR';
array[1]='WN';
array[2]='WB';
array[3]='WK';
array[4]='WQ';
array[5]='WB';
array[6]='WN';
array[7]='WR';
for(let i=8; i<16; i++)
array[i]='WP';
for(let i=16; i<48; i++)
array[i]='--';
for(let i=48; i<56; i++)
array[i]='BP';

array[56]='BR';
array[57]='BN';
array[58]='BB';
array[59]='BK';
array[60]='BQ';
array[61]='BB';
array[62]='BN';
array[63]='BR';
const Moves=(function(){
var setStart=function(x){
    sessionStorage.setItem('start', x);
    if(x===-1)
    setPieceType('')
};
var getStart=function(){
    return sessionStorage.getItem('start');
};
var getEnd=function(){
    return sessionStorage.getItem('end');
};
var setEnd=function(x){
    sessionStorage.setItem('end', x);
};

var getPlayerNo=function(){
    return playerNo%4;
}

var incrementPlayerNo=function(){
    Bo.Func();
    playerNo++;
}

var setBo=function(abc){
    Bo.fun(abc);
};

var setPieceType=function(str){
    sessionStorage.setItem('pieceType', str);
}

var setBoard=function(arra){
Bo=arra
}

var getBoard=function(){
    return Bo;
}

var getPieceType=function(){
    return sessionStorage.getItem('pieceType');
}

var narrowDownMoves=function(){
    let a=[];
    for(let i=0; i<array.length; i++)
    if(array[i]===sessionStorage.getItem('pieceType'))
    a.push(i)
    return a;
}

var canMov=function(pieceType){
    playerNo=playerNo%4;
    console.log(sessionStorage.getItem('pieceType'))
    console.log(playerNo)
    console.log(getMyPlayerNumber())
    console.log(pieceType)
    if((playerNo===1 || playerNo===3)&& pieceType===sessionStorage.getItem('pieceType') && (getMyPlayerNumber()===playerNo))
    return true
    return false
}

var makeMove=function(str){
    console.log(array[str.substring(0,1)*8+parseInt(str.substring(1,2))])
    playerNo=playerNo%4;
    //maybe send to backend if one of them is castling, and if so, then trigger a function on backend (that can only be triggered once) that then triggers a rook move on frontend
 //make this variable turn true and set arr[3] or arr[59] when just castled
    console.log(getMyPlayerNumber())
    if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]=='WK' && Math.abs(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))))===2 && str.substring(0,1)===str.substring(2,3)){
    if(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4)))>0)
    fetch('/api/whiteCastle?position=0&gameNumber='+getGameNumber())
    else
    fetch('/api/whiteCastle?position=7&gameNumber='+getGameNumber())


    }
    if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]=='BK' && Math.abs(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))))===2&& str.substring(0,1)===str.substring(2,3)){
        if(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4)))>0)
    fetch('/api/blackCastle?position=0&gameNumber='+getGameNumber())
    else
    fetch('/api/blackCastle?position=7&gameNumber='+getGameNumber())

    }
    console.log(array);

    if(getMyPlayerNumber()!==playerNo){
    playerNo++;
    if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]=='BK' && Math.abs(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))))===2&& str.substring(0,1)===str.substring(2,3)){
    array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]=array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))];
    array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]='--';
    if(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))>0)){
        array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))+1]='BR'
        array[parseInt(str.substring(2,3))*8]='--'
    }
    else{
        array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))-1]='BR'
        array[parseInt(str.substring(2,3))*8+7]='--'
    }
    }
    else  if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]=='WK' && Math.abs(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))))===2 && str.substring(0,1)===str.substring(2,3)){
        array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]=array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))];
        array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]='--';
        if(parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))-(parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4)))>0){
            array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))+1]='WR'
            array[parseInt(str.substring(2,3))*8]='--'
        }
        else{
            array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))-1]='WR'
            array[parseInt(str.substring(2,3))*8+7]='--'
        }
        }

    else{
    console.log(str);
    console.log(array);
    if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]==='WP' && str.substring(0,1)===str.substring(2,3)-1 && str.substring(1,2)+1===str.substring(3,4) && array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]==='')
    array[parseInt(str.substring(0,1))*8+parseInt(str.substring(3,4))]='';
    else if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]==='WP' && str.substring(0,1)===str.substring(2,3)-1 && str.substring(1,2)-1===str.substring(3,4) && array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]==='')
    array[parseInt(str.substring(0,1))*8+parseInt(str.substring(3,4))]='';
    else if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]==='BP' && str.substring(0,1)===str.substring(2,3)+1 && str.substring(1,2)===str.substring(3,4)-1 && array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]==='')
    array[parseInt(str.substring(0,1))*8+parseInt(str.substring(3,4))]='';
    else if(array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]==='BP' && str.substring(0,1)===str.substring(2,3)+1 && str.substring(1,2)===str.substring(3,4)+1 && array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]==='')
    array[parseInt(str.substring(0,1))*8+parseInt(str.substring(3,4))]='';

    array[parseInt(str.substring(2,3))*8+parseInt(str.substring(3,4))]=array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))];
    array[parseInt(str.substring(0,1))*8+parseInt(str.substring(1,2))]='--';
    }

    


    console.log(array)
    Bo.Func();
    Bo.f();
    Moves.setStart(-1);
    Moves.setEnd(-1);
    }
    else
    playerNo++;
};

var whiteNotCastled=function(){
return white;
};

var blackNotCastled=function(){
    return black;
};

var moveRook=function(position){
    if(position===63){
    array[60]=array[63];
    array[63]='';
    black=false;
    }
    else if(position===56){
    array[58]=array[56];
    array[56]='';
    black=false;
    }
    else if(position===7){
    array[4]=array[7];
    array[7]='';
    white=false;
    }
    else if(position===0){
    array[2]=array[0];
    array[0]='';
    white=false;
    }
    Bo.Func();
    Bo.f();
};

var setMyPlayerNumber=function(number){
    sessionStorage.setItem('myNumber', parseInt(number));
};

var getMyPlayerNumber=function(){
    return parseInt(sessionStorage.getItem('myNumber'));
};

var pieceSelected=function(pieceType){
    playerNo=playerNo%4;
    console.log(playerNo)
    console.log(isPossibleWithThisPiece(pieceType))
    console.log(getMyPlayerNumber())
    if(playerNo%2===0 && isPossibleWithThisPiece(pieceType) && playerNo===getMyPlayerNumber()){
    console.log(pieceType)
    fetch('/api/chosenPiece?position='+pieceType+'&gameNumber='+getGameNumber())
    .then(response => response.text())
    .then(message => {
      console.log(message);
    })
    }
}

var pieceChosen=function(pieceType){
    console.log(pieceType)
    setPieceType(pieceType);
    playerNo++;
    (Bo.Func());
    
    console.log("hey")

};

var resetBoards=function(){
    console.log(array)
    let a=[];
    for(let i=0; i<array.length; i++)
    if(array[i]==='BP')
    a.push(<BlackPawny2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></BlackPawny2>)
    else if(array[i]==='WP')
    a.push(<WhitePawny2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></WhitePawny2>)
    else if(array[i]==='BN')
    a.push(<BlackKnighty2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></BlackKnighty2>)
    else if(array[i]==='BK')
    a.push(<BlackKingy2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></BlackKingy2>)
    else if(array[i]==='WQ')
    a.push(<WhiteQueeny2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></WhiteQueeny2>)
    else if(array[i]==='BB')
    a.push(<BlackBishopy2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></BlackBishopy2>)
    else if(array[i]==='BQ')
    a.push(<BlackQueeny2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></BlackQueeny2>)
    else if(array[i]==='WN')
    a.push(<WhiteKnighty2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></WhiteKnighty2>)
    else if(array[i]==='BR')
    a.push(<BlackRooky2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></BlackRooky2>)
    else if(array[i]==='WR')
    a.push(<WhiteRooky2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></WhiteRooky2>)
    else if(array[i]==='WK')
    a.push(<WhiteKingy2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></WhiteKingy2>)
    else if(array[i]==='WB')
    a.push(<WhiteBishopy2 i={Math.trunc(i/8)} j={Math.trunc(i%8)}></WhiteBishopy2>)
    else
    a.push('');
    return a;
}
var getPieceType=function(){
    if(array[sessionStorage.getItem('start')]=='WP'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='WP';
    return <WhitePawny2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></WhitePawny2>
    }if(array[sessionStorage.getItem('start')]=='WN'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='WN';
    return <WhiteKnighty2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></WhiteKnighty2>
    }if(array[sessionStorage.getItem('start')]=='WK'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='WK';
    return <WhiteKingy2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></WhiteKingy2>
    }if(array[sessionStorage.getItem('start')]=='WQ'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='WQ';
    return <WhiteQueeny2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></WhiteQueeny2>
    }if(array[sessionStorage.getItem('start')]=='WR'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='WR';
    return <WhiteRooky2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></WhiteRooky2>
    }if(array[sessionStorage.getItem('start')]=='WB'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='WB';
    return <WhiteBishopy2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></WhiteBishopy2>
    }if(array[sessionStorage.getItem('start')]=='BP'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='BP';
    return <BlackPawny2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></BlackPawny2>
    }if(array[sessionStorage.getItem('start')]=='BN'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='BN';
    return <BlackKnighty2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></BlackKnighty2>
    }if(array[sessionStorage.getItem('start')]=='BK'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='BK';
    return <BlackKingy2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></BlackKingy2>
    }if(array[sessionStorage.getItem('start')]=='BQ'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='BQ';
    return <BlackQueeny2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></BlackQueeny2>
    }if(array[sessionStorage.getItem('start')]=='BR'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='BR';
    return <BlackRooky2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></BlackRooky2>
    }if(array[sessionStorage.getItem('start')]=='BB'){
    array[sessionStorage.getItem('start')]='--';
    array[sessionStorage.getItem('end')]='BB';
    return <BlackBishopy2 i={Math.trunc(sessionStorage.getItem('end')/8)} j={Math.trunc(sessionStorage.getItem('end')%8)}></BlackBishopy2>
    }
}

var setPossibleStarts=function(ar){
    possibleStarts=ar;
}

var isPossibleWithThisPiece=function(str){
    for(let i=0; i<array.length; i++)
    if(array[i]==str && possibleStarts.includes(i))
    return true;
    return false;
}
var setGameNumber=function(n){
    sessionStorage.setItem('gameNumber',n);
}

var getGameNumber=function(){
    return parseInt(sessionStorage.getItem('gameNumber'));
}
return{
    setStart:setStart,
    getStart:getStart,
    getEnd:getEnd,
    setEnd:setEnd,
    getPieceType:getPieceType,
    getPlayerNo:getPlayerNo,
    setPieceType:setPieceType,
    getPieceType:getPieceType,
    setPossibleStarts:setPossibleStarts,
    isPossibleWithThisPiece:isPossibleWithThisPiece,
    narrowDownMoves:narrowDownMoves,
    incrementPlayerNo:incrementPlayerNo,
    resetBoards:resetBoards,
    pieceSelected:pieceSelected,
    setBoard:setBoard,
    getBoard:getBoard,
    canMov:canMov,
    getMyPlayerNumber:getMyPlayerNumber,
    setMyPlayerNumber:setMyPlayerNumber, 
    makeMove:makeMove,
    pieceChosen:pieceChosen,
    setBo:setBo,
    moveRook:moveRook,
    whiteNotCastled:whiteNotCastled,
    blackNotCastled:blackNotCastled,
    setGameNumber:setGameNumber,
    getGameNumber:getGameNumber

}
}
)();
export default Moves;