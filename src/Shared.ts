export const StartFen = "rnbcqksbnr/pppppppppp/10/10/10/10/10/10/PPPPPPPPPP/RNBCQKSBNR w KQkq - - 0 1"

export enum Figure {
    Pawn, Bishop, Knight, Rook, Queen, King, Prince, Princess
}

export enum Color {
    White, Black
}

export const ColorsNames: {[key: string]: Color} = {
    w: Color.White,
    b: Color.Black
}

export const FigureNames: {[key: string]: Figure} = {
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
    color?: Color
    figure?: Figure
}

export interface BaseBoardInterface {[key: string]: Array<CellInfo>}

export interface BoardInterface extends BaseBoardInterface {
    a: Array<CellInfo>
    b: Array<CellInfo>
    c: Array<CellInfo>
    d: Array<CellInfo>
    e: Array<CellInfo>
    f: Array<CellInfo>
    g: Array<CellInfo>
    h: Array<CellInfo>
    i: Array<CellInfo>
    j: Array<CellInfo>
}

export interface CoordinateInterface {
    row: number,
    col: string
}

export const ColumnNames: Array<string> = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]

export interface MoveInterface {
    from: CoordinateInterface,
    to: CoordinateInterface
}

export interface ExtraMoveData {
    pawnTransform?: Figure
    princessTransform?: boolean
}

export const AvailablePawnTransforms: Array<Figure> = [Figure.Queen, Figure.Bishop, Figure.Knight, Figure.Rook]
