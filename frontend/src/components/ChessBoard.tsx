import { Color, PieceSymbol, Square, SQUARES } from "chess.js"

export const ChessBoard = ({ board }: {
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]
}) => { 
    return <div>
        chess
    </div>
}
//leaviung the thins at 1:28 mins of the video https://www.youtube.com/watch?v=J-4W