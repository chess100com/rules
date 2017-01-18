import Figure from "../Figure"
import Position from "../Position"
import Board from "../Board"

export default function AvailableFigureMoves(figure: Figure, board: Board): Array<Position>  {

    let returnValue = new Array<Position>()
    
    let directions: Array<Array<number>> = [[-1,-1],[1,-1],[-1,1],[1,1]];
    
    let startPosition = figure.position;
        
    directions.forEach(function(dir) {
        let currentPosition = startPosition
        while(true) {
            currentPosition = currentPosition.nextPosition(dir[0], dir[1])
            if(!currentPosition) {
                break;
            }
            
            let figureAtPosition = board.getFigureAtPosition(currentPosition)
            
            if (figureAtPosition) {
                if(figureAtPosition.color !== figure.color) {
                    returnValue.push(currentPosition);
                }
                break;
            } else {
                returnValue.push(currentPosition);
            }
        }
    });
    
    return returnValue
        
}
