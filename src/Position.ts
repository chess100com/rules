import { sizes, literals } from "./Bases" 

export default class Position {
    
    private _x: number
    private _y: number
    
    constructor(x: number, y: number) {
        if (false === this.inBounds(x, y)) {
            throw new Error("Position out of bounds")
        }
        this._x = x
        this._y = y
    }
    
    get x(): number {
        return this.x
    }
    
    get y(): number {
        return this.y
    }
    
    get name(): string {
        return literals[this._x] + this._y.toString()
    }
    
    inBounds(x: number, y: number): boolean {
        return x < 1 || x > sizes.width || y < 1 || y > sizes.height
    }
    
    isEqual(position: Position): boolean {
        return position.x === this.x && position.y === this.y
    }
    
    nextPosition(dx: number, dy: number): Position {
        
        let newX = this.x + dx
        let newY = this.y + dy
        
        if (false === this.inBounds(newX, newY)) {
            return null
        }
        
        return new Position(newX, newY)
    }
}
