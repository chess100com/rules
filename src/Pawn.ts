import {Position} from "./Position"
import {CoordinateInterface, Color} from "./Shared"
import {Utils} from "./Utils"

export function getPawnMoves(c: CoordinateInterface, color: Color, position: Position): Array<CoordinateInterface> {
    let returnValue: Array<CoordinateInterface> = []
    if (color === Color.White) {
        // first pawn move by white
        if (c.y === 2) {
            for (let i = 3; i <= 5; i++) {
                let coord = {x: c.x, y: i}
                if (!position.isEmpty(coord)) {
                    break
                }
                returnValue.push(coord)
            }
        }
    } else {
        // first pawn move by black
        if (c.y === 9) {
            for (let i = 8; i >= 6; i--) {
                let coord = {x: c.x, y: i}
                if (!position.isEmpty(coord)) {
                    break
                }
                returnValue.push(coord)
            }
        }
    }

    // eating pawn moves
    let dy: number = color === Color.White ? 1 : -1
    
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
        let takeoverRow = position.takeover.y
        let isNeighbourColumn = Math.abs(position.takeover.x - c.x) === 1
        let canTakeCoord: CoordinateInterface = {
            y: c.y + dy,
            x: position.takeover.x
        }
        if (isNeighbourColumn && canTakeCoord.y >= 3 && canTakeCoord.y <= 8 && position.isEmpty(canTakeCoord)) {
            if (color === Color.White && canTakeCoord.y > takeoverRow || color === Color.Black && canTakeCoord.y < takeoverRow) {
                returnValue.push(canTakeCoord)
            }
        }
    }

    return returnValue
}
