export const StartFen = "rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNR w KQkq - - 0 1"

export enum Figure {
    Pawn, Bishop, Knight, Rook, Queen, King, Prince, Princess, None
}

export enum Color {
    White, Black, None
}

export const ColorsNames: { [key: string]: Color } = {
    w: Color.White,
    b: Color.Black,
}

export const FigureNames: { [key: string]: Figure } = {
    R: Figure.Rook,
    N: Figure.Knight,
    B: Figure.Bishop,
    C: Figure.Prince,
    S: Figure.Princess,
    Q: Figure.Queen,
    K: Figure.King,
    P: Figure.Pawn
}

export interface CellInfo {
    empty: boolean
    color: Color
    figure: Figure
}

export interface BaseBoardInterface { [key: number]: { [key: number]: CellInfo } }

export interface BoardInterface extends BaseBoardInterface {
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
    6: {},
    7: {},
    8: {},
    9: {},
    10: {}
}

/**
 * Interface for coordinates on board
 * Starts from 1, end with 10
 * x: 1..10 (a..j)
 * y: 1..10
 * {x:2,y:2} it is "b2" coordinate
 */
export interface CoordinateInterface {
    readonly x: number,
    readonly y: number
}

export const ColumnNames: Array<string> = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

export interface MoveInterface {
    readonly from: CoordinateInterface,
    readonly to: CoordinateInterface
}

export interface ExtraMoveData {
    pawnTransform?: Figure
    princessTransform?: boolean,
    test?: boolean
}

export const AvailablePawnTransforms: Array<Figure> = [Figure.Queen, Figure.Bishop, Figure.Knight, Figure.Rook]
