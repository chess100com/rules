import {CoordinateInterface, Figure, StartFen, ExtraMoveData, Color} from "./Shared"
import {Position} from "./Position"
import {Utils} from "./Utils"
import {getPawnMoves} from "./Pawn"
import {getQueenMoves} from "./Queen"
import {getRookMoves} from "./Rook"
import {getPrincessMoves} from "./Princess"
import {getBishopMoves} from "./Bishop"
import {getKnightMoves} from "./Knight"
import {getKingMoves} from "./King"

export interface MoveMetadata {
    from: CoordinateInterface,
    to: CoordinateInterface,
    extra: ExtraMoveData,
    color: Color,
    figure: Figure,
    number: number
}

export interface GameMetaData {
    event?: string,
    site?: string,
    date?: string,
    rounf?: string,
    white?: string,
    black?: string
}

export class Game {

    event: string = ""
    site: string = ""
    date: string = ""
    round: string = ""
    white: string = ""
    black: string = ""
    result: string = "*"
    fromPosition: boolean = false
    startPosition: string = ""
    moves: Array<MoveMetadata> = []
    

    position: Position

    private constructor() {
    }

    static create(metadata?: GameMetaData): Game {
        let game = new Game()
        game.position = Position.fromFen(StartFen)
        if (metadata) {
            ["event", "site", "date", "round", "white", "black"].forEach(function (property) {
                if (property in metadata) {
                    (game as any)[property] = (metadata as any)[property]
                }
            })
        }
        return game
    }

    static fromFen(fen: string): Game {
        let game = new Game();
        game.position = Position.fromFen(fen)
        game.startPosition = fen
        game.fromPosition = true
        return game
    }
    
    static fromPgn(pgn: string): Game {
        let lines = pgn.split("\n")
        
        let game = Game.create()
        return game
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
            throw new Error(`Illegal move ${Utils.coordinateToString(from)}->${Utils.coordinateToString(to)} in position ${this.position.getFen()}`)
        }
        this.position = this.position.move(from, to, extra)
    }

    setPrincessTransformRejected(rejected: boolean) {
        this.position.setPrincessTransformRejected(rejected)
    }


}