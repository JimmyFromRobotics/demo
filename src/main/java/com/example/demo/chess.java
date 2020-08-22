package com.example.demo;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;

import org.apache.commons.math3.util.Pair;

public class chess {
private int[][]board= new int[8][8]; // 10 for white king, 20 for black king (11 white queen, 21 black queen...)
private boolean[][] protectedSquares=new boolean[8][8];
public boolean whiteToMove=true;
private boolean whiteKingHasMoved=false;
private boolean blackKingHasMoved=false;
private int empAble=-2;
//in general, turn specifies the player whose turn it is, white => true, black => false
//x,y are the current positions of the piece in all following methods

public void setUpGame() {
	board[0][0]=12;
	board[0][1]=14;
	board[0][2]=13;
	board[0][3]=10;
	board[0][4]=11;
	board[0][7]=12;
	board[0][6]=14;
	board[0][5]=13;
	board[7][0]=22;
	board[7][1]=24;
	board[7][2]=23;
	board[7][3]=20;
	board[7][4]=21;
	board[7][7]=22;
	board[7][6]=24;
	board[7][5]=23;
	board[1][0]=15;
	board[1][1]=15;
	board[1][2]=15;
	board[1][3]=15;
	board[1][4]=15;
	board[1][5]=15;
	board[1][6]=15;
	board[1][7]=15;
	board[6][0]=25;
	board[6][1]=25;
	board[6][2]=25;
	board[6][3]=25;
	board[6][4]=25;
	board[6][5]=25;
	board[6][6]=25;
	board[6][7]=25;
}

private ArrayList<Pair<Integer, Integer>> getKingMoves(int x, int y, boolean turn) {// x, y are positions on the board, turn is false if white, true if black
	ArrayList<Pair<Integer, Integer>> kingMoves= new ArrayList<Pair<Integer, Integer>>();
	ArrayList<Pair<Integer, Integer>> surroundingSquares= getSurroundingSquares(x, y);
	if(turn) {
		if(!whiteKingHasMoved)
		if(!inCheck(turn)) {
			if(!isCheckSquare(x, y+1, turn)&&!isCheckSquare(x, y+2, turn) && board[x][y+1]==0 && board[x][y+2]==0 && board[x][y+3]==0 && board[0][7]==12)
				kingMoves.add(new Pair(x, y+2));
			if(!isCheckSquare(x, y-1, turn)&&!isCheckSquare(x, y-2, turn) && board[x][y-1]==0 && board[x][y-2]==0 && board[0][0]==12)
				kingMoves.add(new Pair(x, y-2));
		}
	for(int i=0; i<surroundingSquares.size(); i++)
		if(!isCheckSquare(surroundingSquares.get(i).getKey(), surroundingSquares.get(i).getValue(), turn))
			if(!(board[surroundingSquares.get(i).getKey()][surroundingSquares.get(i).getValue()]/10==1))
				kingMoves.add(new Pair(surroundingSquares.get(i).getKey(), surroundingSquares.get(i).getValue()));
	}
	
	if(!turn) {
		if(!blackKingHasMoved)
			if(!inCheck(turn)) {
				if(!isCheckSquare(x, y+1, turn)&&!isCheckSquare(x, y+2, turn) && board[x][y+1]==0 && board[x][y+2]==0 && board[x][y+3]==0 && board[7][7]==22)
					kingMoves.add(new Pair(x, y+2));
				if(!isCheckSquare(x, y-1, turn)&&!isCheckSquare(x, y-2, turn) && board[x][y-1]==0 && board[x][y-2]==0 && board[7][0]==22)
					kingMoves.add(new Pair(x, y-2));
			}
		for(int i=0; i<surroundingSquares.size(); i++)
			if(!isCheckSquare(surroundingSquares.get(i).getKey(), surroundingSquares.get(i).getValue(), turn))
				if(!(board[surroundingSquares.get(i).getKey()][surroundingSquares.get(i).getValue()]/10==2))
					kingMoves.add(new Pair(surroundingSquares.get(i).getKey(), surroundingSquares.get(i).getValue()));
		}
	
	return kingMoves;	
}

private ArrayList<Pair<Integer, Integer>> getSurroundingSquares(int x, int y){ //this also functions as all possible king moves
	ArrayList<Pair<Integer, Integer>> surroundingSquares=new ArrayList<Pair<Integer, Integer>>();
	if(x==7)
		if(y==7) {
			Pair<Integer, Integer> square1=new Pair(x-1, y-1);
			Pair<Integer, Integer> square2=new Pair(x, y-1);
			Pair<Integer, Integer> square3=new Pair(x-1, y);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
		}
		else if(y==0) {
			Pair<Integer, Integer> square1=new Pair(x-1, y+1);
			Pair<Integer, Integer> square2=new Pair(x, y+1);
			Pair<Integer, Integer> square3=new Pair(x-1, y);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
		}
	
		else {
			Pair<Integer, Integer> square1=new Pair(x-1, y-1);
			Pair<Integer, Integer> square2=new Pair(x, y-1);
			Pair<Integer, Integer> square3=new Pair(x-1, y);
			Pair<Integer, Integer> square4=new Pair(x-1, y+1);
			Pair<Integer, Integer> square5=new Pair(x, y+1);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
			surroundingSquares.add(square4);
			surroundingSquares.add(square5);
		}
		
	else if (x==0) {
		if(y==7) {
			Pair<Integer, Integer> square1=new Pair(x+1, y-1);
			Pair<Integer, Integer> square2=new Pair(x, y-1);
			Pair<Integer, Integer> square3=new Pair(x+1, y);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
		}
		
		else if(y==0) {
			Pair<Integer, Integer> square1=new Pair(x+1, y+1);
			Pair<Integer, Integer> square2=new Pair(x, y+1);
			Pair<Integer, Integer> square3=new Pair(x+1, y);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
		}
		
		else {
			Pair<Integer, Integer> square1=new Pair(x+1, y-1);
			Pair<Integer, Integer> square2=new Pair(x, y-1);
			Pair<Integer, Integer> square3=new Pair(x+1, y);
			Pair<Integer, Integer> square4=new Pair(x+1, y+1);
			Pair<Integer, Integer> square5=new Pair(x, y+1);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
			surroundingSquares.add(square4);
			surroundingSquares.add(square5);
		}
			
		}
	else {
		if(y==7) {
			Pair<Integer, Integer> square1=new Pair(x-1, y-1);
			Pair<Integer, Integer> square2=new Pair(x, y-1);
			Pair<Integer, Integer> square3=new Pair(x-1, y);
			Pair<Integer, Integer> square4=new Pair(x+1, y-1);
			Pair<Integer, Integer> square5=new Pair(x+1, y);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
			surroundingSquares.add(square4);
			surroundingSquares.add(square5);
		}
		
		if(y==0) {
			Pair<Integer, Integer> square1=new Pair(x-1, y+1);
			Pair<Integer, Integer> square2=new Pair(x, y+1);
			Pair<Integer, Integer> square3=new Pair(x-1, y);
			Pair<Integer, Integer> square4=new Pair(x+1, y+1);
			Pair<Integer, Integer> square5=new Pair(x+1, y);
			surroundingSquares.add(square1);
			surroundingSquares.add(square2);
			surroundingSquares.add(square3);
			surroundingSquares.add(square4);
			surroundingSquares.add(square5);
		}
		
		else {
				Pair<Integer, Integer> square1=new Pair(x-1, y-1);
				Pair<Integer, Integer> square2=new Pair(x, y-1);
				Pair<Integer, Integer> square3=new Pair(x-1, y);
				Pair<Integer, Integer> square4=new Pair(x+1, y-1);
				Pair<Integer, Integer> square5=new Pair(x+1, y);
				Pair<Integer, Integer> square6=new Pair(x-1, y+1);
				Pair<Integer, Integer> square7=new Pair(x+1, y+1);
				Pair<Integer, Integer> square8=new Pair(x, y+1);
				surroundingSquares.add(square1);
				surroundingSquares.add(square2);
				surroundingSquares.add(square3);
				surroundingSquares.add(square4);
				surroundingSquares.add(square5);
				surroundingSquares.add(square6);
				surroundingSquares.add(square7);
				surroundingSquares.add(square8);
		}
		
	}
	return surroundingSquares;
}

private ArrayList<Pair<Integer, Integer>> getRookMoves(int x, int y, boolean turn){
	ArrayList<Pair<Integer, Integer>>rookMoves = new ArrayList<Pair<Integer, Integer>>();
	
	int originalX=x;
	while(x<7) {
		x++;
		if(board[x][y]==0) {
			rookMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			rookMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}	
	}
	
	x=originalX;
	int originalY=y;
	
	while(y<7) {
		y++;
		if(board[x][y]==0) {
			rookMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			rookMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}	
	}
	
	y=originalY;
	
	while(y>0) {
		y--;
		if(board[x][y]==0) {
			rookMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			rookMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}
	}
	y=originalY;
	
	
	while(x>0) {
		x--;
		if(board[x][y]==0) {
			rookMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			rookMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}	
	}
	
	return rookMoves;
}

private ArrayList<Pair<Integer, Integer>> getBishopMoves(int x, int y, boolean turn){
ArrayList<Pair<Integer, Integer>>bishopMoves = new ArrayList<Pair<Integer, Integer>>();
	
	int originalX=x;
	int originalY=y;
	while(x<7 && y<7) {
		x++;
		y++;
		if(board[x][y]==0) {
			bishopMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			bishopMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}
		
	}
	
	x=originalX;
	y=originalY;
	
	while(x<7 && y>0) {
		x++;
		y--;
		if(board[x][y]==0) {
			bishopMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			bishopMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}
	}
	
	x=originalX;
	y=originalY;
	
	while(x>0 && y>0) {
		x--;
		y--;
		if(board[x][y]==0) {
			bishopMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			bishopMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}
	}
	
	x=originalX;
	y=originalY;
	
	
	while(x>0 && y<7) {
		x--;
		y++;
		if(board[x][y]==0) {
			bishopMoves.add(new Pair(x, y));
		}
		else if((board[x][y]/10==2 && turn) || (board[x][y]/10==1 && !turn)) { //if can capture here
			bishopMoves.add(new Pair(x, y));
			break;
		}
		
		else { //ran into a square of the same color
			protectedSquares[x][y]=true;
			break;
		}
	}
	
	return bishopMoves;
}

private ArrayList<Pair<Integer, Integer>> getQueenMoves(int x, int y, boolean turn){
	ArrayList<Pair<Integer, Integer>> queenMoves=new ArrayList<Pair<Integer, Integer>>();
	queenMoves.addAll(getRookMoves(x, y, turn));
	queenMoves.addAll(getBishopMoves(x, y, turn));
	
	return queenMoves;
}

private ArrayList<Pair<Integer, Integer>> getPawnMoves(int x, int y, boolean turn){
	ArrayList<Pair<Integer, Integer>> pawnMoves=new ArrayList<Pair<Integer, Integer>>();
	
	if(x==1 && turn) {
		if(board[x+1][y]==0 && board[x+2][y]==0)
			pawnMoves.add(new Pair(x+2, y));
	}
	
	if(x==4 && turn && empAble==y+1) {
		pawnMoves.add(new Pair(x+1, y+1));
	}
	
	if(x==4 && turn && empAble==y-1) {
		pawnMoves.add(new Pair(x+1, y-1));
	}
	
	if(x==6 && !turn) {
		if(board[x-1][y]==0 && board[x-2][y]==0)
			pawnMoves.add(new Pair(x-2, y));
	}
	
	if(x==3 && !turn && empAble==y+1) {
		pawnMoves.add(new Pair(x-1, y+1));
	}
	
	if(x==3 && !turn && empAble==y-1) {
		pawnMoves.add(new Pair(x-1, y-1));
	}
	
	if(turn && board[x+1][y]==0)
		pawnMoves.add(new Pair(x+1, y));
	
	if(!turn && board[x-1][y]==0)
		pawnMoves.add(new Pair(x-1, y));
	
	if(turn && y<7 && board[x+1][y+1]/10==2)
		pawnMoves.add(new Pair(x+1, y+1));
	
	if(turn && y>0 && board[x+1][y-1]/10==2)
		pawnMoves.add(new Pair(x+1, y-1));
	
	if(!turn && y<7 && board[x-1][y+1]/10==1)
		pawnMoves.add(new Pair(x-1, y+1));
	
	if(!turn && y>0 && board[x-1][y-1]/10==1)
		pawnMoves.add(new Pair(x-1, y-1));
	
	if(turn) {
		if(y<7) {
			protectedSquares[x+1][y+1]=true;
		}
		if(y>0) {
			protectedSquares[x+1][y-1]=true;
		}
	}
	
	if(!turn) {
		if(y<7) {
			protectedSquares[x-1][y+1]=true;
		}
		if(y>0) {
			protectedSquares[x-1][y-1]=true;
		}
	}
	
	return pawnMoves;
	
}

private ArrayList<Pair<Integer, Integer>> getKnightMoves(int x, int y, boolean turn){
	ArrayList<Pair<Integer, Integer>> knightMoves=new ArrayList<Pair<Integer, Integer>>();
	
	if(x+2<8 && y+1<8) {
		if(turn && (board[x+2][y+1]==0 || board[x+2][y+1]/10==2))
			knightMoves.add(new Pair(x+2, y+1));
		else
			protectedSquares[x+2][y+1]=true;
		if(!turn && (board[x+2][y+1]==0 || board[x+2][y+1]/10==1))
			knightMoves.add(new Pair(x+2, y+1));
		else
			protectedSquares[x+2][y+1]=true;
	}
	
	if(x+1<8 && y+2<8) {
		if(turn && (board[x+1][y+2]==0 || board[x+1][y+2]/10==2))
			knightMoves.add(new Pair(x+1, y+2));
		else
			protectedSquares[x+1][y+2]=true;
		if(!turn && (board[x+1][y+2]==0 || board[x+1][y+2]/10==1))
			knightMoves.add(new Pair(x+1, y+2));
		else
			protectedSquares[x+1][y+2]=true;

	}
	
	if(x+1<8 && y-2>=0) {
		if(turn && (board[x+1][y-2]==0 || board[x+1][y-2]/10==2))
			knightMoves.add(new Pair(x+1, y-2));
		else
			protectedSquares[x+1][y-2]=true;
		if(!turn && (board[x+1][y-2]==0 || board[x+1][y-2]/10==1))
			knightMoves.add(new Pair(x+1, y-2));
		else
			protectedSquares[x+1][y-2]=true;
	}
	
	if(x+2<8 && y-1>=0) {
		if(turn && (board[x+2][y-1]==0 || board[x+2][y-1]/10==2))
			knightMoves.add(new Pair(x+2, y-1));
		else
			protectedSquares[x+2][y-1]=true;
		if(!turn && (board[x+2][y-1]==0 || board[x+2][y-1]/10==1))
			knightMoves.add(new Pair(x+2, y-1));
		else
			protectedSquares[x+2][y-1]=true;
	}
	
	if(x-2>=0 && y+1<8) {
		if(turn && (board[x-2][y+1]==0 || board[x-2][y+1]/10==2))
			knightMoves.add(new Pair(x-2, y+1));
		else
			protectedSquares[x-2][y+1]=true;
		if(!turn && (board[x-2][y+1]==0 || board[x-2][y+1]/10==1))
			knightMoves.add(new Pair(x-2, y+1));
		else
			protectedSquares[x-2][y+1]=true;
	}
	
	if(x-1>=0 && y+2<8) {
		if(turn && (board[x-1][y+2]==0 || board[x-1][y+2]/10==2))
			knightMoves.add(new Pair(x-1, y+2));
		else
			protectedSquares[x-1][y+2]=true;
		if(!turn && (board[x-1][y+2]==0 || board[x-1][y+2]/10==1))
			knightMoves.add(new Pair(x-1, y+2));
		else
			protectedSquares[x-1][y+2]=true;
	}
	
	if(x-1>=0 && y-2>=0) {
		if(turn && (board[x-1][y-2]==0 || board[x-1][y-2]/10==2))
			knightMoves.add(new Pair(x-1, y-2));
		else
			protectedSquares[x-1][y-2]=true;
		if(!turn && (board[x-1][y-2]==0 || board[x-1][y-2]/10==1))
			knightMoves.add(new Pair(x-1, y-2));
		else
			protectedSquares[x-1][y-2]=true;
	}
	
	if(x-2>=0 && y-1>=0) {
		if(turn && (board[x-2][y-1]==0 || board[x-2][y-1]/10==2))
			knightMoves.add(new Pair(x-2, y-1));
		else
			protectedSquares[x-2][y-1]=true;
		if(!turn && (board[x-2][y-1]==0 || board[x-2][y-1]/10==1))
			knightMoves.add(new Pair(x-2, y-1));
		else
			protectedSquares[x-2][y-1]=true;
	}
	
	return knightMoves;
}

private ArrayList<Pair<Integer, Integer>> checkSquares(boolean turn) { //turn is true if white, false if black.  Returns all squares which would leave player of color specified by turn in check if his king were there
	protectedSquares=new boolean[8][8];
	ArrayList<Pair<Integer, Integer>> squaresWithPieces =new ArrayList<Pair<Integer, Integer>>();
	if(!turn)
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board.length; j++)
				if(board[i][j]>=10 && board[i][j]<20) { //if the square has a white piece on it
					if(board[i][j]==10) { //if the square has a king on it
						ArrayList<Pair<Integer, Integer>> sq=getSurroundingSquares(i, j);
						squaresWithPieces.addAll(sq); //add all possible king moves of opponent to check squares array
					}
					else if(board[i][j]==11) {
						ArrayList<Pair<Integer, Integer>> sq=getQueenMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					else if(board[i][j]==12) {
						ArrayList<Pair<Integer, Integer>> sq=getRookMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					
					else if(board[i][j]==13) {
						ArrayList<Pair<Integer, Integer>> sq=getBishopMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					
					else if(board[i][j]==14) {
						ArrayList<Pair<Integer, Integer>> sq=getKnightMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					
					else if(board[i][j]==15) {
						getPawnMoves(i, j, !turn);
						for(int r=0; r<protectedSquares.length; r++)
							for(int c=0; c<protectedSquares[r].length; c++)
								if(protectedSquares[r][c])
									squaresWithPieces.add(new Pair(r,c));
							
					}
					
					
			}
	if(turn)
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board.length; j++)
				if(board[i][j]>=10 && board[i][j]<20) { //if the square has a white piece on it
					if(board[i][j]==20) { //if the square has a king on it
						ArrayList<Pair<Integer, Integer>> sq=getSurroundingSquares(i, j);
						squaresWithPieces.addAll(sq); //add all possible king moves of opponent to check squares array
					}
					else if(board[i][j]==21) {
						ArrayList<Pair<Integer, Integer>> sq=getQueenMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					else if(board[i][j]==22) {
						ArrayList<Pair<Integer, Integer>> sq=getRookMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					
					else if(board[i][j]==23) {
						ArrayList<Pair<Integer, Integer>> sq=getBishopMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					
					else if(board[i][j]==24) {
						ArrayList<Pair<Integer, Integer>> sq=getKnightMoves(i, j, !turn);
						squaresWithPieces.addAll(sq);
					}
					
					else if(board[i][j]==25) {
						getPawnMoves(i, j, !turn);
						for(int r=0; r<protectedSquares.length; r++)
							for(int c=0; c<protectedSquares[r].length; c++)
								if(protectedSquares[r][c])
									squaresWithPieces.add(new Pair(r,c));
							
					}
					
					
			}
	return squaresWithPieces;
}

public boolean isCheckSquare(int x, int y, boolean turn) {
	ArrayList<Pair<Integer, Integer>> checks= checkSquares(turn);
	if(checks.contains(new Pair(x, y)))
		return true;
	return false;
}

private boolean moveKing(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getKingMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		board[newX][newY]=board[curX][curY];
		board[curX][curY]=0;
		empAble=-2;
		return true;
	}
}

private boolean canMoveKing(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getKingMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		return true;
	}
}

private boolean moveQueen(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getQueenMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		board[newX][newY]=board[curX][curY];
		board[curX][curY]=0;
		empAble=-2;
		return true;
	}
}

private boolean canMoveQueen(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getQueenMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		return true;
	}
}

private boolean moveRook(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getRookMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		board[newX][newY]=board[curX][curY];
		board[curX][curY]=0;
		empAble=-2;
		return true;
	}
}

private boolean canMoveRook(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getRookMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		return true;
	}
}

private boolean moveBishop(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getBishopMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		board[newX][newY]=board[curX][curY];
		board[curX][curY]=0;
		return true;
	}
}

private boolean canMoveBishop(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getBishopMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		return true;
	}
}

private boolean moveKnight(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getKnightMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		board[newX][newY]=board[curX][curY];
		board[curX][curY]=0;
		empAble=-2;
		return true;
	}
}

private boolean canMoveKnight(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getKnightMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		return true;
	}
}

private boolean movePawn(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getPawnMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		if(turn && newX==5 && newY==empAble)
			board[curX][newY]=0;
		board[newX][newY]=board[curX][curY];
		board[curX][curY]=0;
		if(newX==(curX+2) || newX==(curX-2))
			empAble=newY;
		else
			empAble=-2;
		return true;
	}
}

private boolean canMovePawn(int curX, int curY, int newX, int newY, boolean turn) {//returns true if successful move, else returns false
	if(!getPawnMoves(curX, curY, turn).contains(new Pair(newX, newY)))
		return false;
	else {
		return true;
	}
}

public boolean makeMove(int curX, int curY, int newX, int newY) {//returns true if move was made successfully, else returns false
	if(board[curX][curY]/10==2) {
		if(board[curX][curY]%10==0) {
			boolean blackKingPlace=moveKing(curX, curY, newX, newY, false);
			if(!blackKingHasMoved)
				blackKingHasMoved=blackKingPlace;
			if(blackKingPlace && (newY-curY>1)) {
				board[curX][(curY+newY)/2]=board[curX][7];
				board[curX][7]=0;
			}
			else if(blackKingPlace && (curY-newY>1)) {
				board[curX][(curY+newY)/2]=board[curX][0];
				board[curX][0]=0;
			}
			return blackKingPlace;
		}
		else if(board[curX][curY]%10==1)
			return moveQueen(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==2)
			return moveRook(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==3)
			return moveBishop(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==4)
			return moveKnight(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==5)
			return movePawn(curX, curY, newX, newY, false);
	}
	
	else if(board[curX][curY]/10==1) {
		if(board[curX][curY]%10==0) {
			boolean whiteKingPlace=moveKing(curX, curY, newX, newY, true);
			if(!whiteKingHasMoved)
				whiteKingHasMoved=whiteKingPlace;
			if(whiteKingPlace && (newY-curY>1)) {
				board[curX][(curY+newY)/2]=board[curX][7];
				board[curX][7]=0;
			}
			else if(whiteKingPlace && (curY-newY>1)) {
				board[curX][(curY+newY)/2]=board[curX][0];
				board[curX][0]=0;
			}
			return whiteKingPlace;
		}
		else if(board[curX][curY]%10==1)
			return moveQueen(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==2)
			return moveRook(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==3)
			return moveBishop(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==4)
			return moveKnight(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==5)
			return movePawn(curX, curY, newX, newY, true);
	}

	return false;
}


public boolean canMakeMove(int curX, int curY, int newX, int newY) {//returns true if move was made successfully, else returns false

	if(!whiteToMove && board[curX][curY]/10==2) {
		if(board[curX][curY]%10==0)
			return canMoveKing(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==1)
			return canMoveQueen(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==2)
			return canMoveRook(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==3)
			return canMoveBishop(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==4)
			return canMoveKnight(curX, curY, newX, newY, false);
		else if(board[curX][curY]%10==5)
			return canMovePawn(curX, curY, newX, newY, false);
	}
	
	else if(whiteToMove && board[curX][curY]/10==1) {
		if(board[curX][curY]%10==0)
			return canMoveKing(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==1)
			return canMoveQueen(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==2)
			return canMoveRook(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==3)
			return canMoveBishop(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==4)
			return canMoveKnight(curX, curY, newX, newY, true);
		else if(board[curX][curY]%10==5)
			return canMovePawn(curX, curY, newX, newY, true);
	}

	return false;
}


private void promotion(int x, int y, int valueOfNewPiece) { //value of new piece is 21 if black queen, 11 if white queen...
	board[x][y]=valueOfNewPiece;
}


public boolean inCheck(boolean turn){
	int x=0;
	int y=0;
	if(turn) {
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(board[i][j]==10) {
					x=i;
					y=j;
				}
	}
	
	if(!turn) {
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(board[i][j]==20) {
					x=i;
					y=j;
				}
	}
	
	if(isCheckSquare(x, y, turn))
		return true;
	return false;
}

private ArrayList<Pair<Integer, Integer>> getOutOfCheckMovesKing(boolean turn){
	ArrayList<Pair<Integer, Integer>> moves=new ArrayList<Pair<Integer, Integer>>();
	int x=0;
	int y=0;
	if(turn) {
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(board[i][j]==10) {
					x=i;
					y=j;
				}
	}
	
	if(!turn) {
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(board[i][j]==20) {
					x=i;
					y=j;
				}
	}
	
	ArrayList<Pair<Integer, Integer>> outOfCheckSquares = checkSquares(turn);
	for(int i=0; i<getKingMoves(x, y, turn).size(); i++)
		if(!(outOfCheckSquares.contains(getKingMoves(x, y, turn).get(i))))
			moves.add(getKingMoves(x, y, turn).get(i));
	
	return moves;
}

public String getBoard() {
	String str="";
	for(int i=0; i<board.length; i++)
		for(int j=0; j<board[i].length; j++)
			if(board[i][j]>=10)
				str+=board[i][j];
			else
				str+=30;//30 indicates no piece
	return str;
}

private ArrayList<ArrayList<Pair<Integer, Integer>>> getOutOfCheckOtherMoves(boolean turn){ //an array list of arraylist of moves.  in first array list are queen moves, then rook, then bishop, then knight, then pawn
	int[][] boardCopy=new int[board.length][board[0].length];
	ArrayList<ArrayList<Pair<Integer, Integer>>> moves=new ArrayList<ArrayList<Pair<Integer, Integer>>>();
	for(int i=1; i<=5; i++)
		moves.add(new ArrayList<Pair<Integer, Integer>>());
	for(int i=0; i<board.length; i++)
		for(int j=0; j<board[i].length; j++)
			boardCopy[i][j]=board[i][j];
	if(turn) {
	for(int i=0; i<board.length; i++)
		for(int j=0; j<board[i].length; j++)
			if(board[i][j]==11) {
				for(int r=0; r<getQueenMoves(i, j, turn).size(); r++) {				
					boolean mno=false;
					moveQueen(i, j, getQueenMoves(i, j, turn).get(r).getKey(), getQueenMoves(i, j, turn).get(r).getValue(), turn);
					if(!inCheck(turn))
						mno=true;
					for(int m=0; m<boardCopy.length; m++)
						for(int n=0; n<boardCopy[m].length; n++)
							board[m][n]=boardCopy[m][n];
					if(mno) {
						moves.get(0).add(getQueenMoves(i, j, turn).get(r));
						System.out.println(getQueenMoves(i, j, turn).get(r).getKey()+" "+getQueenMoves(i, j, turn).get(r).getValue());
					}
				}
			}
			else if(board[i][j]==12) {
		for(int r=0; r<getRookMoves(i, j, turn).size(); r++) {				
			boolean mno=false;
			moveRook(i, j, getRookMoves(i, j, turn).get(r).getKey(), getRookMoves(i, j, turn).get(r).getValue(), turn);
			if(!inCheck(turn))
				mno=true;
			for(int m=0; m<boardCopy.length; m++)
				for(int n=0; n<boardCopy[m].length; n++)
					board[m][n]=boardCopy[m][n];
			if(mno)
				moves.get(1).add(getRookMoves(i, j, turn).get(r));

		}
	}
	
			else if(board[i][j]==13) {
		for(int r=0; r<getBishopMoves(i, j, turn).size(); r++) {				
			boolean mno=false;
			moveBishop(i, j, getBishopMoves(i, j, turn).get(r).getKey(), getBishopMoves(i, j, turn).get(r).getValue(), turn);
			if(!inCheck(turn))
				mno=true;
			for(int m=0; m<boardCopy.length; m++)
				for(int n=0; n<boardCopy[m].length; n++)
					board[m][n]=boardCopy[m][n];
			if(mno)
			moves.get(2).add(getBishopMoves(i, j, turn).get(r));

		}
	}
	
			else if(board[i][j]==14) {
		for(int r=0; r<getKnightMoves(i, j, turn).size(); r++) {				
			boolean mno=false;
			moveKnight(i, j, getKnightMoves(i, j, turn).get(r).getKey(), getKnightMoves(i, j, turn).get(r).getValue(), turn);
			if(!inCheck(turn))
				mno=true;
			for(int m=0; m<boardCopy.length; m++)
				for(int n=0; n<boardCopy[m].length; n++)
					board[m][n]=boardCopy[m][n];
			if(mno)
				moves.get(3).add(getKnightMoves(i, j, turn).get(r));

		}
	}
			else if(board[i][j]==15) {
		for(int r=0; r<getPawnMoves(i, j, turn).size(); r++) {				
			boolean mno=false;
			movePawn(i, j, getPawnMoves(i, j, turn).get(r).getKey(), getPawnMoves(i, j, turn).get(r).getValue(), turn);
			if(!inCheck(turn))
				mno=true;
			for(int m=0; m<boardCopy.length; m++)
				for(int n=0; n<boardCopy[m].length; n++)
					board[m][n]=boardCopy[m][n];
			if(mno)
				moves.get(4).add(getPawnMoves(i, j, turn).get(r));

		}
	}
	
				
	}

	if(!turn) {
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(board[i][j]==21) {
					
					for(int r=0; r<getQueenMoves(i, j, turn).size(); r++) {
						boolean mno=false;
						moveQueen(i, j, getQueenMoves(i, j, turn).get(r).getKey(), getQueenMoves(i, j, turn).get(r).getValue(), turn);
						if(!inCheck(turn))
							mno=true;
						for(int m=0; m<boardCopy.length; m++)
							for(int n=0; n<boardCopy[m].length; n++)
								board[m][n]=boardCopy[m][n];
						if(mno) {
							moves.get(0).add(getQueenMoves(i, j, turn).get(r));
						}
					}
				}
				else if(board[i][j]==22) {
			for(int r=0; r<getRookMoves(i, j, turn).size(); r++) {					
				boolean mno=false;
				moveRook(i, j, getRookMoves(i, j, turn).get(r).getKey(), getRookMoves(i, j, turn).get(r).getValue(), turn);
				if(!inCheck(turn))
					mno=true;
				for(int m=0; m<boardCopy.length; m++)
					for(int n=0; n<boardCopy[m].length; n++)
						board[m][n]=boardCopy[m][n];
				if(mno)
					moves.get(1).add(getRookMoves(i, j, turn).get(r));

			}
		}
		
				else if(board[i][j]==23) {
			for(int r=0; r<getBishopMoves(i, j, turn).size(); r++) {					
				boolean mno=false;
				moveBishop(i, j, getBishopMoves(i, j, turn).get(r).getKey(), getBishopMoves(i, j, turn).get(r).getValue(), turn);
				if(!inCheck(turn))
					mno=true;
				for(int m=0; m<boardCopy.length; m++)
					for(int n=0; n<boardCopy[m].length; n++)
						board[m][n]=boardCopy[m][n];
				if(mno)
					moves.get(2).add(getBishopMoves(i, j, turn).get(r));

			}
		}
		
				else if(board[i][j]==24) {
			for(int r=0; r<getKnightMoves(i, j, turn).size(); r++) {					
				boolean mno=false;
				moveKnight(i, j, getKnightMoves(i, j, turn).get(r).getKey(), getKnightMoves(i, j, turn).get(r).getValue(), turn);
				if(!inCheck(turn))
					mno=true;
				for(int m=0; m<boardCopy.length; m++)
					for(int n=0; n<boardCopy[m].length; n++)
						board[m][n]=boardCopy[m][n];
				if(mno)
					moves.get(3).add(getKnightMoves(i, j, turn).get(r));
			}
		}
				else if(board[i][j]==25) {
			for(int r=0; r<getPawnMoves(i, j, turn).size(); r++) {					
				boolean mno=false;
				movePawn(i, j, getPawnMoves(i, j, turn).get(r).getKey(), getPawnMoves(i, j, turn).get(r).getValue(), turn);
				if(!inCheck(turn))
					mno=true;
				for(int m=0; m<boardCopy.length; m++)
					for(int n=0; n<boardCopy[m].length; n++)
						board[m][n]=boardCopy[m][n];
				if(mno)
					moves.get(4).add(getPawnMoves(i, j, turn).get(r));
			}
		}
	}
	return moves;
}

public boolean inCheckmate(boolean turn) {
	if(inCheck(turn) && getOutOfCheckOtherMoves(turn).get(0).size()==0 && getOutOfCheckOtherMoves(turn).get(1).size()==0 && getOutOfCheckOtherMoves(turn).get(2).size()==0 && getOutOfCheckOtherMoves(turn).get(3).size()==0 && getOutOfCheckOtherMoves(turn).get(4).size()==0 && getOutOfCheckMovesKing(turn).size()==0)
		return true;
	return false;
}

public boolean makeMoveOutOfCheck(int curX, int curY, int newX, int newY, boolean turn) {
	ArrayList<Pair<Integer, Integer>> moves=new ArrayList<Pair<Integer, Integer>>();
	moves.addAll(getOutOfCheckMovesKing(turn));
	if(board[curX][curY]%10==0 && board[curX][curY]>0 && moves.contains(new Pair(newX, newY))) {
		return makeMove(curX, curY, newX, newY);
	}
	for(int i=0; i<getOutOfCheckOtherMoves(turn).size(); i++) {
		if(board[curX][curY]%10==i+1)
			if(getOutOfCheckOtherMoves(turn).get(i).contains(new Pair(newX, newY)))
				return makeMove(curX, curY, newX, newY);
	}
	return false;
}


public boolean canMakeMoveOutOfCheck(int curX, int curY, int newX, int newY, boolean turn) {
	ArrayList<Pair<Integer, Integer>> moves=new ArrayList<Pair<Integer, Integer>>();
	moves.addAll(getOutOfCheckMovesKing(turn));
	if(board[curX][curY]%10==0 && board[curX][curY]>0 && moves.contains(new Pair(newX, newY))) {
		return canMakeMove(curX, curY, newX, newY);
	}
	for(int i=0; i<getOutOfCheckOtherMoves(turn).size(); i++) {
		if(board[curX][curY]%10==i+1)
			if(getOutOfCheckOtherMoves(turn).get(i).contains(new Pair(newX, newY)))
				return canMakeMove(curX, curY, newX, newY);
	}
	return false;
}

public boolean inStalemate(boolean turn) {
	if(turn) {
	for(int i=0; i<board.length; i++)
		for(int j=0; j<board[i].length; j++)
			if(board[i][j]==10) {
				if(getKingMoves(i, j, turn).size()!=0)
					return false;
			}
			else if(board[i][j]==11) {
				if(getQueenMoves(i, j, turn).size()!=0)
					return false;
			}
			else if(board[i][j]==12) {
				if(getRookMoves(i, j, turn).size()!=0)
					return false;
			}
			else if(board[i][j]==13) {
				if(getBishopMoves(i, j, turn).size()!=0)
					return false;
			}
			else if(board[i][j]==14) {
				if(getKnightMoves(i, j, turn).size()!=0)
					return false;
			}
			else if(board[i][j]==15) {
				if(getPawnMoves(i, j, turn).size()!=0)
					return false;
			}	
	}
	
	if(!turn) {
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(board[i][j]==20) {
					if(getKingMoves(i, j, turn).size()!=0)
						return false;
				}
				else if(board[i][j]==21) {
					if(getQueenMoves(i, j, turn).size()!=0)
						return false;
				}
				else if(board[i][j]==22) {
					if(getRookMoves(i, j, turn).size()!=0)
						return false;
				}
				else if(board[i][j]==23) {
					if(getBishopMoves(i, j, turn).size()!=0)
						return false;
				}
				else if(board[i][j]==24) {
					if(getKnightMoves(i, j, turn).size()!=0)
						return false;
				}
				else if(board[i][j]==25) {
					if(getPawnMoves(i, j, turn).size()!=0)
						return false;
				}	
		}	
	return true;
	
}

private void gameLoop() {
	setUpGame();
	boolean turn=true;
	whiteToMove=turn;
	Scanner kb=new Scanner(System.in);
	displayBoard();
	while(!inStalemate(turn) && !inCheckmate(turn)) {
		if(!inCheck(turn)){
		String currentSquare=kb.next();
		String newSquare=kb.next();
		int curX=Integer.parseInt(currentSquare.substring(1,2))-1;
		int curY="abcdefgh".indexOf(currentSquare.substring(0,1));
		int newX=Integer.parseInt(newSquare.substring(1,2))-1;
		int newY="abcdefgh".indexOf(newSquare.substring(0,1));
		while((((turn && board[curX][curY]/10!=1)||(!turn && board[curX][curY]/10!=2)) || ((turn && board[curX][curY]/10==1) || (!turn && board[curX][curY]/10==2)) && !makeMove(curX, curY, newX, newY))) {
			currentSquare=kb.next();
			newSquare=kb.next();
			curX=Integer.parseInt(currentSquare.substring(1,2))-1;
			curY="abcdefgh".indexOf(currentSquare.substring(0,1));
			newX=Integer.parseInt(newSquare.substring(1,2))-1;
			newY="abcdefgh".indexOf(newSquare.substring(0,1));
		}
		}
		else {
			String currentSquare=kb.next();
			String newSquare=kb.next();
			int curX=Integer.parseInt(currentSquare.substring(1,2))-1;
			int curY="abcdefgh".indexOf(currentSquare.substring(0,1));
			int newX=Integer.parseInt(newSquare.substring(1,2))-1;
			int newY="abcdefgh".indexOf(newSquare.substring(0,1));
			while((((turn && board[curX][curY]/10!=1)||(!turn && board[curX][curY]/10!=2)) || ((turn && board[curX][curY]/10==1) || (!turn && board[curX][curY]/10==2)) && !makeMoveOutOfCheck(curX, curY, newX, newY, turn))) {
				currentSquare=kb.next();
				newSquare=kb.next();
				curX=Integer.parseInt(currentSquare.substring(1,2))-1;
				curY="abcdefgh".indexOf(currentSquare.substring(0,1));
				newX=Integer.parseInt(newSquare.substring(1,2))-1;
				newY="abcdefgh".indexOf(newSquare.substring(0,1));
			}
		}
		displayBoard();
		turn=!turn;
		whiteToMove=!whiteToMove;
	}
}

public ArrayList<String> allPossibleMoves(boolean turn) {
	ArrayList<String>movesPossible=new ArrayList<String>();
		for(int i=0; i<board.length; i++)
			for(int j=0; j<board[i].length; j++)
				if(turn && board[i][j]/10==1) {
					if(board[i][j]%10==0)
						for(int k=0; k<getKingMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getKingMoves(i, j, turn).get(k).getKey()+getKingMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==1)
						for(int k=0; k<getQueenMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getQueenMoves(i, j, turn).get(k).getKey()+getQueenMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==2)
						for(int k=0; k<getRookMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getRookMoves(i, j, turn).get(k).getKey()+getRookMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==3)
						for(int k=0; k<getBishopMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getBishopMoves(i, j, turn).get(k).getKey()+getBishopMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==4)
						for(int k=0; k<getKnightMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getKnightMoves(i, j, turn).get(k).getKey()+getKnightMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==5)
						for(int k=0; k<getPawnMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getPawnMoves(i, j, turn).get(k).getKey()+getPawnMoves(i, j, turn).get(k).getValue());

				}
				else if(!turn && board[i][j]/10==2) {
					if(board[i][j]%10==0)
						for(int k=0; k<getKingMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getKingMoves(i, j, turn).get(k).getKey()+getKingMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==1)
						for(int k=0; k<getQueenMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getQueenMoves(i, j, turn).get(k).getKey()+getQueenMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==2)
						for(int k=0; k<getRookMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getRookMoves(i, j, turn).get(k).getKey()+getRookMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==3)
						for(int k=0; k<getBishopMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getBishopMoves(i, j, turn).get(k).getKey()+getBishopMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==4)
						for(int k=0; k<getKnightMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getKnightMoves(i, j, turn).get(k).getKey()+getKnightMoves(i, j, turn).get(k).getValue());
					else if(board[i][j]%10==5)
						for(int k=0; k<getPawnMoves(i, j, turn).size(); k++)
							movesPossible.add(""+i+j+getPawnMoves(i, j, turn).get(k).getKey()+getPawnMoves(i, j, turn).get(k).getValue());

	}
		if(!inCheck(turn)) {
	for(int i=movesPossible.size()-1; i>=0; i--)
		if(!canMakeMove(Integer.parseInt(movesPossible.get(i).substring(0,1)), Integer.parseInt(movesPossible.get(i).substring(1,2)), Integer.parseInt(movesPossible.get(i).substring(2,3)), Integer.parseInt(movesPossible.get(i).substring(3,4))))
			movesPossible.remove(i);
		else {
			boolean hello=false;
			int start=board[Integer.parseInt(movesPossible.get(i).substring(0,1))][Integer.parseInt(movesPossible.get(i).substring(1,2))];
			int end=board[Integer.parseInt(movesPossible.get(i).substring(2,3))][Integer.parseInt(movesPossible.get(i).substring(3,4))];
			board[Integer.parseInt(movesPossible.get(i).substring(2,3))][Integer.parseInt(movesPossible.get(i).substring(3,4))]=start;
			board[Integer.parseInt(movesPossible.get(i).substring(0,1))][Integer.parseInt(movesPossible.get(i).substring(1,2))]=0;
			if(inCheck(turn))
				hello=true;
			board[Integer.parseInt(movesPossible.get(i).substring(2,3))][Integer.parseInt(movesPossible.get(i).substring(3,4))]=end;
			board[Integer.parseInt(movesPossible.get(i).substring(0,1))][Integer.parseInt(movesPossible.get(i).substring(1,2))]=start;
			if(hello)
				movesPossible.remove(i);
		}
		}
		
		else {
			displayBoard();
			System.out.println(movesPossible);
				for(int i=movesPossible.size()-1; i>=0; i--)
					if(!canMakeMoveOutOfCheck(Integer.parseInt(movesPossible.get(i).substring(0,1)), Integer.parseInt(movesPossible.get(i).substring(1,2)), Integer.parseInt(movesPossible.get(i).substring(2,3)), Integer.parseInt(movesPossible.get(i).substring(3,4)), turn))
						movesPossible.remove(i);
					else
						System.out.println(canMakeMoveOutOfCheck(Integer.parseInt(movesPossible.get(i).substring(0,1)), Integer.parseInt(movesPossible.get(i).substring(1,2)), Integer.parseInt(movesPossible.get(i).substring(2,3)), Integer.parseInt(movesPossible.get(i).substring(3,4)), turn));
		}
		//problem here still
		
	
	return movesPossible;
		
}

public void displayBoard() {
	for(int i=0; i<board.length; i++) {
		for(int j=0; j<board[i].length; j++)
			if(board[i][j]==10)
				System.out.print("WK ");
			else if(board[i][j]==11)
				System.out.print("WQ ");
			else if(board[i][j]==12)
				System.out.print("WR ");
			else if(board[i][j]==13)
				System.out.print("WB ");
			else if(board[i][j]==14)
				System.out.print("WN ");
			else if(board[i][j]==15)
				System.out.print("WP ");
			else if(board[i][j]==20)
				System.out.print("BK ");
			else if(board[i][j]==21)
				System.out.print("BQ ");
			else if(board[i][j]==22)
				System.out.print("BR ");
			else if(board[i][j]==23)
				System.out.print("BB ");
			else if(board[i][j]==24)
				System.out.print("BN ");
			else if(board[i][j]==25)
				System.out.print("BP ");
			else
				System.out.print("-- ");
		System.out.println();
	}
		System.out.println(getOutOfCheckOtherMoves(false));
	System.out.println(getKingMoves(1,5,true));
	System.out.println(checkSquares(true));
	System.out.println(getSurroundingSquares(1,5));
}

public void playGame() {
	gameLoop();
}


}

//still need to implement en passant, castling, promotion, how to handle if player is in check/checkmate, and actually moving pieces throughout the game
