import Board from "./Board"
import Move from "./Move"
import Figure from "./Figure"
import Position from "./Position"
import { FigureType, Colors, sizes } from "./Bases"
import BoardFactory from "./BoardFactory"

export default class Game {
    
    private _moves = new Array<Move>()
    private _board: Board
    
    constructor() {        
        this._board = BoardFactory()                
    }
    
    get board(): Board {
        return this._board
    }
    
    
    
}