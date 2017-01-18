import Figure from "./Figure"
import Position from "./Position"
import Board from "./Board"
import { FigureType } from "./Bases"
import AvailablePawnMoves from "./Moves/PawnMoves"
import AvailableBishopMoves from "./Moves/BishopMoves"
import CastleMoves from "./Moves/CastleMoves"
import KingMoves from "./Moves/KingMoves"
import KnightMoves from "./Moves/KnightMoves"
import PrinceMoves from "./Moves/PrinceMoves"
import PrincessMoves from "./Moves/PrincessMoves"
import QueenMoves from "./Moves/QueenMoves"

export default function AvailableMoves(figure: Figure, board: Board): Array<Position> {
            
    switch(figure.type) {
        case FigureType.Pawn: return AvailablePawnMoves(figure, board)
        case FigureType.Bishop: return AvailableBishopMoves(figure, board)
        case FigureType.King: return KingMoves(figure, board)
        case FigureType.Castle: return CastleMoves(figure, board)
        case FigureType.Knight: return KnightMoves(figure, board)
        case FigureType.Prince: return PrinceMoves(figure, board)
        case FigureType.Princess: return PrincessMoves(figure, board)
        case FigureType.Queen: return QueenMoves(figure, board)        
        default: throw new Error("Unknown figure")                
    }
}
