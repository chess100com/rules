import Position from "./Position"
import { Colors, FigureType } from "./Bases"

export default class Figure {

    private _color: Colors
    private _position: Position
    private _figureType: FigureType

    constructor(figureType: FigureType, color: Colors, position: Position) {
        this._color = color
        this._position = position
        this._figureType = figureType
    }
    
    get color(): Colors {
        return this._color
    }
    
    get position(): Position {
        return this._position
    }
    
    set position(newPosition: Position) {
        this.position = newPosition
    }
    
    get type(): FigureType {
        return this._figureType
    }
}