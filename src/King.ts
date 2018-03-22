import {Position} from "./Position"
import {CoordinateInterface, Color} from "./Shared"
import {Utils} from "./Utils"

export function getKingMoves(c: CoordinateInterface, color: Color, position: Position): Array<CoordinateInterface> {
    let directions: Array<Array<number>> = [[-1, -1], [1, 1], [1, -1], [-1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]
    let returnValue: Array<CoordinateInterface> = []
    for (let direction of directions) {
        let dx = direction[0]
        let dy = direction[1]
        let newCoord = Utils.dCoord(c, dx, dy)
        if (!newCoord) {
            continue
        }
        let cellInfo = position.cellInfo(newCoord)
        if (!cellInfo.empty) {
            if (cellInfo.color !== color) {
                returnValue.push(newCoord)
            }
        } else {
            returnValue.push(newCoord)
        }
    }

    /**
     * Castling moves
     */
    let can00 = position.canCastling(2, color)
    let can000 = position.canCastling(3, color)
    if ((can00 || can000) && false === position.isKingUnderAttack(color)) {
        let y = c.y
        if (can00) {
            for (let x of [7, 8, 9]) {
                if (false === position.cellInfo({y: y, x: x}).empty) {
                    can00 = false
                    break
                }
            }
            if (can00) {
                for (let x of [7, 8]) {
                    if (position.isAttacked({y: y, x: x})) {
                        can00 = false
                        break
                    }
                }
            }
            if (can00) {
                returnValue.push({y: y, x: 8})
            }
        }
        if (can000) {
            for (let x of [2, 3, 4, 5]) {
                if (false === position.cellInfo({y: y, x: x}).empty) {
                    can000 = false
                    break
                }
            }
            if (can000) {
                for (let x of [3, 4, 5]) {
                    if (position.isAttacked({y: y, x: x})) {
                        can000 = false
                        break
                    }
                }
            }
            if (can000) {
                returnValue.push({y: y, x: 3})
            }
        }
    }


    return returnValue
}
