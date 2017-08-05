import {Position} from "./Position"
import {CoordinateInterface, Color} from "./Shared"
import {Utils} from "./Utils"

export function getKnightMoves(c: CoordinateInterface, color: Color, position: Position): Array<CoordinateInterface> {
    let directions: Array<Array<number>> = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-1, -2], [-2, -1], [1, -2], [2, -1]]
    let returnValue: Array<CoordinateInterface> = []
    for (let direction of directions) {
        let dx = direction[0]
        let dy = direction[1]
        let newCoord = Utils.dCoord(c, dx, dy)
        if (!newCoord) {
            continue
        }
        let cellInfo = position.cellInfo(newCoord)
        if (cellInfo.empty || cellInfo.color !== color) {
            returnValue.push(newCoord)
        }
    }
    return returnValue
}
