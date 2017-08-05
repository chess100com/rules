import {BoardInterface, Color, ColumnNames, CellInfo, Figure, FigureNames, ColorsNames, CoordinateInterface, ExtraMoveData, AvailablePawnTransforms, MoveInterface} from "./Shared"
import {Utils} from "./Utils"
import {getPawnMoves} from "./Pawn"
import {getQueenMoves} from "./Queen"
import {getRookMoves} from "./Rook"
import {getPrincessMoves} from "./Princess"
import {getBishopMoves} from "./Bishop"
import {getKnightMoves} from "./Knight"
import {getKingMoves} from "./King"
import {Game} from "./Game"

export class Position {

    private board: BoardInterface

    private moving: Color

    private white00: boolean = false
    private black00: boolean = false
    private white000: boolean = false
    private black000: boolean = false

    private moveNumber: number = 1
    private semiMove: number = 0

    private queenJustEaten: boolean = false
    private princessTransformJustRejected = false

    private whitePrincessTransformRejected: boolean = false
    private blackPrincessTransformRejected: boolean = false

    private takeoverCoord: CoordinateInterface | null = null

    private allAvailableMoves: Array<MoveInterface> = []

    private constructor() {}

    static fromFen(fen: string): Position {
        let position = new Position()
        position.setFen(fen)
        position.buildAvailableMoves()
        return position
    }

    private setFen(fen: string) {
        this.board = {
            a: [],
            b: [],
            c: [],
            d: [],
            e: [],
            f: [],
            g: [],
            h: [],
            i: [],
            j: []
        }
        for (let columnName of ColumnNames) {
            for (let y = 0; y <= 9; y++) {
                this.board[columnName].push({empty: true})
            }
        }

        let splitSpaces = fen.split(" ")
        if (splitSpaces.length !== 7) {
            throw new Error("Bad FEN: " + fen)
        }

        let positionString = splitSpaces[0]
        let positionRowsArr = positionString.split("/")
        if (positionRowsArr.length !== 10) {
            throw new Error("Bad FEN: " + fen)
        }

        for (let rowIndex = 0; rowIndex <= 9; rowIndex++) {
            let rowString = positionRowsArr[9 - rowIndex]
            if (rowString === "10") {
                // empty row
                continue
            }
            let cellIndex = 0
            for (let indexInRowString = 0; indexInRowString < rowString.length; indexInRowString++) {

                if (cellIndex > 9) {
                    throw new Error("Bad FEN: " + fen)
                }

                let char = rowString.substr(indexInRowString, 1)
                if (char.match(/^[0-9]$/)) {
                    cellIndex += parseInt(char)
                    continue
                }

                let color: Color
                let figure: Figure

                if (char in FigureNames) {
                    color = Color.White
                    figure = FigureNames[char]
                } else if (char.toUpperCase() in FigureNames) {
                    color = Color.Black
                    figure = FigureNames[char.toUpperCase()]
                } else {
                    throw new Error(`Bad FEN: ${fen}, invalid figure: ${char}`)
                }

                let colName = ColumnNames[cellIndex]

                this.board[colName][rowIndex] = {
                    empty: false,
                    color: color,
                    figure: figure
                }

                cellIndex++
            }

            if (cellIndex !== 10) {
                throw new Error("Bad FEN: " + fen)
            }
        }

        let movingColor = splitSpaces[1]
        if (false === (movingColor in ColorsNames)) {
            throw new Error("Bad FEN: " + fen)
        }

        this.moving = ColorsNames[movingColor]

        let castlingString = splitSpaces[2]
        this.white00 = castlingString.indexOf("K") !== -1
        this.white000 = castlingString.indexOf("Q") !== -1
        this.black00 = castlingString.indexOf("k") !== -1
        this.black000 = castlingString.indexOf("q") !== -1

        let takeoverString = splitSpaces[3]
        if (takeoverString === "-") {
            this.takeoverCoord = null
        } else {
            this.takeoverCoord = Utils.parseCoordinate(takeoverString)
        }

        let princessDataString = splitSpaces[4]
        if (princessDataString !== "-") {
            if (princessDataString.indexOf("x") !== -1) {
                this.queenJustEaten = true
            }
            if (princessDataString.indexOf("w") !== -1) {
                this.whitePrincessTransformRejected = true
            }
            if (princessDataString.indexOf("b") !== -1) {
                this.blackPrincessTransformRejected = true
            }
        }

        if (!splitSpaces[5].match(/^[0-9]+$/)) {
            throw new Error(`Bad FEN: semiMove(${splitSpaces[5]}) should be a number`)
        }

        if (!splitSpaces[6].match(/^[0-9]+$/)) {
            throw new Error(`Bad FEN: move(${splitSpaces[6]}) should be a number`)
        }

        this.semiMove = parseInt(splitSpaces[5])
        this.moveNumber = parseInt(splitSpaces[6])
    }

    getFen(): string {
        let positionStringArray: Array<string> = []

        for (let rowIndex = 0; rowIndex <= 9; rowIndex++) {
            let emptyCells = 0
            let rowString = ""
            for (let columnName of ColumnNames) {
                let cellInfo = this.board[columnName][rowIndex]
                if (cellInfo.empty) {
                    emptyCells++
                    continue
                }
                if (emptyCells > 0) {
                    rowString += emptyCells.toString()
                    emptyCells = 0
                }
                rowString += Utils.getFigureChar(cellInfo.figure!, cellInfo.color!)
            }

            if (emptyCells > 0) {
                rowString += emptyCells.toString()
            }

            positionStringArray.push(rowString)
        }

        positionStringArray.reverse()

        let moving = this.moving === Color.White ? "w" : "b"

        let castlingString = ""
        if (this.white00) castlingString += "K"
        if (this.white000) castlingString += "Q"
        if (this.black00) castlingString += "k"
        if (this.black000) castlingString += "q"
        if (castlingString.length === 0) {
            castlingString = "-"
        }

        let princessString = ""
        if (this.queenJustEaten) princessString += "x"
        if (this.whitePrincessTransformRejected) princessString += "w"
        if (this.blackPrincessTransformRejected) princessString += "b"
        if (princessString.length === 0) princessString = "-"

        let takeoverString = "-"
        if (this.takeoverCoord) {
            takeoverString = this.takeoverCoord.col + this.takeoverCoord.row.toString()
        }

        return `${positionStringArray.join("/")} ${moving} ${castlingString} ${takeoverString} ${princessString} ${this.semiMove} ${this.moveNumber}`
    }

    cellInfo(coord: CoordinateInterface): CellInfo {
        Utils.validateCoordinate(coord)
        return this.board[coord.col][coord.row - 1]
    }

    isEmpty(c: CoordinateInterface) {
        return this.cellInfo(c).empty
    }

    private clone(): Position {
        let position = new Position()
        position.setFen(this.getFen())
        return position
    }

    move(from: CoordinateInterface, to: CoordinateInterface, extra?: ExtraMoveData): Position {

        let newPosition = this.clone()
        newPosition.queenJustEaten = false

        let fromCellInfo = newPosition.cellInfo(from)
        let toCellInfo = newPosition.cellInfo(to)

        let currentFigure = fromCellInfo.figure

        newPosition.takeoverCoord = null
        if (fromCellInfo.figure === Figure.Pawn) {
            newPosition.semiMove = 0
            if (Math.abs(from.row - to.row) > 1) {
                newPosition.takeoverCoord = {
                    row: to.row,
                    col: to.col
                }
            }
            if (toCellInfo.empty && this.takeoverCoord && to.col !== from.col) {
                let takoverPawnCell = newPosition.cellInfo(this.takeoverCoord)
                takoverPawnCell.empty = true
                delete takoverPawnCell.color
                delete takoverPawnCell.figure
            }

            if (to.row === 10 || to.row === 1) {
                if (!extra || !extra.pawnTransform || AvailablePawnTransforms.indexOf(extra.pawnTransform) === -1) {
                    throw new Error("Pawn transform figure should be passed")
                }
                currentFigure = extra.pawnTransform
            }

        } else {
            newPosition.semiMove++
        }

        if (this.queenJustEaten) {
            if (this.princessTransformJustRejected) {
                if (fromCellInfo.color === Color.White) {
                    newPosition.whitePrincessTransformRejected = true
                } else {
                    newPosition.blackPrincessTransformRejected = true
                }
            } else {
                let princessPosition = newPosition.findFigures(Figure.Princess, fromCellInfo.color!)[0]
                let princessCellInfo = newPosition.cellInfo(princessPosition)
                princessCellInfo.figure = Figure.Queen
                if (from.row === princessPosition.row && from.col === princessPosition.col) {
                    currentFigure = Figure.Queen
                }
            }
        }

        this.queenJustEaten = false

        if (toCellInfo.figure === Figure.Queen && false === toCellInfo.empty && this.princessOnBoard(toCellInfo.color!)) {
            if (toCellInfo.color === Color.White) {

            }
            newPosition.queenJustEaten = true
        }

        if (toCellInfo.figure === Figure.King) {
            let princeCoord = this.findFigures(Figure.Prince, toCellInfo.color!)[0]
            let princeCellInfo = newPosition.cellInfo(princeCoord)
            princeCellInfo.figure = Figure.King
        }

        if (fromCellInfo.color === Color.Black) {
            newPosition.moveNumber++
        }

        toCellInfo.empty = false
        toCellInfo.color = fromCellInfo.color
        toCellInfo.figure = currentFigure

        newPosition.moving = this.moving === Color.White ? Color.Black : Color.White

        fromCellInfo.empty = true
        delete fromCellInfo.color
        delete fromCellInfo.figure

        newPosition.buildAvailableMoves()

        return newPosition
    }

    private buildAvailableMoves() {
        this.allAvailableMoves = []
        for (let row = 1; row <= 10; row++) {
            for (let col of ColumnNames) {
                let coord: CoordinateInterface = {row: row, col: col}
                let availableMoves = this.baseAvailableMoves(coord)
                for (let availableMoveCoord of availableMoves) {
                    this.allAvailableMoves.push({
                        from: coord,
                        to: availableMoveCoord
                    })
                }
            }
        }
    }

    findFigures(figure: Figure, color: Color): Array<CoordinateInterface> {
        let returnValue: Array<CoordinateInterface> = []
        for (let column of ColumnNames) {
            for (let i = 1; i <= 10; i++) {
                let coordinate: CoordinateInterface = {col: column, row: i}
                let cellInfo = this.cellInfo(coordinate)
                if (!cellInfo.empty && cellInfo.color === color && cellInfo.figure === figure) {
                    returnValue.push(coordinate)
                }
            }
        }
        return returnValue
    }

    princessOnBoard(color: Color): boolean {
        return this.findFigures(Figure.Princess, color).length === 1
    }

    princeOnBoard(color: Color): boolean {
        return this.findFigures(Figure.Prince, color).length === 1
    }

    bothPrincesOnBoard(): boolean {
        return this.princeOnBoard(Color.White) && this.princeOnBoard(Color.Black)
    }

    isKingUnderAttack(color: Color): boolean {
        let kingCoord = this.findFigures(Figure.King, color)[0]
        for (let availableMove of this.allAvailableMoves) {
            let cellInfo = this.cellInfo(availableMove.from)
            if (cellInfo.color !== color && Utils.sameCoords(kingCoord, availableMove.to)) {
                return true
            }
        }
        return false
    }

    availableMoves(coord: CoordinateInterface): Array<CoordinateInterface> {
        let returnValue: Array<CoordinateInterface> = []
        for (let availableMove of this.allAvailableMoves) {
            if (availableMove.from.row === coord.row && availableMove.from.col === coord.col) {
                returnValue.push(availableMove.to)
            }
        }
        return returnValue
    }

    private baseAvailableMoves(coord: CoordinateInterface): Array<CoordinateInterface> {
        Utils.validateCoordinate(coord)

        let cellInfo = this.cellInfo(coord)
        if (cellInfo.empty) {
            return []
        }
        if (cellInfo.color !== this.moving) {
            return []
        }

        let returnValue: Array<CoordinateInterface> = []

        switch (cellInfo.figure) {
            case Figure.Pawn:
                returnValue = getPawnMoves(coord, cellInfo.color, this)
                break
            case Figure.Queen:
                returnValue = getQueenMoves(coord, cellInfo.color, this)
                break
            case Figure.Rook:
                returnValue = getRookMoves(coord, cellInfo.color, this)
                break
            case Figure.Prince:
                returnValue = getPrincessMoves(coord, cellInfo.color, this)
                break
            case Figure.Princess:
                if (this.queenJustEaten && false === this.princessTransformJustRejected) {
                    returnValue = getQueenMoves(coord, cellInfo.color, this)
                } else {
                    returnValue = getPrincessMoves(coord, cellInfo.color, this)
                }
                break
            case Figure.Knight:
                returnValue = getKnightMoves(coord, cellInfo.color, this)
                break
            case Figure.Bishop:
                returnValue = getBishopMoves(coord, cellInfo.color, this)
                break
            case Figure.King:
                returnValue = getKingMoves(coord, cellInfo.color, this)
                break

        }
        return returnValue
    }

    canMove(from: CoordinateInterface, to: CoordinateInterface): boolean {
        let available = this.availableMoves(from)
        for (let availableCoord of available) {
            if (availableCoord.row === to.row && availableCoord.col === to.col) {
                return true
            }
        }
        return false
    }

    get takeover(): CoordinateInterface | null {
        return this.takeoverCoord
    }

    get isQueenJustEaten(): boolean {
        return this.queenJustEaten
    }

    get isPrincessTransformRejceted(): boolean {
        return this.princessTransformJustRejected
    }

    setPrincessTransformRejected(rejected: boolean) {
        if (!this.queenJustEaten) {
            throw new Error("Queen not have been just eaten")
        }
        this.princessTransformJustRejected = rejected
        this.buildAvailableMoves()
    }

}
