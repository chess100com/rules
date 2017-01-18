import Figure from "../Figure"
import Position from "../Position"
import Board from "../Board"
import { Colors } from "../Bases"

export default function AvailableFigureMoves(figure: Figure, board: Board): Array<Position>  {

    let returnValue = new Array<Position>()
    let positiveMove: number = 1
    if (figure.color === Colors.Black) {
        positiveMove = -1
    }

    let upPosition = figure.position.nextPosition(0, positiveMove)
    if (upPosition !== null && board.getFigureAtPosition(upPosition) === null) {
        returnValue.push(upPosition)
    }

    let upLeftPosition = figure.position.nextPosition(-1, positiveMove)
    let upLeftFigure = board.getFigureAtPosition(upLeftPosition)
    if (upLeftPosition !== null && (upLeftFigure === null || upLeftFigure.color !== figure.color)) {
        returnValue.push(upLeftPosition)
    }

    let upRightPosition = figure.position.nextPosition(1, positiveMove)
    let upRightFigure = board.getFigureAtPosition(upRightPosition)
    if (upRightPosition !== null && (upRightFigure === null || upRightFigure.color !== figure.color)) {
        returnValue.push(upRightPosition)
    }           
    
    return returnValue
        
}
