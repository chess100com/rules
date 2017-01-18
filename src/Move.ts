import Position from "./Position"

export default class Move {
    
    private _positionFrom: Position
    private _positionTo: Position
    
    constructor(positionFrom: Position, positionTo: Position) {
        this._positionFrom = positionFrom
        this._positionTo = positionTo
    }
    
    get positionFrom(): Position {
        return this._positionFrom
    }
    
    get positionTo(): Position {
        return this._positionTo
    }
    
}