import {Position} from "./Position"
import {CoordinateInterface, Color} from "./Shared"
import {Utils} from "./Utils"

export function getRookMoves(c: CoordinateInterface, color: Color, position: Position): Array<CoordinateInterface> {
    let directions: Array<Array<number>> = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    let returnValue: Array<CoordinateInterface> = []
    for (let direction of directions) {
        let dx = direction[0]
        let dy = direction[1]
        let index = 1
        while (true) {
            let newCoord = Utils.dCoord(c, dx * index, dy * index)
            if (!newCoord) {
                break
            }
            let cellInfo = position.cellInfo(newCoord)
            if (!cellInfo.empty) {
                if (cellInfo.color !== color) {
                    returnValue.push(newCoord)
                }
                break
            }
            returnValue.push(newCoord)
            index++
        }
    }
    return returnValue
}
