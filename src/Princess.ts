import {Position} from "./Position"
import {CoordinateInterface, Color} from "./Shared"
import {Utils} from "./Utils"

export function getPrincessMoves(c: CoordinateInterface, color: Color, position: Position): Array<CoordinateInterface> {
    let directions: Array<Array<number>> = [[-1, -1], [1, 1], [1, -1], [-1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]
    let returnValue: Array<CoordinateInterface> = []
    for (let direction of directions) {
        let dx = direction[0]
        let dy = direction[1]
        for (let index = 1; index <= 2; index++) {
            let newCoord = Utils.dCoord(c, dx * index, dy * index)
            if (!newCoord) {
                break
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
    }
    return returnValue
}
