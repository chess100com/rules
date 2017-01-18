import Board from "./Board"
import { FigureType, Colors, sizes } from "./Bases"
import Figure from "./Figure"
import Position from "./Position"

export default function BoardFactory(): Board {
    
        let figures: Array<Figure> = []
        
        //Creating Pawns
        for (let i = 1; i <= sizes.width; i++) {
            figures.push(new Figure(FigureType.Pawn, Colors.White, new Position(i, 2)))
            figures.push(new Figure(FigureType.Pawn, Colors.Black, new Position(i, sizes.height - 1)))
        }
        
        return new Board(figures)    
    
}
