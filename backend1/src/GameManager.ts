import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager
{
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor()
    {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket)
    {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket: WebSocket)
    {
        this.users = this.users.filter(user => user !== socket);
        //stop the game because user left the game 
    
    }

    private addHandler(socket:WebSocket)
    {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === INIT_GAME)
            {
                if (this.pendingUser)
                {
                    //if there was a pending user you start the game
                    //intialize a game class and everything intital state 
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                } else {
                    this.pendingUser = socket;
                   }
            }
            if (message.type === MOVE)
            {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game)
                {   
                     console.log("make move function is called on add handler ");
                    game.makeMove(socket,message.move);
                }
            }
        })

    }
}