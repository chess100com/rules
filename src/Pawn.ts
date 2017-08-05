import {Position} from "./Position"
import {CoordinateInterface, Color} from "./Shared"
import {Utils} from "./Utils"

export function getPawnMoves(c: CoordinateInterface, color: Color, position: Position): Array<CoordinateInterface> {
    let returnValue: Array<CoordinateInterface> = []
    if (color === Color.White) {
        // first pawn move by white
        if (c.row === 2) {
            for (let i = 3; i <= 5; i++) {
                let coord = {col: c.col, row: i}
                if (!position.isEmpty(coord)) {
                    break
                }
                returnValue.push(coord)
            }
        }
    } else {
        // first pawn move by black
        if (c.row === 9) {
            for (let i = 8; i >= 6; i--) {
                let coord = {col: c.col, row: i}
                if (!position.isEmpty(coord)) {
                    break
                }
                returnValue.push(coord)
            }
        }
    }

    // eating pawn moves
    let dy: number = color === Color.White ? 1 : -1
    let currentColumnIndex = Utils.getColumnIndex(c.col)
    
    let newCoord = Utils.dCoord(c, -1, dy)
    if (newCoord) {
        let cellInfo = position.cellInfo(newCoord)
        if (!cellInfo.empty && cellInfo.color !== color) {
            returnValue.push(newCoord)
        }
    }
    
    newCoord = Utils.dCoord(c, 1, dy)
    if (newCoord) {
        let cellInfo = position.cellInfo(newCoord)
        if (!cellInfo.empty && cellInfo.color !== color) {
            returnValue.push(newCoord)
        }
    }

    // forward move
    newCoord = Utils.dCoord(c, 0, dy)
    if (newCoord && position.isEmpty(newCoord)) {
        returnValue.push(newCoord)
    }

    // takeover eats
    if (position.takeover) {
        let takeoverColumnIndex = Utils.getColumnIndex(position.takeover.col)
        let takeoverRow = position.takeover.row
        let isNeighbourColumn = Math.abs(takeoverColumnIndex - currentColumnIndex) === 1
        let canTakeCoord: CoordinateInterface = {
            row: c.row + dy,
            col: position.takeover.col
        }
        if (isNeighbourColumn && canTakeCoord.row >= 3 && canTakeCoord.row <= 8 && position.isEmpty(canTakeCoord)) {
            if (color === Color.White && canTakeCoord.row > takeoverRow || color === Color.Black && canTakeCoord.row < takeoverRow) {
                returnValue.push(canTakeCoord)
            }
        }
    }

    return returnValue
}
