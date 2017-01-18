import Figure from "./Figure"
import Position from "./Position"

export default class Board {
    
    private _figures: Array<Figure>
    
    constructor(figures: Array<Figure> ) {
        this._figures = figures
    }
    
    get figures(): Array<Figure> {
        return this._figures
    }
    
    getFigureAtPosition(position: Position): Figure {
        
        let returnValue: Figure = null
        
        this.figures.forEach(function(figure) {
            if (figure.position.isEqual(position)) {
                returnValue = figure
                return false
            }
        })
        
        return returnValue
        
    }
}
