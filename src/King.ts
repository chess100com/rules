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
    return returnValue
}
