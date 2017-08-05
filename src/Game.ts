import {CoordinateInterface, Figure, StartFen, ExtraMoveData} from "./Shared"
import {Position} from "./Position"
import {Utils} from "./Utils"
import {getPawnMoves} from "./Pawn"
import {getQueenMoves} from "./Queen"
import {getRookMoves} from "./Rook"
import {getPrincessMoves} from "./Princess"
import {getBishopMoves} from "./Bishop"
import {getKnightMoves} from "./Knight"
import {getKingMoves} from "./King"

export class Game {

    position: Position

    constructor() {
        this.position = Position.fromFen(StartFen)
    }

    setFen(fen: string) {
        this.position = Position.fromFen(fen)
    }

    getFen(): string {
        return this.position.getFen()
    }

    availableMoves(coord: CoordinateInterface): Array<CoordinateInterface> {
        return this.position.availableMoves(coord)
    }

    canMove(from: CoordinateInterface, to: CoordinateInterface): boolean {
        return this.position.canMove(from, to)
    }

    move(from: CoordinateInterface, to: CoordinateInterface, extra?: ExtraMoveData) {
        Utils.validateCoordinate(from)
        Utils.validateCoordinate(to)
        if (!this.canMove(from, to)) {
            throw new Error("Illegal move")
        }
        this.position = this.position.move(from, to, extra)
    }
    
    setPrincessTransformRejected(rejected: boolean) {
        this.position.setPrincessTransformRejected(rejected)
    }


}