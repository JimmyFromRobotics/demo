
              package com.example.demo;
              import org.springframework.boot.SpringApplication;
              import org.springframework.boot.autoconfigure.SpringBootApplication;
              import org.springframework.web.bind.annotation.GetMapping;
              import org.springframework.web.bind.annotation.RequestParam;
              import org.springframework.web.bind.annotation.RestController;
              import org.apache.commons.math3.util.Pair;
              import org.json.*; 
              import java.lang.reflect.*;
              import io.netty.buffer.ByteBuf;
              import io.netty.util.CharsetUtil;
              import com.corundumstudio.socketio.listener.*;
              import com.corundumstudio.socketio.*;
              import java.util.ArrayList;

              @SpringBootApplication
              @RestController
              public class DemoApplication {
            	  //idea: pass gameNumber to frontend when user joins.  For each funcion call, the user then passes its gameNumber back
                  public static void main(String[] args) {
                	  if(!Juegos.serverStarted)
                		  Juegos.setUpServer();
                  SpringApplication.run(DemoApplication.class, args);

                  Juegos.server.addConnectListener(
                      (client) -> {
                          System.out.println("Client has Connected!");
                          
                          System.out.println(Juegos.gameNumbers);
                          if((Juegos.numPlayers-1)%4==0) {
                        	  Juegos.addGame();
                          }
                          System.out.println("increase "+ Juegos.gameNumbers);
                          client.joinRoom(Integer.toString(Juegos.gameNumbers));
                  });

                  Juegos.server.addDisconnectListener(
                          (client) -> {
                              System.out.println("Client has disConnected!");
                        	  Juegos.server.getRoomOperations(Integer.toString(0)).sendEvent("disconnect");

                      });

                  Juegos.server.addEventListener("MESSAGE", String.class, 
                      (client, message, ackRequest) -> {
                          System.out.println("Client said: " + message);
                  });
                  System.out.println(Juegos.server.getAllClients());
                  if(!Juegos.serverStarted) {
                  Juegos.server.start();
                  Juegos.serverStarted=true;
                  }
                  
                  
                  
                  }
                  
                  @GetMapping("/api/playerNumber")
                  public int getPlayerNumber() {
                	  System.out.println(Juegos.numPlayers);
                	  Juegos.numPlayers++;
                	  System.out.println("PlayerNumber: "+(Juegos.numPlayers-1));
                	  return (Juegos.numPlayers-1)%4;
                  }
                  
                  @GetMapping("/api/gameNumber")
                  public int getGameNumber() {
                	  return Juegos.gameNumbers;
                  }
                  
                  @GetMapping("/api/whiteCastle")
                  public void whiteCastle(@RequestParam(value = "position", defaultValue = "1176") String position,  @RequestParam(value = "gameNumber", defaultValue = "1176") String gameNumbero) {
                	  int gameNumber=Integer.parseInt(gameNumbero);
                	  if(!Juegos.whiteKingCastled.get(gameNumber)) {
                	  Juegos.arr.get(gameNumber).displayBoard();  
                	  Juegos.whiteKingCastled.set(gameNumber, true);
                	  Juegos.server.getRoomOperations(Integer.toString(gameNumber)).sendEvent("whiteCastlePlayer2Only", position);
                  
                	  }
                  }
                  
                  @GetMapping("/api/blackCastle")
                  public void blackCastle(@RequestParam(value = "position", defaultValue = "1176") String position, @RequestParam(value = "gameNumber", defaultValue = "1176") String gameNumbero) {
                	  int gameNumber=Integer.parseInt(gameNumbero);
                	  if(!Juegos.blackKingCastled.get(gameNumber)) {
                	  Juegos.blackKingCastled.set(gameNumber, true);
                	  Juegos.server.getRoomOperations(Integer.toString(gameNumber)).sendEvent("blackCastlePlayer4Only", position);
                	  }
                  }
                
                  
                  @GetMapping("/api/canMakeMove")
                  public String canMakeMove(@RequestParam(value = "position", defaultValue = "1176") String position, @RequestParam(value = "gameNumber", defaultValue = "1176") String gameNumbero) {//position is 4 digits (start x+start y+end x+end y)
                	  int gameNumber=Integer.parseInt(gameNumbero);
                	  return Boolean.toString(Juegos.arr.get(gameNumber).canMakeMove(Integer.parseInt(position.substring(0,1)), Integer.parseInt(position.substring(1,2)), Integer.parseInt(position.substring(2,3)), Integer.parseInt(position.substring(3,4))));
                  }
                  
                  
                  
                  
                  @GetMapping("/api/chosenPiece")
                  public void chosenPiece(@RequestParam(value = "position", defaultValue = "1176") String position, @RequestParam(value = "gameNumber", defaultValue = "1176") String gameNumbero) {//position is 4 digits (start x+start y+end x+end y)
                	  int gameNumber=Integer.parseInt(gameNumbero);
                	  System.out.println(gameNumber);
                	  Juegos.server.getRoomOperations(Integer.toString(gameNumber)).sendEvent("event2", position);
                  }
                  @GetMapping("/api/makeMove")
                  public String makeMove(@RequestParam(value = "position", defaultValue = "1176") String position, @RequestParam(value = "gameNumber", defaultValue = "1176") String gameNumbero) {//position is 4 digits (start x+start y+end x+end y)
                	  int gameNumber=Integer.parseInt(gameNumbero);
                	  System.out.println(position);
                	  System.out.println(gameNumber);
                	  System.out.println(Juegos.arr.size());
                	  System.out.println(Juegos.server.getClient(Juegos.server.getAllClients().iterator().next().getSessionId()));
                	  String str="";
                	  Juegos.arr.get(gameNumber).makeMove(Integer.parseInt(position.substring(0,1)), Integer.parseInt(position.substring(1,2)), Integer.parseInt(position.substring(2,3)), Integer.parseInt(position.substring(3,4)));
                	  Juegos.turns.set(gameNumber,!Juegos.turns.get(gameNumber));
                	  Juegos.arr.get(gameNumber).whiteToMove=!Juegos.arr.get(gameNumber).whiteToMove;
                	  
                	  for(int i=0; i<Juegos.arr.get(gameNumber).allPossibleMoves(Juegos.turns.get(gameNumber)).size(); i++) {
                			  str+=Juegos.arr.get(gameNumber).allPossibleMoves(Juegos.turns.get(gameNumber)).get(i);
                			  if(i!=Juegos.arr.get(gameNumber).allPossibleMoves(Juegos.turns.get(gameNumber)).size()-1)
                				  str+=" ";
                	  }
                	  System.out.println(Juegos.arr.get(gameNumber).allPossibleMoves(Juegos.turns.get(gameNumber)));
                	  System.out.println(str);
                	  //return str;
                	 // return str;
                	  Juegos.server.getRoomOperations(Integer.toString(gameNumber)).sendEvent("event", position+str);

                	  return str;
                	 
                  }
                  
                  
                  
                
              }
              
class Juegos{
	public static ArrayList<chess>arr=new ArrayList<chess>();
	public static ArrayList<Boolean>turns=new ArrayList<Boolean>();
	public static int numPlayers=0;
	public static boolean serverStarted=false;
	public static int gameNumbers=-1;
	public static SocketIOServer server;
	public static ArrayList<Boolean>whiteKingCastled=new ArrayList<Boolean>();
	public static ArrayList<Boolean>blackKingCastled=new ArrayList<Boolean>();
	public static void setUpServer() {
		Configuration config = new Configuration();
        config.setPort(5000);
        config.setHostname("localhost");
        server = new SocketIOServer(config);
	}
	public static void addGame() {
	gameNumbers++;
	System.out.println("added game");
	chess p=new chess();
	p.setUpGame();
	arr.add(p);
	turns.add(true);
	whiteKingCastled.add(false);
	blackKingCastled.add(false);	}
}
            