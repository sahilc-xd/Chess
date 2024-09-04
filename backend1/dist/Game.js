"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        //let both players know that game has started
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        console.log("make move function is called");
        // step 1 validation make sure the is it this users move
        // ste2 is the move valid 
        //validate the type of move using zod
        if (this.moveCount % 2 == 0 && socket !== this.player1) {
            //even move is for player 2
            return;
        }
        if (this.moveCount % 2 == 1 && socket != this.player2) {
            //odd move is for player 1
            return;
        }
        console.log("game ran till here1 ");
        try {
            this.board.move(move);
            //library will update the move 
        }
        catch (e) {
            console.log(e);
            return;
        }
        console.log("game ran tilll here 2");
        //check if the game is voer 
        if (this.board.isGameOver()) {
            //send over game msg to both player
            this.player1.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white"
                }
            }));
            return;
        }
        //if the game is not over tell the other player move has been played
        console.log("game also reach till here");
        if (this.moveCount % 2 === 0) {
            console.log("reached here player 2");
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        else {
            console.log("reached here player 1");
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                payload: move
            }));
        }
        this.moveCount++;
        // sended updated board to both players
    }
}
exports.Game = Game;
