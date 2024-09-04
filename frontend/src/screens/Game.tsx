import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard"
import { useSocket } from "../hooks/useSocket";
import { Chess } from 'chess.js';
//TODO: MOVE TOGETHER , THERE'S CODE REPEATED HERE 
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

export const Game = () => {
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board());

    useEffect(() => { 
        if (!socket)
        {
            return;
        }
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            switch (message.type)
            {
                case INIT_GAME:
                    setChess(new Chess());
                    setBoard(chess.board());
                    console.log("game initialized");
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move made");
                    break;
                case GAME_OVER:
                    console.log("Game Over ");
                    break;
            }
        }
    }, [socket]);
    if(!socket)return <div>connecting ...</div>
    return <>
        <div className="justify-center flex">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <ChessBoard board={board}></ChessBoard>
                    </div>
                    <div>
                         <Button onClick={() => {
                            socket.send(JSON.stringify({
                                type:INIT_GAME
                            }))
                            }}>Play Online</Button>
                    </div>
                </div>
            </div>
        </div>
    </>
}