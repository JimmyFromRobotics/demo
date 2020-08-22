import React, { useState, useEffect } from 'react'
import  {Board2 as Board2}  from './Board2'
import WhiteQueeny2 from './WhiteQueeny2'
import Moves from './Moves'
import io from "socket.io-client"
const containerStyle = {
  width: 500,
  height: 500,
  border: '1px solid gray',
}     
fetch('/api/playerNumber')
    .then(response => response.text())
    .then(message => {
      console.log(message);
      Moves.setMyPlayerNumber(parseInt(message));
    })

 var socket = io.connect('http://localhost:5000');
 socket.on('connect', function(){
    console.log('connect');
    

  
fetch('/api/gameNumber')
    .then(response => response.text())
    .then(message => {
      console.log("GameNumber:"+message);
      Moves.setGameNumber(parseInt(message));
    })

})
socket.on('event', function(data){
  
  console.log(data);
    Moves.makeMove(data.substring(0,4));
    Moves.setPossibleStarts(data.substring(4));
    Moves.setBo(data.substring(4).split(" "));
});

socket.on('event2', function(data){
  console.log(data);
    Moves.pieceChosen(data);
});

socket.on('blackCastlePlayer4Only', function(data){
if(Moves.blackNotCastled())
if(Moves.getMyPlayerNumber()===3){
  Moves.moveRook(56+parseInt(data))
}
});

socket.on('whiteCastlePlayer2Only', function(data){
  if(Moves.whiteNotCastled())
  if(Moves.getMyPlayerNumber()===1){
    Moves.moveRook(parseInt(data))
  }
  });


socket.on('disconnect', function(){ 
  console.log("hi friend")
      socket.reconnect();
     
});


export const RealApp = () => {

    Moves.setBoard(Board2())
  return (
    <div>
      <div style={containerStyle}>
        {Moves.getBoard().f()}
      </div>
    </div>
  )
}
